import { db } from "../../../lib/db";

export async function POST(req) {
  const { code, userId } = await req.json();

  const result = await db.query(
    "SELECT * FROM teacher_codes WHERE code=$1 AND used=false",
    [code]
  );

  if (result.rows.length === 0) {
    return Response.json({ ok: false });
  }

  await db.query("UPDATE users SET role='TEACHER' WHERE id=$1", [userId]);
  await db.query("UPDATE teacher_codes SET used=true WHERE code=$1", [code]);

  return Response.json({ ok: true });
}
