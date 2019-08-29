import { IConfig } from 'umi-types';

const config: IConfig = {
  hash: true,
  treeShaking: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        targets: {
          chrome: 49,
          firefox: 45,
          safari: 10,
          ie: 10,
          edge: 13,
          ios: 10,
        },
        locale: {
          default: 'en-US',
          baseNavigator: false,
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
          webpackChunkName: true,
          level: 3,
        },
        dll: {
          include: ['react', 'react-dom', 'antd'],
        },
      },
    ],
  ],
  // chainWebpack(chainConfig: any) {
  //   return chainConfig;
  // },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    '/socket': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
  // ignoreMomentLocale: true,
};

export default config;
