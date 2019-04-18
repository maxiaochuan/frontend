import { Col, Input } from 'antd';
import React, { SFC, useRef } from 'react';

export interface ISearchProps {
  className?: string;
  onSearch: (inputs: string[]) => void;
}

// 2019-04-11 15:24:24 考虑到 包含关系会影响显示结果，所以去掉了包含搜索
// const formatter = (input: string) => {
//   const inputs = [...new Set(input.split(' ').filter(Boolean))];
//   return inputs.filter(item => inputs.filter(one => one !== item).every(i => !item.includes(i)));
// }
const formatter = (input: string) => [...new Set(input.split(' ').filter(Boolean))];

const Search: SFC<ISearchProps> = props => {
  const handlers = useRef({
    onSearch: (input: string) => props.onSearch(formatter(input)),
  });

  return (
    <Col className={props.className}>
      <Input.Search placeholder="Search" onSearch={handlers.current.onSearch} />
    </Col>
  );
};

Search.defaultProps = {
  onSearch: () => undefined,
};

export default Search;
