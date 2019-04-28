import { IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React from 'react';
import { OperationVariables, Query, QueryResult } from 'react-apollo';

export interface IWithQueryResultProps<D = any, V extends OperationVariables = any> {
  queryResult: QueryResult<D, V>;
}

export interface IWithQueryRequiredProps<V extends OperationVariables = any> {
  withQuery: {
    query: DocumentNode;
    queryRef?: any;
    vars?: V;
  };
}

export default function withQuery<
  P extends IWithQueryResultProps = IWithQueryResultProps & {},
  D = any,
  V extends OperationVariables = {}
>(
  target: IReactComponent<P>,
): IReactComponent<Omit<P, keyof IWithQueryResultProps> & IWithQueryRequiredProps> {
  const Component = target;
  return props => {
    const {
      withQuery: { query, vars, queryRef },
      ...others
    } = props;
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
}
