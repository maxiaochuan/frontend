'use strict';

const DEFAULT_ROOM = 'DEFAULT_ROOM';

const ONLINE = 'online';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket } = ctx;
    const nsp = app.io.of('/chat');
    const query = socket.handshake.query;

    const { room = DEFAULT_ROOM } = query;

    socket.join(room, () => {
      setTimeout(() => {
        nsp.to(room).clients((e, clients) => {
          nsp.to(room).emit(ONLINE, {
            users: clients.map(id => nsp.sockets[id].user),
            action: ONLINE,
            message: `user ${socket.user.name} joined`,
          });
        });
      });
    });
    await next();
    nsp.to(room).clients((e, clients) => {
      nsp.to(room).emit(ONLINE, {
        users: clients.map(id => nsp.sockets[id].user),
        action: ONLINE,
        message: `user ${socket.user.name} disconnect`,
      });
    });
  };
};
