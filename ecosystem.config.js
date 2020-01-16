'use strict';

module.exports = {
  apps: [
    {
      name: 'Frontend',
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '47.94.145.118',
      ref: 'origin/isomorphism',
      repo: 'git@github.com:maxiaochuan/frontend.git',
      path: '/var/mxcins.com/frontend',
      'post-deploy': 'source ~/.zshrc && yarn && yarn stop && yarn start',
    },
  },
};
