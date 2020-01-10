'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, io, controller } = app;
  router.get('*', controller.home.index);

  io.of('/chat').route('exchange', io.controller.chat.exchange);
};
