'use strict';
const { join } = require('path');
const server = require('umi-server');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(props) {
    super(props);
    this.root = join(__dirname, '..', 'public');
  }
  async index() {
    const { ctx } = this;

    const render = server({
      root: this.root,
      polyfill: false,
      dev: ctx.app.config.env === 'local',
    });

    const { ssrHtml } = await render({
      req: { url: ctx.req.url },
    });

    ctx.body = ssrHtml;
  }
}

module.exports = HomeController;
