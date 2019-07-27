import { Reducer, useEffect, useReducer } from 'react';

const INIT_STATE: IUseAsyncState = {
  started: false,
  loading: false,
  error: null,
  data: null,
  start: null,
  abort: null,
};

export interface IUseAsyncState {
  started: boolean;
  loading: boolean;
  error: Error | null;
  data: any | null;

  start: (() => Promise<any>) | null;
  abort: (() => void) | null;
}

type UseAsyncActionType = 'INIT' | 'READY' | 'START' | 'RESULT' | 'ERROR';

interface IUseAsyncAction<A extends UseAsyncActionType = UseAsyncActionType> {
  type: A;
  payload: A extends 'INIT'
    ? IUseAsyncState
    : A extends 'READY'
    ? { start: () => Promise<any>; abort: () => void }
    : A extends 'START'
    ? boolean
    : A extends 'RESULT'
    ? any
    : A extends 'ERROR'
    ? Error
    : never;
}

const reducer: Reducer<IUseAsyncState, IUseAsyncAction> = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return {
        ...state,
        ...(action.payload as IUseAsyncState),
      };
    }
    case 'READY': {
      return {
        ...state,
        ...(action.payload as { start: () => Promise<any>; abort: () => void }),
      };
    }
    case 'START': {
      if (state.started) {
        return state;
      } // to bail out just in case
      return {
        ...state,
        loading: true,
        started: action.payload as boolean,
      };
    }
    case 'RESULT': {
      return {
        ...state,
        loading: false,
        data: action.payload as any,
      };
    }
    case 'ERROR': {
      return {
        ...state,
        error: action.payload as Error,
      };
    }
    default: {
      return state;
    }
  }
};

type UseAsyncFunc = (abortController: AbortController) => Promise<any>;

const useAsync = (func: UseAsyncFunc, deps: any[] = []) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  useEffect(() => {
    let abortController: AbortController | null = null;
    const start = async () => {
      if (abortController) {
        return;
      }
      abortController = new AbortController();
      dispatch({ type: 'START', payload: true });
      try {
        const payload = await func(abortController);
        dispatch({ type: 'RESULT', payload });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error });
      }
    };

    const abort = () => {
      if (abortController) {
        abortController.abort();
      }
    };

    dispatch({ type: 'READY', payload: { start, abort } });

    const cleanup = () => {
      dispatch({ type: 'INIT', payload: INIT_STATE });
    };
    return cleanup;
  }, deps);

  return state;
};

export default useAsync;
