import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const { email } = await req.json();

  let user = await db.query("SELECT * FROM users WHERE email=$1", [email]);

  if (user.rows.length === 0) {
    const id = uuid();

    await db.query(
      "INSERT INTO users (id,email,role) VALUES ($1,$2,$3)",
      [id, email, "MEMBER"]
    );

    user = { rows: [{ id, email, role: "MEMBER" }] };
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("userId", user.rows[0].id);
  res.cookies.set("role", user.rows[0].role);

  return res;
}
