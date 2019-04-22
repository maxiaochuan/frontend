import { IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React, { useReducer } from 'react';
import { Mutation, OperationVariables, QueryResult } from 'react-apollo';

export type IMutationProps<D, V> = QueryResult<D, V> & {
  gqlRef?: any;
  action?: (variables: V) => void;
  onVariablesChange: (variables: V) => V;
};

export default function attachMutation<D extends {} = any, V = OperationVariables>(
  mutation: DocumentNode,
) {
  return function target<P extends IMutationProps<D, V>>(
    component: IReactComponent<P>,
  ): IReactComponent<Omit<P, keyof QueryResult<D, V>>> {
    const Comp = component;
    return props => {
      const [variables, dispatch] = useReducer(
        (prev, action) => {
          return {
            ...prev,
            ...action,
          };
        },
        {} as any,
      );

      return (
        <Mutation<D, V> mutation={mutation} variables={variables}>
          {(action, args) => {
            if (props.gqlRef) {
              props.gqlRef.current = args;
            }
            return (
              <Comp {...props as any} {...args} onVariablesChange={dispatch} action={action} />
            );
          }}
        </Mutation>
      );
    };
  };
}
