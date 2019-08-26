import { tuple } from '@mxcins/types';
import React, { createContext, Reducer, SFC, useEffect, useReducer } from 'react';
import io from 'socket.io-client';

const TYPES = tuple('INIT');
type T = (typeof TYPES)[number];

interface S {
  socket: SocketIOClient.Socket;
  messages: string[];
}

interface A<R extends T = T> {
  type: R;
  payload: R extends 'INIT' ? undefined : never;
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
  const [state, dispatch] = useReducer(reducer, {
    socket: io('/chat', { autoConnect: false }),
    messages: [],
  });

  /**
   * Initialization
   */
  useEffect(() => {
    if (!state.socket.connected) {
      state.socket.open();
    }
    return () => {
      state.socket.close();
    };
  }, []);

  console.log(state.socket);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <section>
        {`${state.messages}`}
        {`${state.socket.connected}`}
      </section>
    </Context.Provider>
  );
};

export default Chat;
