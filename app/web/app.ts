// import * as url from 'url';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { parse } from 'qs';
// import isBrowser from 'umi-server/lib/isBrowser';

// const localeAlias: Record<string, string> = {
//   'zh-cn': 'zh-CN',
//   'zh-CN': 'zh-CN',
//   'en-US': 'en-US',
//   'en-us': 'en-US',
// };

export const locale = {
  default: () =>
    // const browser = isBrowser();
    // const href = browser ? window.location.href : (global as any).href;
    // // handle url /?locale=
    // const { search = '' } = url.parse(href || '/');
    // const { locale: searchLocale = '' } = parse(search, { ignoreQueryPrefix: true });
    // const queryLocale = localeAlias[searchLocale.toLowerCase()];
    // const localLocale =
    //   typeof localStorage !== 'undefined' ? localStorage.getItem('umi_locale') : '';
    // // zh-cn、zh_cn
    // const umiLocale = localeAlias[(localLocale || '').toLowerCase()];
    // return queryLocale || umiLocale || 'en-US';
    'en-US',
};
