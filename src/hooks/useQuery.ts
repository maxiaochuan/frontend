import { DocumentNode } from 'graphql';
import { useEffect, useState } from 'react';
import { OperationVariables } from 'react-apollo';
import { QueryHookOptions, QueryHookResult, useQuery as useBasicQuery } from 'react-apollo-hooks';

export interface IUseQueryOpts<TD = any, TFD = any, TV = any, TC = any> extends QueryHookOptions<TV, TC> {
  formatter?: (data: TD) => TFD;
  init?: TFD;
}

const useQuery = <TData = any, TFormatted = any, TVariables = OperationVariables, TCache = object>(
  service: DocumentNode,
  options?: IUseQueryOpts<TData, TFormatted, TVariables, TCache>,
): QueryHookResult<TFormatted, TVariables> & { done: boolean } => {
  const [done, setDone] = useState(false);
  const [data, setData] = useState<TFormatted | undefined>(options && options.init);
  const queryResult = useBasicQuery(service, {
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  useEffect(
    () => {
      if (queryResult.networkStatus === 7 && queryResult.data) {
        const d =
          options && options.formatter ? options.formatter(queryResult.data) : queryResult.data;
        setData(d);
        setDone(true);
      }
    },
    [queryResult.networkStatus],
  );

  return { ...queryResult, done: done && !queryResult.loading, data };
};

export default useQuery;
