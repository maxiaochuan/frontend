module.exports = {
  apps: [
    {
      name: 'mxcins.frontend',
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '47.94.145.118',
      ref: 'origin/master',
      repo: 'git@github.com:maxiaochuan/frontend.git',
      path: '/var/mxcins.com/frontend',
      'post-deploy': 'source ~/.zshrc && yarn && yarn build',
    },
  },
};
