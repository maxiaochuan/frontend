import { Table as Base } from 'antd';
import React from 'react';

import { IColumnExtend, ITableProps } from './interface';
import controllerRenderGenerators from './renders/controllers';
import { renderGenerator } from './renders/default';
import { DEFAULT_ROWKEY } from './table';

const complicatedColumnPropsGenerator = (
  key: string,
  editKey: string | undefined,
  extend: IColumnExtend,
  props: ITableProps,
): IColumnExtend => ({
  key,
  dataIndex: key,
  title: key,
  width: 100,
  sorter: props.sortable,
  ...extend,
  onCell: props.controllers
    ? record => ({
        key,
        dataIndex: key,
        record,
        rowKey: props.rowKey || DEFAULT_ROWKEY,
        editing: editKey === record[props.rowKey || DEFAULT_ROWKEY],
      })
    : undefined,
});

interface IRenderColumnsOpts {
  searchWords: string[];
  editKey: string | undefined;
}

export const renderColumns = (
  columns: string[],
  props: ITableProps,
  { searchWords, editKey }: IRenderColumnsOpts,
) => {
  const propsArray = columns.map(column => {
    const extend = (props.columnExtends && props.columnExtends[column]) || {};
    const complicated = complicatedColumnPropsGenerator(column, editKey, extend, props);

    complicated.render = renderGenerator({ complicated, searchWords });
    return complicated;
  });

  return propsArray.map(p => <Base.Column key={p.key} {...p} />);
};

export const renderControllerColumn = (
  props: ITableProps,
  editKey: string | undefined,
  handlers: {
    onEdit: (item: any) => void;
    onEditSubmit: (id: string | number) => void;
    onCancel: (id: undefined) => void;
    onDestory: (id: string | number) => void;
  },
) => {
  const { rowKey = DEFAULT_ROWKEY } = props;
  const key = 'controllers';
  const complicated = complicatedColumnPropsGenerator(key, undefined, {}, props);
  const render = controllerRenderGenerators(handlers, rowKey, editKey);

  return <Base.Column key={key} {...complicated} render={render} />;
};
