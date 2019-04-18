import { Form, message, Modal, Table as Base } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { ColumnProps, PaginationConfig, SorterResult } from 'antd/lib/table';
import * as PropTypes from 'prop-types';
import React, { Component, createContext } from 'react';

import { ITreeOpts, Tree as TreeHelper } from '@/helpers';
import Cell from './cell';
import controllerRenderGenerator from './controllers';
import { deleteHandler, updateHandler } from './handlers';
import Header from './header';
import { renderGenerator } from './render';
import styles from './style.less';
import { cacheGenerator, compareFunctionGenerator, download, totalColumnsGenerator } from './utils';

const DEFAULT_ROW_KEY = 'id';

export interface ITPS<T extends { [x: string]: any } = any> {
  klass?: string;
  data?: T[];
  defaultColumns?: string[];
  columnExtends?: { [x: string]: ColumnProps<T> };

  sortable?: boolean;

  /**
   * 控制列
   */
  controllers?: IControllers;
  refetch?: () => void;
  /**
   * 树结构
   */
  tree?: ITreeOpts;

  /**
   * Antd Table
   */
  size?: 'default' | 'middle' | 'small';
  bordered?: boolean;
  pagination?: PaginationConfig | false;
  rowKey?: string;
  loading?: boolean;
}

export interface IControllers {
  delete?: string;
  update?: string;
}

interface ICache {
  [x: string]: string;
}

export interface ITS<T extends { [x: string]: any } = any> {
  dataSource: T[];
  columns: string[];
  totalColumns: string[];
  conditions: IConditions<T>;
  sorter?: SorterResult<T>;
  cache: ICache;
  searchWords: string[];

  editKey?: string | number;

  /**
   * 展开逻辑解决不了了， 暴力语法触发searching的时候从新展开
   */
  searching?: boolean;
  treeHelper?: TreeHelper<T>;
  expandedRowKeys: string[];
}

export type Condition<T> = (cache: ICache) => (item: T, ...args: any[]) => boolean;

export interface IConditions<T> {
  search?: Condition<T>;
}

export interface IColumnExtend<T> extends ColumnProps<T> {
  // link?: ISmartLinkProps;
}

/**
 * columns to antd columns
 * @param column
 */
const complicatedColumnPropsGenerator = <T extends any>(
  key: string,
  extend: IColumnExtend<T>,
  props: ITPS<T>,
  state: ITS<T>,
): IColumnExtend<T> => ({
  key,
  dataIndex: key,
  title: key,
  width: 100,
  sorter: !props.tree && props.sortable,
  ...extend,
  onCell: record => ({
    key,
    dataIndex: key,
    record,
    rowKey: props.rowKey || DEFAULT_ROW_KEY,
    editing: state.editKey === record[props.rowKey || DEFAULT_ROW_KEY],
  }),
});

const controllersColumnPropsGenerator = <T extends any>(key: string, extend: IColumnExtend<T>) => ({
  key,
  dataIndex: key,
  title: key,
  width: 100,
  ...extend,
});

export const FormContext = createContext<WrappedFormUtils>({} as any);

/**
 * 2019-04-15 14:03:15 控制列
 * 2019-04-16 15:22:42 树形结构
 */
class Table<T extends { [x: string]: any } = any> extends Component<
  ITPS<T> & FormComponentProps,
  ITS<T>
