import React, { SFC, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import { Socket } from 'socket.io-client';
import { List } from 'antd';
import Sider from './Sider';
import { MainStore } from '@/stores';

const render = (user: { name: string; phone: string }) => (
  <List.Item>
    <List.Item.Meta title={user.name} />
  </List.Item>
);

const Online: SFC<{ users: { name: string; phone: string }[] }> = props => {
  console.log('props.users', props.users);
  return <List style={{ width: 200 }} bordered dataSource={props.users} renderItem={render} />;
};

interface IOnlineMsg {
  users: { name: string; phone: string }[];
  message: string;
  action: string;
}

const ChatCanvas: SFC<{ socket: typeof Socket; user: any }> = props => {
  const [users, setUsers] = useState<{ name: string; phone: string }[]>([]);
  const { socket, user } = props;

  useEffect(() => {
    socket.on('connect', () => {
      console.log('s connect', socket.id);
      console.log('s connect', socket);
    });

    socket.on('ONLINE', (msg: IOnlineMsg) => {
      setUsers(msg.users);
    });

    socket.open();
  }, []);

  return (
    <div>
      <Sider user={user} />
      <Online users={users} />
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
