import { IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React from 'react';
import { OperationVariables, Query, QueryResult } from 'react-apollo';

export default function attachQuery<
  P extends QueryResult<D, V> & { queryRef?: any } = any,
  D = any,
  V extends OperationVariables = any
>(query: DocumentNode, variables?: V) {
  return function target<PP extends P = P>(
    component: IReactComponent<PP>,
  ): IReactComponent<Omit<P, keyof QueryResult>> {
    const Comp = component;
    return props => {
      return (
        <Query<D, V> notifyOnNetworkStatusChange={true} query={query} variables={variables as any}>
          {args => {
            if (props.queryRef) {
              props.queryRef.current = args;
            }
            return <Comp {...props as any} {...args} />;
          }}
        </Query>
      );
    };
  };
}
