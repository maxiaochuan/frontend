import { ColumnProps } from 'antd/lib/table';

export interface ITableProps<T extends IObjectType = IObjectType> {
  klass?: string;
  data?: T[];
  defaultColumns?: string[];
  columnExtends?: { [x: string]: IColumnExtend<T> };

  sortable?: boolean;

  /**
   * 控制列
   */
  controllers?: {
    update: string;
    delete: string;
  };
  refetch?: () => void;
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
  loading?: boolean;
}

export interface IObjectType {
  [x: string]: any;
}

export interface IColumnExtend<T extends IObjectType = IObjectType> extends ColumnProps<T> {
  link?: { name?: string; to: string; params?: any };
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
