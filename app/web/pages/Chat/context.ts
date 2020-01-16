import { Socket } from 'socket.io-client';
import { Reducer } from 'react';
import { tuple } from '@mxcins/types';

export interface IUser {
  name: string;
  phone: string;
}

export interface IMSG {
  from: IUser;
  txt: string;
  time: number;
}

export interface ISTATE {
  connected: boolean;
  socket: typeof Socket;
  users: IUser[];
  messages: IMSG[];
}

export const ACTION_TYPES = tuple('CONNECTED', 'ONLINE', 'EXCHANGE');
export type ActionType = typeof ACTION_TYPES[number];

export interface IACTION<R extends ActionType = ActionType> {
  type: R;
  payload: R extends 'CONNECTED' // ? IDataUpdatedPayload
    ? boolean
    : R extends 'ONLINE'
    ? IUser[]
    : R extends 'EXCHANGE'
    ? IMSG
    : never;
}

export const reducer: Reducer<ISTATE, IACTION> = (prev, action) => {
  console.log('dispatch', action);
  switch (action.type) {
    case 'CONNECTED': {
      const connected = action.payload as boolean;
      return { ...prev, connected };
    }
    case 'ONLINE': {
      const users = action.payload as IUser[];
      return { ...prev, users };
    }
    case 'EXCHANGE': {
      const message = action.payload as IMSG;
      return { ...prev, messages: [...prev.messages, message] };
    }
    default:
      return prev;
  }
};
