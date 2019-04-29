import { IReactComponent } from '@mxcins/types';
import React, { createContext, Dispatch, SFC, useEffect, useReducer } from 'react';
import { withRouter } from 'react-router';

import { IWrappedFormUtils, withForm } from '@/decorators';
import { ITableProps } from '../interface';
import { ActionType, IContextState } from './interface';

import { reducer } from './reducer';

export interface IContext {
  state: IContextState;
  dispatch: Dispatch<{ type: ActionType; payload: any }>;
  refetch?: () => Promise<any>;
  form?: IWrappedFormUtils;
  onExpand?: (...args: any[]) => void;
}

export const Context = createContext<IContext>({} as any);

const DEFAULT_ROWKEY = 'id';
const DEFAULT_SIZE = 'small';
const DEFAULT_DATA: any[] = [];

export default function withContext(component: IReactComponent<ITableProps>) {
  const Comp = component;
  const Component: SFC<ITableProps> = props => {
    const [state, dispatch] = useReducer(reducer, {
      klass: props.klass,
      params: { ...props.match.params, ...(props.params || {}) },
      rowKey: props.rowKey || DEFAULT_ROWKEY,
      cache: props.data || DEFAULT_DATA,
      data: props.data || DEFAULT_DATA,
      columns: {
        current: props.defaultColumns || [],
        default: props.defaultColumns || [],
        total: props.defaultColumns || [],
      },
      columnExtends: {},
      searchCache: {},
      searchWords: [],

      sortable: props.sortable,

      tree: props.tree,
      expandedRowKeys: [],
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
          onExpand: (expanded: boolean, record: any) =>
            dispatch({ type: 'EXPANDED', payload: { expanded, record } }),
        }}
      >
        <Comp {...props} />
      </Context.Provider>
    );
  };

  Component.defaultProps = {
    data: DEFAULT_DATA,
    sortable: true,
    rowKey: DEFAULT_ROWKEY,
    size: DEFAULT_SIZE,
    bordered: true,
  };

  return withRouter(withForm(Component));
}
