import ws from "ws";

const PORT = 4000;
const server = new ws.WebSocketServer({ port: PORT });

type Events =
  | { method: "CREATE-ROOM"; data: { room: string; user: string } }
  | { method: "ROOM-CREATED"; data: { status: "SUCCESS" | "FAILURE" } }
  | { method: "REJOIN-ROOM-AS-OWNER"; data: { room: string; user: string } }
  | { method: "ASK-PERMISSION"; data: { SDP: any; room: string; user: string } }
  | {
      method: "SEEK-PERMISSON";
      data: { sdp: any; user: string };
    }
  | {
      method: "GRANT-PERMISSION";
      data: { answer: any; user: string; room: string };
    }
  | {
      method: "DENY-PERMISSION";
      data: { user: string; room: string };
    };

console.log("Server started on port", PORT);

const user_to_socket_mapping: Record<string, ws> = {};
const rooms: Record<string, string[]> = {};
const room_owner: Record<string, string> = {};

server.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("message", (message) => {
    console.log("Message received:", JSON.parse(message.toString()).method);

    const ev: Events = JSON.parse(message.toString());

    if (ev.method == "CREATE-ROOM") {
      user_to_socket_mapping[ev.data.user] = socket;
      if (!rooms[ev.data.room]) rooms[ev.data.room] = [];
      rooms[ev.data.room].push(ev.data.user);
      room_owner[ev.data.room] = ev.data.user;

      const roomCreated: Events = {
        method: "ROOM-CREATED",
        data: { status: "SUCCESS" },
      };
      console.log("roomCreated: ", roomCreated);
      socket.send(JSON.stringify(roomCreated));
      return;
    }

    if (ev.method == "REJOIN-ROOM-AS-OWNER") {
      if (room_owner[ev.data.user] == ev.data.user) {
        user_to_socket_mapping[ev.data.user] = socket;
        const roomCreated: Events = {
          method: "ROOM-CREATED",
          data: { status: "SUCCESS" },
        };
        socket.send(JSON.stringify(roomCreated));
      }
      return;
    }

    if (ev.method == "ASK-PERMISSION") {
      const seekPerm: Events = {
        method: "SEEK-PERMISSON",
        data: { sdp: ev.data.SDP, user: ev.data.user },
      };
      user_to_socket_mapping[room_owner[ev.data.room]].send(
        JSON.stringify(seekPerm),
      );
      return;
    }

    if (ev.method == "GRANT-PERMISSION") {
      const seekPerm: Events = {
        method: "GRANT-PERMISSION",
        data: ev.data,
      };

      user_to_socket_mapping[room_owner[seekPerm.data.user]].send(
        JSON.stringify(seekPerm),
      );
      return;
    }

    if (ev.method == "DENY-PERMISSION") {
      const seekPerm: Events = {
        method: "DENY-PERMISSION",
        data: ev.data,
      };

      user_to_socket_mapping[room_owner[seekPerm.data.user]].send(
        JSON.stringify(seekPerm),
      );
      return;
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
