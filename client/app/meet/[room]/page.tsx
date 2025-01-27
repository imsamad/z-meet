"use client";
import * as React from "react";
const RoomPage = ({ params }) => {
  const { room }: { room: string } = React.use(params);

  return <div>Room Page :{room}</div>;
};

export default RoomPage;
