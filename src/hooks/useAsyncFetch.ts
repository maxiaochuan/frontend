import { IRequestOptions, request } from '@/common';
import useAsync from './useAsync';
import useAsyncRun, { IUseAsyncRunOpts } from './useAsyncRun';

const useAsyncFetch = (uri: string, opts?: IRequestOptions) => {
  const asyncResult = useAsync(
    async controller =>
      request(uri, {
        ...opts,
        signal: controller.signal,
      }),
    [uri, opts && opts.params],
  );

  return asyncResult;
};

export interface IUseFetchOpts extends IRequestOptions, IUseAsyncRunOpts {}

export const useFetch = (uri: string, opts?: IUseFetchOpts) => {
  const asyncFetch = useAsyncFetch(uri, opts);
  useAsyncRun(asyncFetch, opts);

  return asyncFetch;
};

export default useAsyncFetch;
