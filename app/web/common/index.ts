import { extend } from '@mxcins/request';
import * as locale from 'umi-plugin-locale';

export const formatMessage = locale.formatMessage || ((() => '') as any);
export const FormattedMessage = locale.FormattedMessage || ((() => '') as any);

export const request = extend({
  timeout: 15000,
  credentials: 'include',
  prefix: '/api',
  errorHandler: e => {
    const { status } = e.response;
    if (status === 401) {
      console.error('401');
      return;
    }

    throw e;
  },
});
