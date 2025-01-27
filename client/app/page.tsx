"use client";
import { useEffect, useState } from "react";
import { useSocket } from "./SocketCtx";
import { Events } from "./types";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { socket } = useSocket();
  const router = useRouter();
  const [room, setRoom] = useState("room123");
  const [user, setUser] = useState("user123");

  const enterRoom = () => {
    const createRoom: Events = { method: "CREATE-ROOM", data: { room, user } };
    socket?.send(JSON.stringify(createRoom));
  };

  useEffect(() => {
    if (socket)
      socket.onmessage = (msg) => {
        const roomCreated: Events = JSON.parse(msg.data);
        if (roomCreated.method == "ROOM-CREATED") {
          router.push(`/meet/${room}`);
        }
      };
  }, [socket]);

  return (
    <div className="flex justify-center pt-16">
      <div className="flex flex-col gap-4 max-w-screen-sm">
        <h1>Enter room</h1>
        <input
          type="text"
          value={room}
          className="outline-2 outline-blue-500 border-2 border-blue-500 py-2 px-4"
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room Id"
        />
        <input
          type="text"
          value={user}
          className="outline-2 outline-blue-500 border-2 border-blue-500 py-2 px-4"
          onChange={(e) => setUser(e.target.value)}
          placeholder="User Id"
        />
        <button
          className="py-2 px-4 rounded-md bg-gray-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={room.length < 2}
          onClick={() => {
            enterRoom();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default HomePage;
