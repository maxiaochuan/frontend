import { factory } from '@mxcins/request';

export const request = factory({ prefix: '/api', suffix: '.json' });

export * from '@mxcins/request';
export { default as getApi } from './api';
