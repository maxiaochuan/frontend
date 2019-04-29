import { isObject } from '@mxcins/lodash';
import { Downloader } from '@mxcins/utils';

export const download = (data: any[]) =>
  Downloader.csv(
    '123123',
    data.map(item => {
      return Object.keys(item).reduce(
        (prev, key) => {
          prev[key] = isObject(item[key]) ? item[key].name || '' : item[key];
          return prev;
        },
        {} as any,
      );
    }),
  );
