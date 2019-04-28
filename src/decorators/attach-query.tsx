import { IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React from 'react';
import { OperationVariables, Query, QueryResult } from 'react-apollo';

export interface IAttachQueryResultProps<D = any, V extends OperationVariables = any> {
  queryResult: QueryResult<D, V>;
}

// type Ab = IntrinsicAttributes
type Ab = Intrinis

export interface IAttachQueryRequiredProps<V extends OperationVariables = any> {
  query: DocumentNode;
  queryRef?: any;
  vars?: V;
}

export default function attachQuery<
  P extends IAttachQueryResultProps = IAttachQueryResultProps & {},
  D = any,
  V extends OperationVariables = {}
>(target: IReactComponent<P>): IReactComponent<Omit<P, keyof IAttachQueryResultProps> & IAttachQueryRequiredProps> {
  const Component = target;
  return props => {
    const { query, vars, queryRef, ...others } = props;
    return (
      <Query<D, V>
        notifyOnNetworkStatusChange={true}
        query={query}
        variables={vars}
      >
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