> {
  public static propTypes = {
    data: PropTypes.array,
  };
  public static defaultProps: Partial<ITPS> = {
    defaultColumns: [],
    columnExtends: {},
    data: [],
    sortable: true,

    size: 'small',
    bordered: true,
    pagination: {
      position: 'both',
    },
    rowKey: DEFAULT_ROW_KEY,
  };

  public static getDerivedStateFromProps<U extends { [x: string]: any }>(
    nextProps: Readonly<ITPS<U>>,
    prevState: ITS<U>,
  ): Partial<ITS<U>> {
    const state: Partial<ITS<U>> = {};
    const { columns, conditions, sorter, expandedRowKeys = [], searching } = prevState;
    const { rowKey = DEFAULT_ROW_KEY, tree, data = [] } = nextProps;

    state.totalColumns = totalColumnsGenerator(data);
    if (!columns.length && state.totalColumns.length) {
      state.columns = [...state.totalColumns];
    }

    state.cache = cacheGenerator(rowKey, columns, data);

    const dataSource: U[] = Object.values(conditions).reduce(
      (prev, condition) => prev.filter(condition(state.cache) as Condition<U>),
      [...data],
    );

    if (tree) {
      state.treeHelper = new TreeHelper(data, tree);
      if (searching) {
        const keys = dataSource.map(i => i[rowKey]);
        const ids = state.treeHelper.getParentIDs(keys);
        state.expandedRowKeys = [...new Set(ids.concat(expandedRowKeys))];
        state.searching = false;
      }
    }
    if (sorter && sorter.field) {
      const compareFunction = compareFunctionGenerator(sorter.field, sorter.order);
      dataSource.sort(compareFunction);
    }

    state.dataSource = dataSource;

    return state;
  }

  constructor(props: ITPS<T> & FormComponentProps) {
    super(props);
    const columns = props.defaultColumns || [];

    this.state = {
      dataSource: [],
      columns,
      totalColumns: [],
      conditions: {},
      cache: {},
      searchWords: [],
      expandedRowKeys: [],
    };
  }

  public render() {
    const { dataSource, columns, expandedRowKeys, treeHelper } = this.state;
    const {
      controllers,
      bordered,
      size,
      pagination,
      rowKey = DEFAULT_ROW_KEY,
      loading,
      form,
      tree,
    } = this.props;

    const components = controllers ? { body: { cell: Cell } } : undefined;

    return (
      <FormContext.Provider value={form}>
        <Base
          components={components}
          size={size}
          rowKey={rowKey}
          bordered={bordered}
          className={styles.table}
          loading={loading}
          pagination={!tree && pagination}
          title={this.renderHeader}
          dataSource={tree ? treeHelper && treeHelper.roots : dataSource}
          onChange={this.onChange}
          onExpand={this.onExpand}
          expandedRowKeys={expandedRowKeys}
        >
          {this.renderColumns(columns)}
        </Base>
      </FormContext.Provider>
    );
  }

  /**
   * columns render
   */
  private renderColumns = (columns: string[]) => {
    const { searchWords, editKey } = this.state;
    const { rowKey = DEFAULT_ROW_KEY, columnExtends = {}, controllers = {} } = this.props;

    const propsArray = columns.map(c => {
      const props = complicatedColumnPropsGenerator(
        c,
        columnExtends[c] || {},
        this.props,
        this.state,
      );
      props.render = renderGenerator({ complicated: props, searchWords });
      return props;
    });

    if (controllers) {
      const k = 'controllers';
      const props = controllersColumnPropsGenerator(k, columnExtends[k] || {});
      const handlers = {
        onDestory: this.onDestory,
        onEdit: this.onEdit,
        onEditSubmit: this.onEditSubmit,
        onCancel: this.onCancel,
      };
      props.render = controllerRenderGenerator(handlers, rowKey, editKey);
      propsArray.push(props);
    }

    return propsArray.map(props => <Base.Column key={props.key} {...props} />);
  };

  /**
   * header render
   */
  private renderHeader = () => (
    <Header
      {...this.props}
      {...this.state}
      onSearch={this.onSearch}
      onColumnsChange={this.updateColumns}
      onDownload={this.onDownload}
    />
  );

  /**
   * on change
   */
  private onChange = async (
    _PAGE: PaginationConfig,
    _RECORD: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
  ) => {
    return new Promise(resolve => this.setState({ sorter }, resolve));
  };
  /**
   * on expend
   */
  private onExpand = async (expanded: boolean, record: T) => {
    const { rowKey = DEFAULT_ROW_KEY } = this.props;
    const keys = new Set(this.state.expandedRowKeys || []);
    const k = record[rowKey];
    if (expanded) {
      keys.add(k);
    } else {
      if (keys.has(k)) {
        keys.delete(k);
      }
    }
    return new Promise(resolve =>
      this.setState(
        {
          expandedRowKeys: [...keys],
        },
        resolve,
      ),
    );
  };
  // private onExpandedRowsChange = async (rows: string[] | number[]) => new Promise(resolve => this.setState({
  //   expandedRowKeys: [...new Set([...this.state.expandedRowKeys, ...rows ])] as (string[] | number[])
  // }, resolve))

  /**
   * on search
   */
  private onSearch = async (inputs: string[]) => {
    const { rowKey = 'id' } = this.props;

    const condition: Condition<T> =
      inputs.length === 0
        ? () => () => true
        : (cache: any) => {
            const init: { [x: string]: true } = {};
            const keys = Object.keys(cache)
              .filter(key => inputs.some(input => cache[key].includes(input)))
              .reduce((prev, key) => (prev[key] = true) && prev, init);

            return item => {
              const k = item[rowKey];
              return keys[k];
            };
          };

    await new Promise(resolve =>
      this.setState(
        {
          searchWords: inputs,
          conditions: {
            ...this.state.conditions,
            search: condition,
          },
          // TODO: 迷之尴尬
          searching: inputs.length ? true : false,
        },
        resolve,
      ),
    );
  };

  /**
   * on download
   */
  private onDownload = () => download(this.state.dataSource);

  /**
   * columns change handler
   */
  private updateColumns = async (columns: string[]) =>
    new Promise(resolve => this.setState({ columns }, resolve));

  /**
   * 编辑
   */
  private onDestory = async (id: number | string) => {
    const { controllers = {} } = this.props;
    try {
      await deleteHandler(id, controllers.delete || '');
      await this.onUpdate();
    } catch (error) {
      if (error.response) {
        Modal.error({
          title: `${error.message}: ${error.response.status}`,
          content: JSON.stringify(error.data),
        });
        return;
      }
    }
  };
  private onEdit = async (record: T) =>
    new Promise(resolve =>
      this.setState({ editKey: record[this.props.rowKey || DEFAULT_ROW_KEY] }, resolve),
    );

  private onEditSubmit = async (id: number | string) => {
    const { form, controllers = {} } = this.props;
    try {
      await updateHandler(form, controllers.update || '', id);
      await this.onCancel();
      await this.onUpdate();
    } catch (error) {
      message.error(error);
    }
  };

  private onCancel = async () =>
    new Promise(resolve => this.setState({ editKey: undefined }, resolve));

  private onUpdate = () => this.props.refetch && this.props.refetch();
}

export default Form.create()(Table);
