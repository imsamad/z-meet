"use client"
import { useState } from "react";
import { useSocket } from "./SocketCtx";

const HomePage = () => {
  const {socket} = useSocket()
  // if (!socket) {
  //   return <div>Loading...</div>
  // }

  const [room, setRoom] = useState("")

  const enterRoom = () => {
    // if (socket)
    socket?.send(JSON.stringify({method:"enter-room",room}))
    console.log("socket: ",socket)
  }

  return (
    <div className="flex justify-center pt-16" >
      <div className="flex flex-col gap-4 max-w-screen-sm" >
      <h1>Enter room</h1>
      <input type="text" value={room} className="outline-2 outline-blue-500 border-2 border-blue-500 py-2 px-4"  onChange={(e) => setRoom(e.target.value)} placeholder="Room Id"/>
      <button className="py-2 px-4 rounded-md bg-gray-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={room.length < 2} onClick={() => {
        enterRoom()
      }} >Submit</button>
      </div>
    </div>
  );
};

export default HomePage;
