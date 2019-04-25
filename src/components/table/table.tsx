import { IRouteComponentProps } from '@mxcins/types';
import { Form, Table as Base } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { SFC, useEffect, useReducer, useState } from 'react';
import { withRouter } from 'react-router';

import Cell from './cells/body';
import { renderColumns, renderControllerColumn } from './columns';
import { Context, reducer } from './context';
import Header, { ITableHeaderProps } from './header';
import { IObjectType, ITableProps } from './interface';
import { download, onDestory, onUpdate } from './utils';

import styles from './style.less';

export const DEFAULT_ROWKEY = 'id';
export const DEFAULT_SIZE = 'small';

export interface ITableFullProps<T extends IObjectType = IObjectType>
  extends ITableProps<T>,
    FormComponentProps,
    IRouteComponentProps {}

export const renderHeader = (props: ITableHeaderProps) => () => <Header {...props} />;

const CONTROLLER_COMPONENTS = { body: { cell: Cell } };

const Table: SFC<ITableFullProps> = props => {
  const [state, dispatch] = useReducer(reducer, {
    unique: props.rowKey || DEFAULT_ROWKEY,
    cache: [],
    data: [],
    columns: {
      current: props.defaultColumns || [],
      default: props.defaultColumns || [],
      total: [],
    },
    searchCache: {},
    searchWords: [],
  });

  useEffect(() => dispatch({ type: 'DATA', payload: props.data }), [props.data]);

  const [editKey, setEditKey] = useState<string>();

  const title = renderHeader({
    percent: [state.data.length, state.cache.length],
    onDownload: () => download(state.data),
  });

  return (
    <Context.Provider value={{ state, dispatch, form: props.form }}>
      <Base
        className={styles.table}
        rowKey={props.rowKey}
        components={props.controllers ? CONTROLLER_COMPONENTS : undefined}
        loading={props.loading}
        bordered={props.bordered}
        size={props.size}
        dataSource={state.data}
        title={title}
      >
        {renderColumns(state.columns.current, props, { editKey, searchWords: state.searchWords })}
        {props.controllers
          ? renderControllerColumn(props, editKey, {
              onEdit: setEditKey,
              onCancel: setEditKey,
              onEditSubmit: id => onUpdate(id, props, setEditKey),
              onDestory: id => onDestory(id, props, setEditKey),
            })
          : null}
      </Base>
    </Context.Provider>
  );
};

/**
 * default props
 */
Table.defaultProps = {
  data: [],

  sortable: true,

  rowKey: DEFAULT_ROWKEY,
  size: DEFAULT_SIZE,
  bordered: true,
};

export default withRouter(Form.create()(Table));
