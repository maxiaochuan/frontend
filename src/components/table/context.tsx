import { IObjectType, IReactComponent } from '@mxcins/types';
import React, { createContext, Dispatch, Reducer, SFC, useEffect, useReducer } from 'react';
import { withRouter } from 'react-router';

import { IWrappedFormUtils, withForm } from '@/decorators';
import { SorterResult } from 'antd/lib/table';
import { IColumnExtend, ITableProps } from './interface';
import {
  cacheGenerator,
  columnExtendsGenerator,
  compareFunctionGenerator,
  totalColumnsGenerator,
} from './utils';

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

  sortable?: boolean;
  sorter?: SorterResult<any>;
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
  | 'RETRIEVE_DATA'
  | 'SEARCH'
  | 'CHANGE_CURRENT_COLUMNST'
  | 'CHANGE_COLUMN_EXTENDS'
  | 'EDIT'
  | 'RESIZE'
  | 'SORT';

const dataGenerator = ({ cache, searchCache, searchWords, rowKey, sorter }: IState) => {
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

export const reducer: Reducer<IState, IAction> = (state, action) => {
  // tslint:disable-next-line:no-console
  console.log('reducer', action);
  switch (action.type) {
    case 'RETRIEVE_DATA': {
      const cache = action.payload as any[];
      const total = totalColumnsGenerator(cache);
      const columns: IColumns = { ...state.columns };
      const d = state.columns.default;
      if (total.length) {
        columns.total = total;
        if (!d.length) {
          columns.current = [...total];
        }
      }
      const next = {
        ...state,
        cache,
        columns,
        searchCache: cacheGenerator(state.rowKey, columns.current, cache),
        columnExtends: columnExtendsGenerator(columns.current, state.columnExtends, {
          sortable: state.sortable,
        }),
      };

      next.data = dataGenerator(next);
      return next;
    }
    case 'SEARCH': {
      const next = {
        ...state,
        searchWords: action.payload,
      };
      next.data = dataGenerator(next);
      return next;
    }
    case 'CHANGE_CURRENT_COLUMNST': {
      const next = {
        ...state,
        columns: {
          ...state.columns,
          current: action.payload,
        },
        columnExtends: columnExtendsGenerator(action.payload, state.columnExtends, {
          sortable: state.sortable,
        }),
        searchCache: cacheGenerator(state.rowKey, action.payload, state.cache),
      };
      next.data = dataGenerator(next);
      return next;
    }
    case 'CHANGE_COLUMN_EXTENDS': {
      return {
        ...state,
        columnExtends: columnExtendsGenerator(state.columns.current, action.payload, {
          sortable: state.sortable,
        }),
      };
    }
    case 'EDIT': {
      return {
        ...state,
        editKey: action.payload,
      };
    }
    case 'RESIZE': {
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
    }
    case 'SORT': {
      const sorter = action.payload as SorterResult<any>;
      const next = {
        ...state,
        sorter,
      };
      next.data = dataGenerator(next);
      return next;
    }
    default:
      return state;
  }
};

const DEFAULT_ROWKEY = 'id';
const DEFAULT_SIZE = 'small';
const DEFAULT_DATA: any[] = [];

export default function withContext(component: IReactComponent<ITableProps>) {
  const Comp = component;
  const Component: SFC<ITableProps> = (props: ITableProps) => {
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

      sortable: props.sortable,
    });

    const data = props.data || DEFAULT_DATA;

    useEffect(() => dispatch({ type: 'RETRIEVE_DATA', payload: data }), [data]);

    useEffect(() => dispatch({ type: 'CHANGE_COLUMN_EXTENDS', payload: props.columnExtends }), [
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

  Component.defaultProps = {
    data: [],
    sortable: true,
    rowKey: DEFAULT_ROWKEY,
    size: DEFAULT_SIZE,
    bordered: true,
  };

  return withRouter(withForm(Component));
}
