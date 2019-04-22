import { IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React from 'react';
import { OperationVariables, Query, QueryResult } from 'react-apollo';

export default function attachQuery<
  D extends {} = any,
  V extends OperationVariables = OperationVariables
>(query: DocumentNode, variables?: V) {
  return function target<P extends QueryResult<D, V> & { gqlRef?: any }>(
    component: IReactComponent<P>,
  ): IReactComponent<Omit<P, keyof QueryResult<D, V>>> {
    const Comp = component;
    return props => {
      return (
        <Query<D, V> notifyOnNetworkStatusChange={true} query={query} variables={variables as any}>
          {args => {
            if (props.gqlRef) {
              props.gqlRef.current = args;
            }
            return <Comp {...props as any} {...args} />;
          }}
        </Query>
      );
    };
  };
}
