import { Omit } from '@mxcins/types';
import { Checkbox, Col, Collapse } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { SFC } from 'react';

import { Context } from '../context';

export interface ISelectorProps {
  selected: string[];
  options: string[];
  onChange: (values: CheckboxValueType[]) => void;
}

const Selector: SFC<ISelectorProps> = props => {
  return (
    <Col>
      <Collapse bordered={false}>
        <Collapse.Panel key="selection" header={'header'}>
          <Checkbox.Group
            options={props.options}
            value={props.selected}
            onChange={props.onChange}
          />
        </Collapse.Panel>
      </Collapse>
    </Col>
  );
};

export default (props: Omit<ISelectorProps, 'selected' | 'options' | 'onChange'>) => (
  <Context.Consumer>
    {v => {
      const onChange = (payload: any[]) => v.dispatch({ type: 'COLUMNS_CURRENT', payload });
      return (
        <Selector
          {...props}
          selected={v.state.columns.current}
          options={v.state.columns.total}
          onChange={onChange}
        />
      );
    }}
  </Context.Consumer>
);
