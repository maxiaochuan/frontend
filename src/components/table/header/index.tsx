import { Button, Col, Row } from 'antd';
import React, { SFC } from 'react';

import styles from '../style.less';
import Search from './search';
import Selector from './selector';

export interface ITableHeaderProps {
  percent: [number, number];
  columns: string[];
  totalColumns: string[];
  searchWords: string[];
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

const Header: SFC<ITableHeaderProps> = props => {
  const { percent } = props;

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
          <Percent current={percent[0]} total={percent[1]} />
          <Download onDownload={props.onDownload} />
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
