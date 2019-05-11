import { IObjectType } from '@mxcins/types';
import { SorterResult } from 'antd/lib/table';
import { Reducer } from 'react';

import { TreeHelper } from '@/helpers';
import { IColumnExtend } from '../interface';
import { ActionType, IContextState } from './interface';
import {
  columnExtendsGenerator,
  dataGenerator,
  searchCacheGenerator,
  totalColumnsGenerator,
} from './utils';

/**
 * tree 2019-04-29 12:22:03
 */
interface IAction<R extends ActionType = ActionType> {
  type: R;
  payload: R extends 'RETRIEVE_DATA'
    ? IObjectType[]
    : R extends 'SEARCH'
    ? string[]
    : R extends 'CHANGE_CURRENT_COLUMNS'
    ? IObjectType[]
    : R extends 'CHANGE_COLUMN_EXTENDS'
    ? IObjectType<IColumnExtend> | undefined
    : R extends 'EDIT'
    ? string
    : R extends 'RESIZE'
    ? HTMLDivElement
    : R extends 'SORT'
    ? SorterResult<any>
    : R extends 'EXPANDED'
    ? { expanded: boolean; record: IObjectType }
    : never;
}

export const reducer: Reducer<IContextState, IAction> = (state, action) => {
  // tslint:disable-next-line:no-console
  console.log('reducer', action);
  switch (action.type) {
    case 'RETRIEVE_DATA': {
      const next = {
        ...state,
      };
      /**
       * change data && cache
       */
      next.cache = action.payload as any[];
      next.data = next.cache;

      /**
       * change total columns
       */
      next.columns.total = totalColumnsGenerator(next);
      if (!next.columns.current.length) {
        next.columns.current = [...next.columns.total];
        next.columnExtends = columnExtendsGenerator(next);
      }

      /**
       * change search cache
       */
      next.searchCache = searchCacheGenerator(next);

      /**
       * tree
       */
      if (state.tree) {
        next.helper = new TreeHelper(next.cache, state.tree);
      }

      /**
       * generate data
       */
      next.data = dataGenerator(next);
      return next;
    }
    case 'SEARCH': {
      const next = {
        ...state,
      };

      next.searchWords = action.payload as string[];

      next.data = dataGenerator(next);
      if (next.tree && next.helper) {
        const init: IObjectType = {};
        const keys = Object.keys(next.searchCache)
          .filter(key => next.searchWords.some(input => next.searchCache[key].includes(input)))
          .reduce((prev, key) => (prev[key] = true) && prev, init);
        const IDs = next.helper.getParentIDs(Object.keys(keys));
        next.expandedRowKeys = [...new Set((state.expandedRowKeys || []).concat(IDs))];
      }

      return next;
    }
    case 'CHANGE_CURRENT_COLUMNS': {
      const current = action.payload as string[];
      const next = { ...state };
      next.columns = {
        ...state.columns,
        current,
      };

      next.columnExtends = columnExtendsGenerator(next);
      next.searchCache = searchCacheGenerator(next);
      next.data = dataGenerator(next);

      return next;
    }
    case 'CHANGE_COLUMN_EXTENDS': {
      const columnExtends = action.payload as IObjectType<IColumnExtend>;

      const next = { ...state };
      next.columnExtends = columnExtendsGenerator(next, columnExtends);

      return next;
    }
    case 'EDIT': {
      return {
        ...state,
        editKey: action.payload as string,
      };
    }
    case 'RESIZE': {
      const wrapper = action.payload as HTMLDivElement;
      const style = window.getComputedStyle(wrapper);
      const wrapperWidth = parseInt(style.width as string, 10);
      const width = Object.values(state.columnExtends).reduce((prev, c) => {
        prev += c.width as number;
        return prev;
      }, 0);
      if (wrapperWidth < width) {
        return {
          ...state,
          scroll: {
            ...state.scroll,
            x: width,
          },
        };
      }
      return state;
    }
    case 'SORT': {
      const sorter = action.payload as SorterResult<any>;
      const next = { ...state, sorter };
      next.data = dataGenerator(next);
      return next;
    }
    case 'EXPANDED': {
      const { expanded, record } = action.payload as { expanded: boolean; record: IObjectType };

      const next = { ...state };
      const key = record[state.rowKey];
      const expandedRowKeys = state.expandedRowKeys || [];
      if (expanded) {
        expandedRowKeys.push(key);
      } else {
        const index = expandedRowKeys.indexOf(key);
        expandedRowKeys.splice(index, 1);
      }
      next.expandedRowKeys = expandedRowKeys;
      return next;
    }
    default:
      return state;
  }
};
