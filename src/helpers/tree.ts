// tslint:disable:max-classes-per-file
export class TreeNode<T extends { [x: string]: unknown }> {
  public pid?: string | number;
  public parent?: TreeNode<T>;
  public children?: Array<TreeNode<T>>;

  constructor(item: T, opts: Required<ITreeOpts>) {
    const parent = item[opts.parentProperty];
    this.pid =
      parent && (parent as any)[opts.uniqueProperty]
        ? (item[opts.parentProperty] as any)[opts.uniqueProperty]
        : null;
    Object.keys(item).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        get() {
          return item[key];
        },
      });
    });
  }

  public addChild(node: TreeNode<T>) {
    node.parent = this;
    this.children = this.children || [];
    this.children.push(node);
  }

  public getParents(): Array<TreeNode<T>> {
    if (this.parent) {
      return [this.parent, ...this.parent.getParents()];
    }
    return [];
  }
}

export interface ITreeOpts {
  uniqueProperty?: string;
  parentProperty?: string;
}

const DEFAULT_OPTS: Required<ITreeOpts> = {
  uniqueProperty: 'id',
  parentProperty: 'parent',
};

export default class Tree<T extends { [x: string]: unknown }> {
  public nodes: { [x: string]: TreeNode<T> & T } = {};
  public roots: Array<TreeNode<T> & T> = [];
  private opts: Required<ITreeOpts> = DEFAULT_OPTS;

  constructor(data: T[], opts: ITreeOpts = {}) {
    this.opts = { ...this.opts, ...opts };
    data.forEach(item => {
      const node = new TreeNode(item, this.opts) as TreeNode<T> & T;
      if (node.pid === null) {
        this.roots.push(node);
      }
      const unique = node[this.opts.uniqueProperty] as string;
      this.nodes[unique] = node;
    });

    Object.values(this.nodes).forEach(node => {
      if (node.pid) {
        const parent = this.nodes[node.pid];
        if (parent) {
          parent.addChild(node);
        }
      }
    });
  }
  public getParentIDs(ids: string[]) {
    const init: { [x: string]: any } = {};
    const ret = ids.reduce((prev, id) => {
      const node = this.nodes[id];
      if (node) {
        const parents = this.nodes[id].getParents() as Array<TreeNode<T> & T>;
        parents.forEach(parent => {
          prev[parent.id as string] = true;
        });
      }
      return prev;
    }, init);
    return Object.keys(ret);
  }
}
