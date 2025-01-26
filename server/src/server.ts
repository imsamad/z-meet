import ws from "ws";

const PORT = 4000;
const server = new ws.WebSocketServer({ port: PORT });

console.log("Server started on port", PORT);

server.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("message", (message) => {
    console.log("Message received:", JSON.parse(message.toString()).method);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
