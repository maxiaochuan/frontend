import { Button, Col, Row } from 'antd';
import React, { SFC, useContext } from 'react';

import { Context } from '../context';
import styles from '../style.less';
import { download } from '../utils';
import Search from './Search';
import Selector from './Selector';

const Percent: SFC = () => {
  const {
    state: { cache, data },
  } = useContext(Context);
  return (
    <Col>
      <span>
        {data.length} / {cache.length}
      </span>
    </Col>
  );
};

const Download: SFC = () => {
  const { state } = useContext(Context);
  const handler = () => download(state.data);

  return (
    <Col>
      <Button type="primary" onClick={handler} disabled={!state.data.length}>
        Download
      </Button>
    </Col>
  );
};

const Header: SFC = () => {
  return (
    <Row className={styles.header}>
      <Selector />
      <Col span={24} className={styles.row}>
        <Row type="flex" gutter={12}>
          <Search className={styles.search} />
          <Percent />
          <Download />
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
