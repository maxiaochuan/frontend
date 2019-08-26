import React, { createContext, Reducer, SFC, useEffect, useReducer, useRef } from 'react';
import { tuple } from '@mxcins/types';
import io from 'socket.io-client';

const TYPES = tuple('MOUNT', 'UNMOUNT');
type T = (typeof TYPES)[number];

interface S {
  messages: string[];
}

interface A<R extends T = T> {
  type: R;
  payload?: R extends 'MOUNT' ? undefined : never;
}

const reducer: Reducer<S, A> = (prev, action) => {
  switch (action.type) {
    default:
      return prev;
  }
};

const Context = createContext({});

export interface IChatProps {
  one?: any;
}

const Chat: SFC<IChatProps> = () => {
  const socket = useRef(io('/chat', { autoConnect: false }));
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
  });

  /**
   * Initialization
   */
  useEffect(() => {
    socket.current.on('error', (error: string) => {
      console.log(error);
    })
    socket.current.open();

    return () => { socket.current.close() }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch, socket }}>
      <section>
        {`${state.messages}`}
        {`${socket.current.connected}`}
      </section>
    </Context.Provider>
  );
};

export default Chat;
