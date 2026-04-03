import { getPeppers } from "@/backend/utils/secretManager";
import { verifyAdminByPII } from "@/backend/utils/adminIdentityVerify";

export async function POST(req) {
  const body = await req.json();
  const user = body.user;

  const profile = {
    FULL_NAME: user.meta?.full_name,
    NIK: user.meta?.nik,
    PLACE_OF_BIRTH: user.meta?.place_of_birth,
    DATE_OF_BIRTH: user.meta?.date_of_birth,
    GENDER: user.meta?.gender,
    RELIGION: user.meta?.religion,
    BLOOD_TYPE: user.meta?.blood_type,
    ADDRESS: user.meta?.address,
    RT: user.meta?.rt,
    RW: user.meta?.rw,
    VILLAGE: user.meta?.village,
    DISTRICT: user.meta?.district,
    CITY: user.meta?.city,
    PROVINCE: user.meta?.province,
    MARITAL_STATUS: user.meta?.marital_status,
    OCCUPATION: user.meta?.occupation,
    NATIONALITY: user.meta?.nationality,
    EMAIL: user.email
  };

  const peppers = await getPeppers();
  const result = await verifyAdminByPII(profile, peppers);

  if (result.matched) {
    user.role = "SUPER_ADMIN";
  }

  return Response.json({
    success: true,
    role: user.role
  });
}
