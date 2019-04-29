import { IObjectType, IRouteComponentProps, Omit } from '@mxcins/types';
import { ColumnProps } from 'antd/lib/table';

import { IWithFormResultProps } from '@/decorators';
import { ITreeOpts } from '@/helpers';

export interface ITableProps<T extends IObjectType = IObjectType>
  extends ITableCommonProps<T>,
    IWithFormResultProps,
    IRouteComponentProps {}

export interface ITableCommonProps<T extends IObjectType = IObjectType> {
  klass: string;
  loading?: boolean;
  data?: T[];
  defaultColumns?: string[];
  columnExtends?: { [x: string]: IColumnExtend<T> };

  /**
   * 数据相关
   */
  params?: IObjectType;
  refetch?: (...args: []) => Promise<any>;

  sortable?: boolean;

  /**
   * 控制列
   */
  controllers?: boolean;
  /**
   * 树结构
   */
  // tree?: ITreeOpts;

  /**
   * Antd Table
   */
  size?: 'default' | 'middle' | 'small';
  bordered?: boolean;
  // pagination?: PaginationConfig | false;
  rowKey?: string;

  tree?: ITreeOpts;
}

export interface IColumnExtend<T extends IObjectType = IObjectType>
  extends Omit<ColumnProps<T>, 'render'> {
  link?: { name?: string; to: string; params?: any };
  editing?: boolean;
}

export interface IRenderOpts<T> {
  searchWords?: string[];
  complicated: IColumnExtend<T>;
}

export type Render<T extends IObjectType = IObjectType> = (
  text: any,
  record: T,
  index: number,
) => React.ReactNode;
export type DefaultRenderGenerator = <T>(opts: IRenderOpts<T>) => Render<T>;
