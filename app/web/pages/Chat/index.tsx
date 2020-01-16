import React, { SFC, useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import io, { Socket } from 'socket.io-client';
import { List } from 'antd';
import Content, { MessageList, EnterMessage } from './Content';
import { MainStore } from '@/stores';
import { reducer, IMSG } from './context';
import styles from './style.less';

const render = (user: { name: string; phone: string }) => (
  <List.Item>
    <List.Item.Meta title={user.name} />
  </List.Item>
);

const Online: SFC<{ users: { name: string; phone: string }[] }> = props => (
  <List className={styles.Online} bordered dataSource={props.users} renderItem={render} />
);

interface IOnlineMsg {
  users: { name: string; phone: string }[];
  message: string;
  action: string;
}

const ChatCanvas: SFC<{ socket: typeof Socket; user: any }> = () => {
  const [state, dispatch] = useReducer(reducer, {
    connected: false,
    socket: io('/chat', { autoConnect: false }),
    users: [],
    messages: [],
  });

  useEffect(() => {
    state.socket.removeAllListeners();
    state.socket.on('connect', () => dispatch({ type: 'CONNECTED', payload: true }));
    state.socket.on('disconnect', () => dispatch({ type: 'CONNECTED', payload: false }));
    state.socket.on('online', (msg: IOnlineMsg) =>
      dispatch({ type: 'ONLINE', payload: msg.users }),
    );
    state.socket.on('exchange', (msg: IMSG) => dispatch({ type: 'EXCHANGE', payload: msg }));

    if (!state.socket.connected) {
      state.socket.open();
    }

    return () => {
      state.socket.disconnect();
    };
  }, []);

  const send = (txt: string) =>
    state.socket.emit('exchange', {
      txt,
      time: new Date().getTime(),
    });

  return (
    <div className={styles.Wrapper}>
      <div>status: {JSON.stringify(state.connected)}</div>
      <div className={styles.Container}>
        <Online users={state.users} />
        <Content>
          <MessageList messages={state.messages} />
          <EnterMessage send={send} />
        </Content>
      </div>
      <div>Chat</div>
    </div>
  );
};

const Chat: SFC<{ main: MainStore }> = props => {
  const { main } = props;

  if (!main.current) {
    return <Redirect to="/accounts/login" />;
  }

  return <ChatCanvas socket={main.socket} user={main.current} />;
};

export default inject('main')(Chat);
