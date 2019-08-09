import { default as Form } from './Form';
import Item from './Item';

const Exported: typeof Form & { Item: typeof Item } = Form as any;
Exported.Item = Item;
export * from './Form';
export default Exported;
