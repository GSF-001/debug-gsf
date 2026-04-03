"use client";
import { useState } from "react";

export default function Teacher() {
  const [room, setRoom] = useState("");

  const createRoom = async () => {
    const userId = document.cookie
      .split("; ")
      .find((x) => x.startsWith("userId="))
      ?.split("=")[1];

    await fetch("/api/room/create", {
      method: "POST",
      body: JSON.stringify({ name: room, userId }),
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <input onChange={(e) => setRoom(e.target.value)} />
      <button onClick={createRoom}>CREATE ROOM</button>
    </div>
  );
}
