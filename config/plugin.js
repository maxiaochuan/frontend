'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  assets: {
    enable: true,
    package: 'egg-view-assets',
  },

  io: {
    enable: true,
    package: 'egg-socket.io',
  },
};
