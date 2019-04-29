import { IObjectType } from '@mxcins/types';
import { SorterResult } from 'antd/lib/table';

import { ITreeHelperOpts, TreeHelper } from '@/helpers';
import { IColumnExtend } from '../interface';

export interface IContextStateColumns {
  current: string[];
  default: string[];
  total: string[];
  props?: string[];
}

export interface IContextState {
  klass: string;
  params: IObjectType;
  rowKey: string;

  cache: any[];
  data: any[];

  columns: IContextStateColumns;
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

  tree?: ITreeHelperOpts;
  helper?: TreeHelper<IObjectType>;
  expandedRowKeys?: string[];
}

export type ActionType =
  | 'RETRIEVE_DATA'
  | 'SEARCH'
  | 'CHANGE_CURRENT_COLUMNS'
  | 'CHANGE_COLUMN_EXTENDS'
  | 'EDIT'
  | 'RESIZE'
  | 'SORT'
  | 'EXPANDED';
