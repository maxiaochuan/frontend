import { IConfig } from '@mxcins/types';

const config: IConfig = {
  hash: true,
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
        },
        dynamicImport: {},
        dll: {},
      },
    ],
  ],
  proxy: {
    '/graphql': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    },
  },
  chainWebpack(chainConfig: any) {
    chainConfig.module
      .rule('exclude')
      .exclude.add(/\.(graphql|gql)$/)
      .end();
    chainConfig.module
      .rule('gql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader');
  },
};

export default config;