const io = require('socket.io').listen(3000);
const validator = require('validator');

const connectedUsers = [];

io.on('connection', (socket) => {
// eslint-disable-next-line no-param-reassign
  socket.uuid = socket.handshake.query.uuid;
  console.log(`Connection from ${socket.uuid}`);
  if (!isUserConnected(socket.uuid)) {
    connectedUsers[socket.uuid] = [];
  }
  connectedUsers[socket.uuid].push(socket);
  socket.on('disconnect', () => {
    connectedUsers[socket.uuid] = connectedUsers[socket.uuid].filter(conn => conn.id !== socket.id);
    if (connectedUsers[socket.uuid].length === 0) {
      delete connectedUsers[socket.uuid];
    }
  });
  socket.on('download', (data) => {
    if (!data.url || !validator.isURL(data.url)) {
      socket.emit('error', 'Invalid URL.');
      return;
    }
    if (!data.format || !['epub', 'mobi', 'txt'].includes(data.format)) {
      socket.emit('error', 'Invalid format.');
      return;
    }
    if (data.email && !validator.isEmail(data.email)) {
      socket.emit('error', 'Invalid email address.');
      return;
    }
    // noinspection JSIgnoredPromiseFromCall
    download(data);
  });
});

function isUserConnected(userId) {
  return userId in connectedUsers;
}

function emitToUser(userId, event, data) {
  if (!isUserConnected(userId)) return;
  connectedUsers[userId].forEach((conn) => {
    conn.emit(event, data);
  });
}

async function download(data) {

}
