import crypto from "crypto";
import db from "../models/index.js";

/**
 * HARUS SAMA PERSIS dengan seed generator
 */
function canonicalize(profile) {
  return [
    profile.FULL_NAME || "",
    profile.NIK || "",
    profile.PLACE_OF_BIRTH || "",
    profile.DATE_OF_BIRTH || "",
    profile.GENDER || "",
    profile.RELIGION || "",
    profile.BLOOD_TYPE || "",
    profile.ADDRESS || "",
    profile.RT || "",
    profile.RW || "",
    profile.VILLAGE || "",
    profile.DISTRICT || "",
    profile.CITY || "",
    profile.PROVINCE || "",
    profile.MARITAL_STATUS || "",
    profile.OCCUPATION || "",
    profile.NATIONALITY || "",
    profile.EMAIL || ""
  ].join("|");
}

function hash(pepper, canonical, salt) {
  return crypto
    .createHmac("sha256", pepper)
    .update(canonical + "|" + salt)
    .digest("hex");
}

export async function verifyAdminByPII(profile, peppers = []) {
  if (!profile?.NIK) return { matched: false };

  const canonical = canonicalize(profile);

  const identities = await db.AdminIdentity.findAll({
    where: { revoked_at: null }
  });

  for (let i = 0; i < peppers.length; i++) {
    const pepper = peppers[i];

    for (const id of identities) {
      try {
        const candidate = hash(pepper, canonical, id.salt);

        const a = Buffer.from(candidate, "hex");
        const b = Buffer.from(id.identifier_hash, "hex");

        if (
          a.length === b.length &&
          crypto.timingSafeEqual(a, b)
        ) {
          return {
            matched: true,
            label: id.label,
            matchedWithPepperIndex: i
          };
        }
      } catch (e) {
        continue;
      }
    }
  }

  return { matched: false };
}
