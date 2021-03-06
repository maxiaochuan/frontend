import React, { Component } from 'react';
import io from 'socket.io-client';
import router from 'umi/router';
import { Button, Input } from '@/components';

export default class Chat extends Component<
  any,
  { connected: boolean; messages: string[]; input: string }
> {
  public socket: any;

  constructor(props: any) {
    super(props);
    this.state = {
      connected: false,
      messages: [],
      input: '',
    };
  }

  public componentDidMount() {
    const socket = io.connect('/socket/chat');
    socket.on('connect', () => this.setState({ connected: true }));
    socket.on('error', (error: string) => {
      if (error === 'Authorization Error') {
        router.push('/login');
      }
    });
    socket.on('chat message', (msg: string) =>
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ messages: [...this.state.messages, msg] }),
    );
    this.socket = socket;
  }

  public onChange = (e: any) => this.setState({ input: e.target.value });

  public send = () => {
    if (this.socket && this.state.connected) {
      this.socket.emit('chat message', this.state.input);
      this.setState({ input: '' });
    }
  };

  public render() {
    const { connected, messages, input } = this.state;
    return (
      <div>
        <h2>Chat</h2>
        <div>
          <span>status: </span>
          <span>{connected ? 'connected' : 'false'}</span>
        </div>
        <div>
          <ul>
            {messages.map((m, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${i}`}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <Input value={input} onChange={this.onChange} />
        </div>
        <div>
          <Button onClick={this.send}>Send</Button>
        </div>
      </div>
    );
  }
}
