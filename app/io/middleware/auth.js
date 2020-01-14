'use strict';
// const DEFAULT_ROOM = 'DEFAULT_ROOM';

module.exports = async (ctx, next) => {
  const { app, socket } = ctx;

  const resp = await app.curl('127.0.0.1:3000/api/authenticate.json', {
    method: 'POST',
    dataType: 'json',
    headers: {
      ...socket.handshake.headers,
    },
  });

  if (resp.status === 401) {
    // TODO: tick;
  }

  socket.user = resp.data;
  // const nsp = app.io.of('/chat');
  // const query = socket.handshake.query;

  // const { room = DEFAULT_ROOM } = query;

  // socket.join(room, () => {
  //   setTimeout(() => {
  //     nsp.to(room).clients((e, clients) => {
  //       nsp.to(room).emit('ONLINE', {
  //         users: clients.map(id => nsp.sockets[id].user),
  //         action: 'ONLINE',
  //         message: `user ${socket.id} joined`,
  //       });
  //     });
  //   });
  // });

  await next();
};
