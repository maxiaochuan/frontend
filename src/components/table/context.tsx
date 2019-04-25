import { WrappedFormUtils } from 'antd/lib/form/Form';
import { createContext, Reducer } from 'react';
import { IObjectType } from './interface';
import { cacheGenerator, totalColumnsGenerator } from './utils';

interface IState {
  unique: string;
  cache: any[];
  data: any[];
  columns: {
    current: string[];
    default: string[];
    total: string[];
  };
  // totalColumns: string[];
  // columns: string[];
  searchCache: { [x: string]: any };
  searchWords: string[];
}

export const DEFAULT_TABLE_STATE: IState = {
  unique: '',
  cache: [],
  data: [],
  columns: {
    current: [],
    total: [],
    default: [],
  },
  searchCache: {},
  searchWords: [],
};

export const Context = createContext<{ state: IState; dispatch: any; form?: WrappedFormUtils }>({
  state: DEFAULT_TABLE_STATE,
  dispatch: () => undefined,
});

// type Reducer<S, A> = (state: S, action: A) => S;

export type ActionType = 'DATA' | 'SEARCH' | 'COLUMNS_CURRENT';

const onSearch = (words: string[], cache: IObjectType, data: any[], unique: string) => {
  if (!words.length) {
    return data;
  }
  const init: IObjectType = {};
  const keys = Object.keys(cache)
    .filter(key => words.some(input => cache[key].includes(input)))
    .reduce((prev, key) => (prev[key] = true) && prev, init);

  return data.filter(d => keys[d[unique]]);
};

export const reducer: Reducer<IState, { type: ActionType; payload: any }> = (state, action) => {
  switch (action.type) {
    case 'DATA':
      // 数据更新时，同时更新当前数据和总的列
      return {
        ...state,
        cache: action.payload,
        data: action.payload,
        columns: {
          ...state.columns,
          total: totalColumnsGenerator(action.payload),
        },
        searchCache: cacheGenerator(state.unique, state.columns.current, action.payload),
      };
    case 'SEARCH':
      return {
        ...state,
        searchWords: action.payload,
        data: onSearch(action.payload, state.searchCache, state.cache, state.unique),
      };
    case 'COLUMNS_CURRENT':
      return {
        ...state,
        columns: {
          ...state.columns,
          current: action.payload,
        },
        searchCache: cacheGenerator(state.unique, action.payload, action.payload),
      };
    default:
      return state;
  }
};
