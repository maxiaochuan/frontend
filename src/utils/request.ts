import { factory } from '@mxcins/request';
import Debug from 'debug';
import router from 'umi/router';

export * from '@mxcins/request';

const debug = Debug('utils:request');

const request = factory({
  prefix: '/api',
  credentials: 'include',
  errorHandler: error => {
    debug('errorHandler\n response: %o\n data: %o', error.response, error.data);
    if (error.response.status === 401) {
      if (error.data.status === 'VERIFICATION_ERROR' || error.data.status === 'EXPIRED_SIGNATURE') {
        return router.push('/login');
      }
    }

    throw error;
  },
});

export default request;
