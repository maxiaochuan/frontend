import React from 'react';

import { IWithQueryResultProps, withQuery } from '@/decorators';
import { ITableCommonProps } from '../interface';
import Table from '../table';

const DEFAULT_DATA: any[] = [];

const Query = withQuery<ITableCommonProps & IWithQueryResultProps>()(props => {
  const { queryResult, ...others } = props;
  let data = DEFAULT_DATA;
  if (queryResult.data) {
    const keys = Object.keys(queryResult.data);
    if (keys[0]) {
      data = queryResult.data[keys[0]];
    }
  }
  return (
    <Table {...others} data={data} loading={queryResult.loading} refetch={queryResult.refetch} />
  );
});

// const Query: SFC<ITableCommonProps & { query: DocumentNode } & IWithQueryRequiredProps> = props => {
//   const { query, ...others } = props;
//   const Component = useRef(
//     withQuery<ITableCommonProps & IWithQueryResultProps>(props.query)(innerProps => {
//       const { queryResult, ...innerOthers } = innerProps;
//       let data = DEFAULT_DATA;
//       if (queryResult.data) {
//         const keys = Object.keys(queryResult.data);
//         if (keys[0]) {
//           data = queryResult.data[keys[0]];
//         }
//       }

//       return (
//         <Table
//           {...innerOthers}
//           data={data}
//           loading={queryResult.loading}
//           refetch={queryResult.refetch}
//         />
//       );
//     }),
//   );

//   return <Component.current {...others as any} />;
// };

export default Query;
