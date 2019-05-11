import { IObjectType, IReactComponent, Omit } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import React, { MutableRefObject, SFC } from 'react';
import { OperationVariables } from 'react-apollo';
import { QueryHookOptions, QueryHookResult, useQuery } from 'react-apollo-hooks';
import { withRouter } from 'react-router';

export interface IWithQueryResultProps<TD = any, TV extends OperationVariables = IObjectType> {
  queryResult: QueryHookResult<TD, TV>;
}

export interface IWithQueryRequiredProps<TD = any, TV extends OperationVariables = IObjectType> {
  withQuery?: {
    queryRef?: MutableRefObject<QueryHookResult<TD, TV> | null | undefined>;
  } & QueryHookOptions<TV, object>;
}

export default function withQuery<
  INIT extends IObjectType = IObjectType,
  TD = any,
  TV extends OperationVariables = IObjectType
>(document: DocumentNode, init?: INIT) {
  return function target<P extends IWithQueryResultProps<TD, TV> & INIT>(
    component: IReactComponent<P>,
  ): IReactComponent<
    Omit<P, keyof IWithQueryResultProps<TD, TV> | keyof INIT> &
      Partial<INIT> &
      IWithQueryRequiredProps<TD, TV>
  > {
    const Target = component;
    const Base: SFC<any> = props => {
      const { withQuery: wq = {}, match, ...others } = props;
      const variables = { ...match.params, ...wq.variables };
      const queryResult = useQuery(document, {
        notifyOnNetworkStatusChange: true,
        ...wq,
        variables,
      });
      return <Target {...init} {...others} queryResult={queryResult} />;
    };

    return withRouter(Base);
  };
}
