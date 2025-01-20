import WebSocket from "ws";

const clients: { [memberNo: string]: WebSocket } = {};

const webSocketServer = new WebSocket.Server({ noServer: true });

webSocketServer.on("connection", (socket, req) => {
  const urlParams = new URLSearchParams(req.url?.split("?")[1]);
  const memberNo = urlParams.get("member_no");

  if (!memberNo) {
    socket.close();
    return;
  }

  clients[memberNo] = socket;

  socket.on("close", () => {
    delete clients[memberNo];
  });
});

export const notifyClient = (memberNo: string, message: string) => {
  const client = clients[memberNo];
  if (client) {
    client.send(JSON.stringify({ message, timestamp: new Date() }));
  }
};

export default webSocketServer;