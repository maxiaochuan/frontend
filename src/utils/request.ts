import { factory } from '@mxcins/request';
export * from '@mxcins/request';
import Debug from 'debug';
import router from 'umi/router';

const debug = Debug('utils:request');

const request = factory({
  errorHandler: error => {
    debug('errorHandler\n response: %o\n data: %o', error.response, error.data);
    if (error.response.status === 401) {
      if (error.data.status === 'VERIFICATION_ERROR') {
        router.push('/');
      }
    }
  },
});

export default request;
