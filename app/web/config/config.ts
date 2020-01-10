export default {
  ssr: true,
  outputPath: '../public',
  publicPath: 'http://localhost:8000/',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        locale: {
          baseNavigator: false,
          useLocalStorage: false,
        },
        // dynamicImport: {
        //   webpackChunkName: true,
        //   loadingComponent: './components/PageLoading',
        // },
      },
    ],
  ],
  // disableCSSModules: true,
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
        {
          name: 'Accounts',
          path: '/accounts',
          component: '../layouts/AccountLayout',
          routes: [
            {
              name: 'Login',
              path: '/accounts/login',
              component: './Accounts/Login',
            },
          ],
        },
        {
          name: 'Home',
          path: '/',
          component: './Home',
        },
      ],
    },
  ],
};
