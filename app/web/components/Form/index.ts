import Form from './Form';
import Item from './Item';

const Exported: typeof Form & { Item: typeof Item } = Form as any;
Exported.Item = Item;

export default Exported;
