import { isNumber, isObject } from '@mxcins/lodash';
import request from '@mxcins/request';
import { Downloader } from '@mxcins/utils';
import { message } from 'antd';
import omit from 'omit.js';
import { ITableFullProps } from './table';

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

export const onDestory = async (id: number | string, props: ITableFullProps) => {
  const { controllers, match } = props;
  try {
    if (controllers) {
      const resp = await request(controllers.delete, {
        params: { ...match.params, id },
        method: 'DELETE',
      });
      message.success(`Delete success, ${JSON.stringify(resp)}`);
      if (props.refetch) {
        await props.refetch();
      }
    }
  } catch (error) {
    if (error.response) {
      message.error(JSON.stringify(error.data));
      return;
    }
  }
};

export const onUpdate = async (id: number | string, props: ITableFullProps) => {
  const { controllers, match } = props;
  const [error, values] = await new Promise(resolve => {
    props.form.validateFields((e, v) => resolve([e, v]));
  });
  if (error) {
    message.error(JSON.stringify(error));
    return;
  }
  try {
    if (controllers) {
      const resp = await request(controllers.update, {
        method: 'PATCH',
        params: { ...match.params, id },
        data: values,
      });
      message.success(JSON.stringify(resp));
      return;
    }
  } catch (error) {
    if (error.response) {
      message.error(JSON.stringify(error.data));
      return;
    }
  }
};

export const any2string = (input: any): string => {
  if (typeof input === 'object' && input) {
    const list = Array.isArray(input) ? input : Object.values(input);
    return list.reduce((prev, item) => `${prev}${any2string(item)}`, '');
  }
  if (typeof input === 'string' || typeof input === 'number') {
    return input as string;
  }
  return '';
};

export const cacheGenerator = <T extends { [x: string]: any }>(
  rowKey: string,
  columns: string[],
  data: T[] = [],
) => {
  const init: { [x: string]: string } = {};
  if (!data.length) {
    return init;
  }
  const keys = Object.keys(data[0]).filter(k => columns.indexOf(k) === -1);
  return data.reduce((prev, item) => {
    prev[item[rowKey]] = any2string(omit(item, keys));
    return prev;
  }, init);
};

export function compareFunctionGenerator<T>(key: keyof T, order: 'ascend' | 'descend') {
  return (a: T, b: T) => {
    const va = a[key] as unknown;
    const vb = b[key] as unknown;
    if (isNumber(va) && isNumber(vb)) {
      return order === 'ascend' ? va - vb : vb - va;
    }
    if (isObject(va) && isObject(vb)) {
      const na = (va as { context: string }).context;
      const nb = (vb as { context: string }).context;
      if (na && nb) {
        return order === 'ascend' ? `${na}`.localeCompare(`${nb}`) : `${nb}`.localeCompare(`${na}`);
      }
    }
    return order === 'ascend' ? `${va}`.localeCompare(`${vb}`) : `${vb}`.localeCompare(`${va}`);
  };
}
