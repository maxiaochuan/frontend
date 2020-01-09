export default {
  ssr: true,
  outputPath: '../public',
  publicPath: 'http://localhost:8000/',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
        },
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/CoreLayout',
      routes: [
        {
          name: 'Chat',
          path: '/chat',
          component: './Chat',
        },
      ],
    },
  ],
};
