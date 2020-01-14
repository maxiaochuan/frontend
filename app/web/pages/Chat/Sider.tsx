import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styles from './style.less';

export interface ISiderProps {
  user: { name: string };
}

const Sider: SFC<ISiderProps> = ({ user }) => (
  <div className={styles.Sider}>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>{user.name}</div>
    Sider
  </div>
);

export default observer(Sider);
