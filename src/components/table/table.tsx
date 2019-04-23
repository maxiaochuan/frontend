import { IRouteComponentProps } from '@mxcins/types';
import { Form, Table as Base } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { createContext, SFC, useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import Cell from './cells/body';
import { renderColumns, renderControllerColumn } from './columns';
import Header, { ITableHeaderProps } from './header';
import { useColumns, useTotalColumns } from './hooks';
import { IObjectType, ITableProps } from './interface';
import { cacheGenerator, download, onDestory, onUpdate } from './utils';

import styles from './style.less';

export const DEFAULT_ROWKEY = 'id';
export const DEFAULT_SIZE = 'small';

export interface ITableFullProps<T extends IObjectType = IObjectType>
  extends ITableProps<T>,
    FormComponentProps,
    IRouteComponentProps {}

export const renderHeader = (props: ITableHeaderProps) => () => <Header {...props} />;

export const FormContext = createContext<WrappedFormUtils>({} as any);

const INIT_SEARCH_WORKDS: string[] = [];
const INIT_SEARCH_CACHE: IObjectType = {};
const CONTROLLER_COMPONENTS = { body: { cell: Cell } };

const Table: SFC<ITableFullProps> = props => {
  const totalColumns = useTotalColumns(props.data);
  const [columns, setColumns] = useColumns(props.defaultColumns, totalColumns);
  const [searchWords, onSearch] = useState(INIT_SEARCH_WORKDS);
  const [searchCache, setSearchCache] = useState(INIT_SEARCH_CACHE);
  const [dataSource, setDataSource] = useState([] as IObjectType[]);
  const [editKey, setEditKey] = useState<string>();

  const { rowKey = DEFAULT_ROWKEY } = props;

  useEffect(() => {
    const cache = cacheGenerator(rowKey, columns, props.data);
    setSearchCache(cache);
  }, [props.data, columns]);

  useEffect(() => {
    if (searchWords.length) {
      const init: IObjectType = {};
      const keys = Object.keys(searchCache)
        .filter(key => searchWords.some(input => searchCache[key].includes(input)))
        .reduce((prev, key) => (prev[key] = true) && prev, init);
      setDataSource((props.data || []).filter(d => keys[d[rowKey]]));
    } else {
      setDataSource(props.data || []);
    }
  }, [searchWords, props.data]);

  const title = renderHeader({
    percent: [(dataSource && dataSource.length) || 0, (props.data && props.data.length) || 0],
    columns,
    totalColumns,
    onColumnsChange: setColumns,
    searchWords,
    onSearch,
    onDownload: () => download(dataSource),
  });

  return (
    <FormContext.Provider value={props.form}>
      <Base
        className={styles.table}
        rowKey={props.rowKey}
        components={props.controllers ? CONTROLLER_COMPONENTS : undefined}
        loading={props.loading}
        bordered={props.bordered}
        size={props.size}
        dataSource={dataSource}
        title={title}
      >
        {renderColumns(columns, props, { editKey, searchWords })}
        {props.controllers
          ? renderControllerColumn(props, editKey, {
              onEdit: setEditKey,
              onCancel: setEditKey,
              onEditSubmit: id => onUpdate(id, props),
              onDestory: id => onDestory(id, props),
            })
          : null}
      </Base>
    </FormContext.Provider>
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
