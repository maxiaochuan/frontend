import { Table as Base } from 'antd';
import React, { SFC, useContext } from 'react';

import { BodyCell } from './cells';
import { renderController, renderCurrent } from './columns';
import withContext, { Context } from './context';
import Header from './header';
import { ITableProps } from './interface';
import styles from './style.less';

export const DEFAULT_ROWKEY = 'id';
export const DEFAULT_SIZE = 'small';

const CONTROLLER_COMPONENTS = { body: { cell: BodyCell } };

const header = () => <Header />;

const Table: SFC<ITableProps> = props => {
  const { state } = useContext(Context);

  return (
    <Base
      className={styles.table}
      rowKey={props.rowKey}
      components={CONTROLLER_COMPONENTS}
      loading={props.loading}
      bordered={props.bordered}
      size={props.size}
      dataSource={state.data}
      title={header}
    >
      {state.columns.current.map(column => renderCurrent(column, state.columnExtends[column]))}
      {props.controllers ? renderController() : null}
    </Base>
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

export default withContext(Table);
