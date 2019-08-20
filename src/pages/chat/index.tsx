import React, { SFC, useEffect } from 'react';
import io from 'socket.io-client';
import router from 'umi/router';

const Chat: SFC = () => {
  useEffect(() => {
    const socket = io.connect('/socket/chat');
    socket.on('connect', () => {
      socket.emit('chat message', 'abc');
    });
    socket.on('error', (error: string) => {
      if (error === 'Authorization Error') {
        router.push('/login');
      }
    });
  }, []);

  return <div>chart</div>;
};

export default Chat;
