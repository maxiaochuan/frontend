import Base from './Table';

import Query from './stores/query';

export * from './interface';

const Table = Base as typeof Base & { Query: typeof Query };
Table.Query = Query;

export default Table;
