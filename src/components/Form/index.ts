import Form from './Form';
import Item from './Item';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Exported: typeof Form & { Item: typeof Item } = Form as any;
Exported.Item = Item;
export default Exported;
