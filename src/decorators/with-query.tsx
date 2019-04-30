import { IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React, { RefObject } from 'react';
import { OperationVariables, Query, QueryResult } from 'react-apollo';

export interface IWithQueryResultProps<D = any, V extends OperationVariables = any> {
  queryResult: QueryResult<D, V>;
}

export interface IWithQueryRequiredProps<D = any, V extends OperationVariables = any> {
  withQuery?: {
    queryRef?: RefObject<QueryResult<D, V>>;
    vars?: V;
  };
}

/**
 * 2019-04-30 14:57:00 定版 v1.0
 * query 绝大多数情况下可以确定而且不需要变化，vars 会随各种情况变化
 * @param query
 */
export default function withQuery<D = any, V extends OperationVariables = {}>(query: DocumentNode) {
  return function target<P extends IWithQueryResultProps<D, V>>(
    component: IReactComponent<P>,
  ): IReactComponent<Omit<P, keyof IWithQueryResultProps> & IWithQueryRequiredProps<D, V>> {
    const Component = component;
    return props => {
      const { withQuery: wq = {}, ...others } = props;
      return (
        <Query<D, V> notifyOnNetworkStatusChange={true} query={query} variables={wq.vars as any}>
          {args => {
            if (wq.queryRef && Object.prototype.hasOwnProperty('current')) {
              (wq.queryRef as any).current = args;
            }
            return <Component {...others as any} queryResult={args} />;
          }}
        </Query>
      );
    };
  };
}
