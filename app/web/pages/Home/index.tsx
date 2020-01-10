import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

const Home: SFC = () => (
  <div>
    Home
    <Link to="/chat">Chat</Link>
  </div>
);

export default Home;
