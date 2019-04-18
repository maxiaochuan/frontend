import { Checkbox, Col, Collapse } from 'antd';
import React, { SFC, useEffect, useRef, useState } from 'react';

export interface ISelectorProps {
  columns?: string[];
  totalColumns?: string[];
  onColumnsChange?: (columns: string[]) => void;
}

const Selector: SFC<ISelectorProps> = props => {
  const [options, setOptions] = useState([] as Array<{ value: string; label: string }>);

  const handlers = useRef({
    onChange: (values: Array<string | number | boolean>) => {
      if (props.onColumnsChange) {
        props.onColumnsChange(values as string[]);
      }
    },
  });
  useEffect(() => {
    if (props.totalColumns) {
      setOptions(props.totalColumns.map(c => ({ value: c, label: c.toUpperCase() })));
    }
  }, [props.totalColumns]);
  return (
    <Col>
      <Collapse bordered={false}>
        <Collapse.Panel key="selection" header={'header'}>
          <Checkbox.Group
            options={options}
            value={props.columns}
            onChange={handlers.current.onChange}
          />
        </Collapse.Panel>
      </Collapse>
    </Col>
  );
};

Selector.defaultProps = {
  columns: [],
};

export default Selector;
