import { factory } from '@mxcins/request';
export * from '@mxcins/request';
import Debug from 'debug';

const debug = Debug('utils:request');

const request = factory({
  errorHandler: error => {
    debug('errorHandler\n response: %o\n data: %o', error.response, error.data);
  },
});

export default request;
