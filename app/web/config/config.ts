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
        {
          path: '/',
          component: '../layouts/AuthLayout',
          routes: [
            {
              name: 'Chat',
              path: '/chat',
              component: './Chat',
            },
          ],
        },
      ],
    },
  ],
};
