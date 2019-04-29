import { isNumber, isObject } from '@mxcins/lodash';
import { IObjectType } from '@mxcins/types';
import { omit } from '@mxcins/utils';

import { IColumnExtend } from '../interface';
import { IContextState } from './interface';

type DGOR = (state: IContextState) => any[];
export const dataGenerator: DGOR = ({
  cache,
  searchCache,
  searchWords,
  rowKey,
  sorter,
  tree,
  helper,
}) => {
  if (tree && helper) {
    return helper.roots;
  }
  let result = [...cache];
  if (searchWords.length) {
    const init: IObjectType = {};
    const keys = Object.keys(searchCache)
      .filter(key => searchWords.some(input => searchCache[key].includes(input)))
      .reduce((prev, key) => (prev[key] = true) && prev, init);

    result = result.filter(d => keys[d[rowKey]]);
  }

  if (sorter && sorter.field) {
    const compare = compareFunctionGenerator(sorter.field, sorter.order);
    result.sort(compare);
  }

  return result;
};

const any2string = (input: any): string => {
  if (typeof input === 'object' && input) {
    const list = Array.isArray(input) ? input : Object.values(input);
    return list.reduce((prev, item) => `${prev}${any2string(item)}`, '');
  }
  if (typeof input === 'string' || typeof input === 'number') {
    return input as string;
  }
  return '';
};

type TCG = (state: IContextState) => string[];
export const totalColumnsGenerator: TCG = state => {
  if (state.cache.length) {
    const item = state.cache[0];
    if (!Array.isArray(item) && typeof item === 'object') {
      const ret = Object.keys(item).filter(i => i !== 'children' && i !== 'parent');
      return ret.length > state.columns.current.length ? ret : state.columns.current;
    }
  }
  return [];
};

type CEGOR = (
  state: IContextState,
  addedColumnExtends?: IObjectType<IColumnExtend>,
) => IObjectType<IColumnExtend>;
export const columnExtendsGenerator: CEGOR = (
  { columns: { current: columns }, columnExtends, sortable },
  addedColumnExtends = {},
) => {
  return columns.reduce((prev, key) => {
    const columnExtend = columnExtends[key] || {};
    const addedColumnExtend = addedColumnExtends[key] || {};
    prev[key] = {
      key,
      dataIndex: key,
      width: 200,
      title: key,
      sorter: sortable,
      ...columnExtend,
      ...addedColumnExtend,
      onCell: (item, index) => ({
        editing: columnExtend.editing,
        dataIndex: key,
        item,
        index,
      }),
    };
    return prev;
  }, columnExtends);
};

type SCGOR = (state: IContextState) => IObjectType<string>;
export const searchCacheGenerator: SCGOR = ({ rowKey, cache, columns: { current: columns } }) => {
  const init: IObjectType<string> = {};
  if (!cache.length || !columns.length) {
    return init;
  }

  const keys = Object.keys(cache[0]).filter(k => columns.indexOf(k) === -1);
  return cache.reduce((prev, item) => {
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
