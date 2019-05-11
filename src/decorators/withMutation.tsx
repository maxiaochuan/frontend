import { IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React from 'react';
import { Mutation, OperationVariables, QueryResult } from 'react-apollo';

export type IMutationProps<D, V> = QueryResult<D, V> & {
  gqlRef?: any;
  action?: (variables: V) => void;
  onVariablesChange: (variables: V) => V;
};

export interface IWithMutationResultProps<D = any, V extends OperationVariables = any> {
  mutationResult: QueryResult<D, V>;
}

export interface IWithMutationRequiredProps<V extends OperationVariables = any> {
  withMutation: {
    mutation: DocumentNode;
    mutationRef?: any;
    vars?: V;
  };
}

export default function withMutation<
  P extends IWithMutationResultProps = IWithMutationResultProps & {},
  D = any,
  V extends OperationVariables = {}
>(
  target: IReactComponent<P>,
): IReactComponent<Omit<P, keyof IWithMutationResultProps> & IWithMutationRequiredProps> {
  const Component = target;
  return props => {
    const {
      withMutation: { mutation, mutationRef, vars },
    } = props;
    return (
      <Mutation<D, V> mutation={mutation} variables={vars}>
        {(action, args) => {
          if (mutationRef) {
            mutationRef.current = args;
          }
          return <Component {...props as any} {...args} action={action} />;
        }}
      </Mutation>
    );
  };
}
