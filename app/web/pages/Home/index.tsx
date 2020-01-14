import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { MainStore } from '@/stores';

const Home: SFC<{ main: MainStore }> = props => (
  <div>
    <h1>Home</h1>
    <div>{JSON.stringify(props.main.current)}</div>
    <Link to="/chat">Chat</Link>
  </div>
);

export default inject('main')(observer(Home));
