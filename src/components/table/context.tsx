import pluralize from '@mxcins/pluralize';
import { IObjectType, IReactComponent } from '@mxcins/types';
import { Form } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { createContext, Dispatch, Reducer, useEffect, useReducer } from 'react';
import { withRouter } from 'react-router';

import attachQuery from '@/decorators/attach-query';
import { IColumnExtend, ITableProps } from './interface';
import { cacheGenerator, columnExtendsGenerator, totalColumnsGenerator } from './utils';

interface IState {
  klass: string;
  params: IObjectType;
  rowKey: string;
  cache: any[];
  dataSource: any[];
  columns: IColumns;
  columnExtends: IObjectType<IColumnExtend>;
  searchCache: IObjectType<string>;
  searchWords: string[];
  editKey?: string;
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
  dataSource: [],
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
  refetch: () => Promise<any>;
  form?: WrappedFormUtils;
}>({
  state: DEFAULT_TABLE_STATE,
  dispatch: () => undefined,
  refetch: () => Promise.resolve(),
});

export type ActionType = 'DATA' | 'SEARCH' | 'COLUMNS_CURRENT' | 'COLUMN_EXTENDS' | 'EDIT';

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
  console.log('action', action);
  switch (action.type) {
    case 'DATA':
      // 数据更新时，同时更新当前数据和总的列
      const d = state.columns.default;
      const total = totalColumnsGenerator(action.payload);
      const columns: IColumns = { ...state.columns, total };
      if (!d.length) {
        columns.current = [...total];
      }
      return {
        ...state,
        cache: action.payload,
        dataSource: action.payload,
        columns,
        searchCache: cacheGenerator(state.rowKey, columns.current, action.payload),
        columnExtends: columnExtendsGenerator(columns.current, {}),
      };
    case 'SEARCH':
      return {
        ...state,
        searchWords: action.payload,
        dataSource: onSearch(action.payload, state.searchCache, state.cache, state.rowKey),
      };
    case 'COLUMNS_CURRENT':
      return {
        ...state,
        columns: {
          ...state.columns,
          current: action.payload,
        },
        columnExtends: columnExtendsGenerator(action.payload, {}),
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
      dataSource: DEFAULT_DATA,
      columns: {
        current: props.defaultColumns || [],
        default: props.defaultColumns || [],
        total: props.defaultColumns || [],
      },
      columnExtends: props.columnExtends || {},
      searchCache: {},
      searchWords: [],
    });

    const dk = pluralize.plural(props.klass);

    const data = props.data[dk] || DEFAULT_DATA;

    useEffect(() => dispatch({ type: 'DATA', payload: data }), [data]);

    useEffect(() => dispatch({ type: 'COLUMN_EXTENDS', payload: props.columnExtends }), [
      props.columnExtends,
    ]);

    return (
      <Context.Provider value={{ state, dispatch, form: props.form, refetch: props.refetch }}>
        <Comp {...props} />
      </Context.Provider>
    );
  };

  return withRouter(attachQuery(Form.create()(Component)));
}
