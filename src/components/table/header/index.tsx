import { Button, Col, Row } from 'antd';
import React, { SFC } from 'react';

import styles from '../style.less';
import { ITPS, ITS } from '../table';
import Search from './search';
import Selector from './selector';

export interface ITHPS<T extends { [x: string]: any } = any> extends ITPS<T>, ITS<T> {
  onColumnsChange: (columns: string[]) => void;
  onSearch: (inputs: string[]) => void;
  onDownload: () => void;
}

const Percent: SFC<any> = props => (
  <Col>
    <span>
      {props.current} / {props.total}
    </span>
  </Col>
);

const Download: SFC<any> = props => (
  <Col>
    <Button type="primary" onClick={props.onDownload}>
      Download
    </Button>
  </Col>
);

const Header: SFC<ITHPS> = props => {
  const { dataSource = [], data = [] } = props;

  return (
    <Row className={styles.header}>
      <Selector
        columns={props.columns}
        totalColumns={props.totalColumns}
        onColumnsChange={props.onColumnsChange}
      />
      <Col span={24} className={styles.row}>
        <Row type="flex" gutter={12}>
          <Search className={styles.search} onSearch={props.onSearch} />
          <Percent current={dataSource.length} total={data.length} />
          <Download onDownload={props.onDownload} />
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
