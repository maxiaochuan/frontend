import { IConfig } from 'umi-types';

const config: IConfig = {
  hash: true,
  treeShaking: true,
  plugins: [
    ['umi-plugin-react', {
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
        webpackChunkName: true,
        level: 3,
      },
      dll: {
        include: [
          'react',
          'react-dom',
        ],
      },
    }],
  ],
  chainWebpack(chainConfig: any) {
    chainConfig.resolve.mainFields
      .add('main')
      .prepend('module')
      .prepend('jsnext:main')

    return chainConfig;
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000/api',
      changeOrigin: true,
    },
  },
  // ignoreMomentLocale: true,
}

export default config;
