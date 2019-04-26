import { IObjectType, IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';

export type AttachQueryProps<D = any, V = any> = QueryResult<D, V> & {
  query: DocumentNode;
  queryRef?: any;
  vars?: V;
};

export default function attachQuery<
  P extends AttachQueryProps,
  D = any,
  V extends IObjectType = IObjectType
>(target: IReactComponent<P>): IReactComponent<Omit<P, keyof QueryResult>> {
  const Component = target;
  return props => {
    const { query, vars } = props;
    return (
      <Query<D, V> notifyOnNetworkStatusChange={true} query={query} variables={vars as any}>
        {args => {
          if (props.queryRef) {
            props.queryRef.current = args;
          }
          return <Component {...props as any} {...args} />;
        }}
      </Query>
    );
  };
}
