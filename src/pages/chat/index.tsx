/**
 * Routes:
 *   - ./src/routes/authenticate.tsx
 */
import React, {
  createContext,
  Reducer,
  SFC,
  useReducer,
  useRef,
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
} from 'react';
import { tuple } from '@mxcins/types';
import io from 'socket.io-client';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { Descriptions, Input, Button, Badge, List, Avatar } from 'antd';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { GQLUser } from '@/graphql/generated';

export const MESSAGE_TYPE = tuple('SEND', 'RECEIVE');
export const MESSAGE_STATUS = tuple('SENDING', 'DONE');

interface Message {
  type: (typeof MESSAGE_TYPE)[number];
  status: (typeof MESSAGE_STATUS)[number];
  user: GQLUser;
  content: string;
  datetime: string;
}

const TYPES = tuple('CONNECTED', 'WRITE_MESSAGE', 'SEND_MESSAGE', 'RECEIVE_MESSAGE');
type T = (typeof TYPES)[number];

interface S {
  input: string;
  connected: boolean;
  messages: Message[];
  whoami: GQLUser;
  socket: SocketIOClient.Socket;
}

interface A<R extends T = T> {
  type: R;
  payload?: R extends 'CONNECTED'
    ? boolean
    : R extends 'WRITE_MESSAGE'
    ? string
    : R extends 'RECEIVE_MESSAGE'
    ? Message
    : never;
}

const reducer: Reducer<S, A> = (prev, action) => {
  switch (action.type) {
    case 'CONNECTED': {
      return {
        ...prev,
        connected: action.payload as boolean,
      };
    }
    case 'WRITE_MESSAGE': {
      return { ...prev, input: action.payload as string };
    }
    case 'RECEIVE_MESSAGE': {
      return {
        ...prev,
        messages: [...prev.messages, action.payload as Message],
      };
    }
    case 'SEND_MESSAGE': {
      const message: Message = {
        user: prev.whoami,
        content: prev.input,
        type: 'SEND',
        status: 'DONE',
        datetime: moment().format('HH:mm:ss'),
      };
      prev.socket.emit('chat message', message);
      return {
        ...prev,
        input: '',
        messages: [...prev.messages, message],
      };
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

const getWhoami = () => {
  const token = (Cookie.get('Authorization') || '').replace('Bearer+', '');
  const decoded = jwt.decode(token);
  if (!decoded || typeof decoded === 'string' || !decoded.user) {
    throw new Error('Whoami Error');
  }
  return decoded.user;
};

const Chat: SFC<IChatProps> = () => {
  const bar = useRef<Scrollbars>(null);
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    connected: false,
    input: '',
    whoami: getWhoami(),
    socket: io('/chat', { autoConnect: false }),
  });

  const onSubmit = () => {
    dispatch({ type: 'SEND_MESSAGE' });
  };

  const onTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = e =>
    dispatch({ type: 'WRITE_MESSAGE', payload: e.currentTarget.value });

  const onTextAreaKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      onSubmit();
    }
  };

  /**
   * Initialization
   */
  useEffect(() => {
    state.socket.on('error', (error: string) => {
      // eslint-disable-next-line no-console
      console.log(error, typeof error);
    });
    state.socket.on('connect', () => dispatch({ type: 'CONNECTED', payload: true }));
    state.socket.open();
    state.socket.on('chat message', (msg: Message) => {
      if (msg.user.id !== state.whoami.id) {
        dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
      }
    });

    return () => {
      state.socket.close();
    };
  }, []);

  useEffect(() => {
    if (bar.current) {
      bar.current.scrollToBottom();
    }
  }, [state.messages.length]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div style={{ padding: 12 }}>
        <section style={{ marginBottom: 12 }}>
          <Descriptions title="Whoami" size="small" layout="vertical" bordered>
            <Descriptions.Item label="Name">{state.whoami.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{state.whoami.email}</Descriptions.Item>
            <Descriptions.Item label="Status">
              {state.connected ? (
                <Badge status="success" text="Connected" />
              ) : (
                <Badge status="default" text="Disconnected" />
              )}
            </Descriptions.Item>
          </Descriptions>
        </section>
        <section style={{ marginBottom: 12 }}>
          <Scrollbars ref={bar} style={{ height: 500 }}>
            <List
              locale={{ emptyText: true }}
              dataSource={state.messages}
              renderItem={item => (
                <List.Item extra={item.datetime} style={{ padding: 12 }}>
                  <List.Item.Meta
                    avatar={<Avatar />}
                    title={item.user.name}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          </Scrollbars>
        </section>
        <section style={{ marginBottom: 12 }}>
          <Input.TextArea
            rows={5}
            value={state.input}
            onKeyPress={onTextAreaKeyPress}
            onChange={onTextAreaChange}
          />
          <div style={{ float: 'right' }}>
            <Button htmlType="submit" onClick={onSubmit}>
              Send
            </Button>
          </div>
        </section>
      </div>
    </Context.Provider>
  );
};

export default Chat;
