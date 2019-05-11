import { Table as Base } from 'antd';
import { debounce } from 'lodash-es';
import React, { SFC, useContext, useEffect, useRef } from 'react';

import { SorterResult } from 'antd/lib/table';
import { BodyCell } from './cells';
import { renderController, renderCurrent } from './columns';
import withContext, { Context } from './context';
import Header from './Header';
import { ITableProps } from './interface';
import styles from './style.less';

const CONTROLLER_COMPONENTS = { body: { cell: BodyCell } };

const header = () => <Header />;

const Table: SFC<ITableProps> = props => {
  const { state, dispatch, onExpand } = useContext(Context);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resize = debounce(() => dispatch({ type: 'RESIZE', payload: wrapper.current }), 2000);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handlers = useRef({
    onChange: (
      _PAGE: any, // PaginationConfig,
      _RECORD: any, // Record<keyof T, string[]>,
      sorter: SorterResult<any>,
    ) => dispatch({ type: 'SORT', payload: sorter }),
  });

  return (
    <div ref={wrapper}>
      <Base
        className={styles.table}
        rowKey={props.rowKey}
        components={CONTROLLER_COMPONENTS}
        loading={props.loading}
        bordered={props.bordered}
        size={props.size}
        dataSource={state.data}
        title={header}
        scroll={state.scroll}
        onChange={handlers.current.onChange}
        expandedRowKeys={state.expandedRowKeys}
        onExpand={onExpand}
      >
        {state.columns.current.map(column => renderCurrent(column, state.columnExtends[column]))}
        {props.controllers ? renderController() : null}
      </Base>
    </div>
  );
};

export default withContext(Table);
