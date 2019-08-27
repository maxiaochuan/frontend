/**
 * Routes:
 *   - ./src/routes/cookie.tsx
 */
import React, { createContext, Reducer, SFC, useEffect, useReducer, useRef } from 'react';
import { tuple } from '@mxcins/types';
import io from 'socket.io-client';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

const TYPES = tuple('MOUNT', 'UNMOUNT', 'CONNECTED');
type T = (typeof TYPES)[number];

interface S {
  connected: boolean;
  messages: string[];
}

interface A<R extends T = T> {
  type: R;
  payload?: R extends 'CONNECTED' ? boolean : never;
}

const reducer: Reducer<S, A> = (prev, action) => {
  switch (action.type) {
    case 'CONNECTED': {
      return {
        ...prev,
        connected: action.payload as boolean,
      }
    }
    default:
      return prev;
  }
};

const Context = createContext({});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IChatProps {
  // TODO;
}

const Chat: SFC<IChatProps> = () => {
  const whoami = useRef(jwt.decode((Cookie.get('Authorization') || '').replace('Bearer+', '')));
  const socket = useRef(io('/chat', { autoConnect: false }));
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    connected: false,
  });

  /**
   * Initialization
   */
  useEffect(() => {
    socket.current.on('error', (error: string) => {
      console.log(error, typeof error);
    })
    socket.current.on('connect', () => dispatch({ type: 'CONNECTED', payload: true }))
    socket.current.open();
    socket.current.on('chat message', (...args) => { console.log('args', args) })

    return () => { socket.current.close() }
  }, []);

  console.log('whoami', whoami.current);

  return (
    <Context.Provider value={{ state, dispatch, socket }}>
      <section>{JSON.stringify(whoami.current)}</section>
      <section>
        {`${state.messages}`}
        {`${state.connected}`}
      </section>
    </Context.Provider>
  );
};

export default Chat;
