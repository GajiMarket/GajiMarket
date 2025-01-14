import { Server } from 'socket.io';  // npm i socket.io
import http from 'http';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});