import { IConfig } from 'umi-types';
import routes from './routes.config';

const config: IConfig = {
  routes,
  hash: true,
  ignoreMomentLocale: true,
  targets: {
    ie: 11,
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        locale: {
          default: 'zh-CN',
          baseNavigator: false,
        },
        dynamicImport: {},
        // dll: {},
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    },
  },
  // chainWebpack(chainConfig: any) {
  //   chainConfig.module
  //     .rule('exclude')
  //     .exclude.add(/\.(graphql|gql)$/)
  //     .end();
  //   chainConfig.module
  //     .rule('gql')
  //     .test(/\.(graphql|gql)$/)
  //     .use('graphql-tag/loader')
  //     .loader('graphql-tag/loader');
  // },
};

export default config;
