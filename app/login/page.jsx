"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  const login = async () => {
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    window.location.href = "/dashboard";
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div>
        <input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10 }}
        />
        <button onClick={login} style={{ padding: 10, background: "cyan" }}>
          LOGIN
        </button>
      </div>
    </div>
  );
}
