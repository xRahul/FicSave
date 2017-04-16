const io = require('socket.io').listen(3000);

io.on('connection', (socket) => {
  console.log(`Connection from ${socket.handshake.query.uuid}`);
});
