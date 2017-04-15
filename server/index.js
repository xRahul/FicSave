const io = require('socket.io').listen(3000);

io.on('connection', (socket) => {
  console.log('connection');
  socket.emit('message', 'Hello world!');
  socket.on('ping1', () => {
    console.log('pong');
    socket.emit('pong');
  });
});
