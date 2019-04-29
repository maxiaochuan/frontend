import { IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React from 'react';
import { OperationVariables, Query, QueryResult } from 'react-apollo';

export interface IWithQueryResultProps<D = any, V extends OperationVariables = any> {
  queryResult: QueryResult<D, V>;
}

export interface IWithQueryRequiredProps<V extends OperationVariables = any> {
  withQuery?: {
    queryRef?: any;
    vars?: V;
  };
}

export default function withQuery<
  P extends IWithQueryResultProps = IWithQueryResultProps & {},
  D = any,
  V extends OperationVariables = {}
>(query: DocumentNode) {
  return function target(
    component: IReactComponent<P>,
  ): IReactComponent<Omit<P, keyof IWithQueryResultProps> & IWithQueryRequiredProps> {
    const Component = component;
    return props => {
      const { withQuery: wq = {}, ...others } = props;
      const { vars, queryRef } = wq;

      return (
        <Query<D, V> notifyOnNetworkStatusChange={true} query={query} variables={vars}>
          {args => {
            if (queryRef) {
              queryRef.current = args;
            }
            return <Component {...others as any} queryResult={args} />;
          }}
        </Query>
      );
    };
  };
}
