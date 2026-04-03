import { db } from "../../../lib/db";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const { name, userId } = await req.json();

  const user = await db.query("SELECT role FROM users WHERE id=$1", [userId]);

  if (!user.rows[0] || user.rows[0].role !== "TEACHER") {
    return Response.json({ ok: false });
  }

  await db.query(
    "INSERT INTO rooms (id,name,created_by,is_private) VALUES ($1,$2,$3,true)",
    [uuid(), name, userId]
  );

  return Response.json({ ok: true });
}
