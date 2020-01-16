'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async exchange() {
    const { ctx, app } = this;

    const nsp = app.io.of('/chat');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    // const client = socket.id;

    try {
      // const { target, payload } = message;
      // if (!target) return;
      // const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
      nsp.emit('exchange', {
        from: socket.user,
        ...message,
      });
    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = ChatController;
