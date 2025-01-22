import app from "../app";
import webSocketServer from "../config/websocket"; // WebSocket 서버 import
import { createServer } from "http"; // HTTP 서버 생성

const main = async () => {
  const PORT = process.env.PORT || "8080";

  // HTTP 서버 생성
  const server = createServer(app);

  // WebSocket 서버 연결
  server.on("upgrade", (req, socket, head) => {
    webSocketServer.handleUpgrade(req, socket, head, (ws) => {
      webSocketServer.emit("connection", ws, req);
    });
  });

  // 서버 실행
  app.listen(parseInt(PORT, 10), () => {
    console.log(`Server is running on port ${PORT}, NODE_ENV=${process.env.NODE_ENV}`);
  });
};

main().catch((err) => {
  console.error((err as Error).message);
});