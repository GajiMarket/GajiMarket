import WebSocket from 'ws';

// WebSocket 클라이언트 관리
const clients: { [memberNo: string]: WebSocket } = {};

// WebSocket 서버 설정
const webSocketServer = new WebSocket.Server({ noServer: true });

webSocketServer.on('connection', (socket, req) => {
  const urlParams = new URLSearchParams(req.url?.split('?')[1]);
  const memberNo = urlParams.get('member_no');

  if (!memberNo) {
    socket.close();
    return;
  }

  clients[memberNo] = socket;

  socket.on('close', () => {
    delete clients[memberNo];
  });
});

// 클라이언트에 알림 전송
export const notifyClient = (memberNo: string, message: string) => {
  const client = clients[memberNo];
  if (client) {
    client.send(JSON.stringify({ message, timestamp: new Date() }));
  }
};

export default webSocketServer;