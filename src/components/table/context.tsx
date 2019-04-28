import { IObjectType, IReactComponent } from '@mxcins/types';
import React, { createContext, Dispatch, Reducer, useEffect, useReducer } from 'react';
import { withRouter } from 'react-router';

import { IWrappedFormUtils, withForm } from '@/decorators';
import { IColumnExtend, ITableProps } from './interface';
import { cacheGenerator, columnExtendsGenerator, totalColumnsGenerator } from './utils';

interface IState {
  klass: string;
  params: IObjectType;
  rowKey: string;
  cache: any[];
  data: any[];
  columns: IColumns;
  columnExtends: IObjectType<IColumnExtend>;
  searchCache: IObjectType<string>;
  searchWords: string[];
  editKey?: string;
  scroll?: {
    x?: boolean | number | string;
    y?: boolean | number | string;
  };
}

interface IAction {
  type: ActionType;
  payload: any;
}

interface IColumns {
  current: string[];
  default: string[];
  total: string[];
}

export const DEFAULT_TABLE_STATE: IState = {
  klass: '',
  params: {},
  rowKey: '',
  cache: [],
  data: [],
  columns: {
    current: [],
    total: [],
    default: [],
  },
  columnExtends: {},
  searchCache: {},
  searchWords: [],
};

export const Context = createContext<{
  state: IState;
  dispatch: Dispatch<{ type: ActionType; payload: any }>;
  refetch?: () => Promise<any>;
  form?: IWrappedFormUtils;
}>({
  state: DEFAULT_TABLE_STATE,
  dispatch: () => undefined,
  refetch: () => Promise.resolve(),
});

export type ActionType =
  | 'DATA'
  | 'SEARCH'
  | 'COLUMNS_CURRENT'
  | 'COLUMN_EXTENDS'
  | 'EDIT'
  | 'RESIZE';

const onSearch = (words: string[], cache: IObjectType, data: any[], rowKey: string) => {
  if (!words.length) {
    return data;
  }
  const init: IObjectType = {};
  const keys = Object.keys(cache)
    .filter(key => words.some(input => cache[key].includes(input)))
    .reduce((prev, key) => (prev[key] = true) && prev, init);

  return data.filter(d => keys[d[rowKey]]);
};

export const reducer: Reducer<IState, IAction> = (state, action) => {
  // tslint:disable-next-line:no-console
  console.log('reducer', action);
  switch (action.type) {
    case 'DATA':
      const d = state.columns.default;
      const total = totalColumnsGenerator(action.payload);
      const columns: IColumns = { ...state.columns };
      if (total.length) {
        columns.total = total;
        if (!d.length) {
          columns.current = [...total];
        }
      }
      return {
        ...state,
        cache: action.payload,
        data: action.payload,
        columns,
        searchCache: cacheGenerator(state.rowKey, columns.current, action.payload),
        columnExtends: columnExtendsGenerator(columns.current, state.columnExtends),
      };
    case 'SEARCH':
      return {
        ...state,
        searchWords: action.payload,
        data: onSearch(action.payload, state.searchCache, state.cache, state.rowKey),
      };
    case 'COLUMNS_CURRENT':
      return {
        ...state,
        columns: {
          ...state.columns,
          current: action.payload,
        },
        columnExtends: columnExtendsGenerator(action.payload, state.columnExtends),
        searchCache: cacheGenerator(state.rowKey, action.payload, action.payload),
      };
    case 'COLUMN_EXTENDS':
      return {
        ...state,
        columnExtends: columnExtendsGenerator(state.columns.current, action.payload),
      };
    case 'EDIT':
      return {
        ...state,
        editKey: action.payload,
      };
    case 'RESIZE':
      const style = window.getComputedStyle(action.payload);
      const wrapperWidth = parseInt(style.width as string, 10);
      const width = Object.values(state.columnExtends).reduce((prev, c) => {
        prev += c.width as number;
        return prev;
      }, 0);
      if (wrapperWidth < width) {
        return {
          ...state,
          scroll: {
            ...state.scroll,
            x: width,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

const DEFAULT_ROWKEY = 'id';

const DEFAULT_DATA: any[] = [];

export default function withContext(component: IReactComponent<ITableProps>) {
  const Comp = component;
  const Component = (props: ITableProps) => {
    const [state, dispatch] = useReducer(reducer, {
      klass: props.klass,
      params: { ...props.match.params, ...(props.params || {}) },
      rowKey: props.rowKey || DEFAULT_ROWKEY,
      cache: DEFAULT_DATA,
      data: DEFAULT_DATA,
      columns: {
        current: props.defaultColumns || [],
        default: props.defaultColumns || [],
        total: props.defaultColumns || [],
      },
      columnExtends: {},
      searchCache: {},
      searchWords: [],
    });

    const data = props.data || DEFAULT_DATA;

    useEffect(() => dispatch({ type: 'DATA', payload: data }), [data]);

    useEffect(() => dispatch({ type: 'COLUMN_EXTENDS', payload: props.columnExtends }), [
      props.columnExtends,
    ]);

    return (
      <Context.Provider
        value={{
          state,
          dispatch,
          form: props.form,
          refetch: props.refetch,
        }}
      >
        <Comp {...props} />
      </Context.Provider>
    );
  };

  return withRouter(withForm(Component));
}
