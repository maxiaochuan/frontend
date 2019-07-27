import { useEffect } from 'react';
import { IUseAsyncState } from './useAsync';

export interface IUseAsyncRunOpts {
  skip?: boolean;
}

const DEFAULT_USE_ASYNC_OPTS: IUseAsyncRunOpts = {
  skip: false,
};

export const useAsyncRun = (
  state: IUseAsyncState,
  { skip }: IUseAsyncRunOpts = DEFAULT_USE_ASYNC_OPTS,
) => {
  const start = state && state.start;
  const abort = state && state.abort;
  useEffect(
    () => {
      if (start && !skip) {
        start();
      }
    },
    [start, skip],
  );
  useEffect(
    () => {
      const cleanup = () => {
        if (abort) {
          abort();
        }
      };
      return cleanup;
    },
    [abort],
  );
};

export default useAsyncRun;
