import { createContext, Reducer } from "react";
import { tuple } from "@mxcins/types";
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { GQLUser } from "@/graphql/generated";

export const MAIN_CONTEXT_ACTION_TYPES = tuple('CURRENT_USER');
type T = (typeof MAIN_CONTEXT_ACTION_TYPES)[number];

interface S {
  current?: GQLUser;
}

interface A<R extends T = T> {
  type: R;
  payload?: R extends 'CURRENT_USER' ? GQLUser : never;
}

const getUserFromCookie = () => {
  const decoded = jwt.decode((Cookie.get('Authorization') || '').replace('Bearer+', '')) as any;
  return decoded && decoded.user;
}

export const MAIN_CONTEXT_STATE_INIT = {
  current: getUserFromCookie(),
}

export const reducer: Reducer<S, A> = (prev, action) => {
  switch (action.type) {
    case 'CURRENT_USER': {
      return {
        ...prev,
        current: action.payload as GQLUser,
      }
    }
    default:
      return prev;
  }
};

export const MainContext = createContext({});

export const MainProvider = MainContext.Provider;