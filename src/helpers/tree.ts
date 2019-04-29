import { IObjectType } from '@mxcins/types';

// tslint:disable:max-classes-per-file
export class TreeNode<T extends IObjectType> {
  public node?: TreeNode<T> & T;
  public children?: Array<TreeNode<T> & T>;

  constructor(item: T) {
    Object.keys(item).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        get() {
          return item[key];
        },
      });
    });
  }

  public addChild(node: TreeNode<T> & T) {
    node.node = this as any;
    this.children = this.children || [];
    this.children.push(node);
  }

  public getParents(): Array<TreeNode<T> & T> {
    if (this.node) {
      return [this.node, ...this.node.getParents()];
    }
    return [];
  }

  public POT(): Array<TreeNode<T> & T> {
    const nodes: Array<TreeNode<T> & T> = this.children
      ? this.children.map(n => n.POT()).flat()
      : [];
    const node = (this as unknown) as TreeNode<T> & T;
    return [node].concat(nodes);
  }
}

export interface ITreeHelperOpts {
  uniqueProperty?: string;
  parentProperty?: string;
}

const DEFAULT_OPTS: Required<ITreeHelperOpts> = {
  uniqueProperty: 'id',
  parentProperty: 'parent',
};

export default class TreeHelper<T extends IObjectType> {
  public nodes: IObjectType<TreeNode<T> & T> = {};
  public roots: Array<TreeNode<T> & T> = [];
  private opts: Required<ITreeHelperOpts> = DEFAULT_OPTS;

  constructor(data: T[], opts: ITreeHelperOpts = {}) {
    this.opts = { ...this.opts, ...opts };
    data.forEach(item => {
      const node = new TreeNode(item) as TreeNode<T> & T;
      if (!node[this.opts.parentProperty]) {
        this.roots.push(node);
      }
      const unique = node[this.opts.uniqueProperty] as string;
      this.nodes[unique] = node;
    });

    Object.values(this.nodes).forEach(node => {
      if (node[this.opts.parentProperty]) {
        const parent = this.nodes[node[this.opts.parentProperty][this.opts.uniqueProperty]];
        parent.addChild(node);
      }
    });
  }
  public getParentIDs(ids: string[]) {
    const init: IObjectType<true> = {};
    const ret = ids.reduce((prev, id) => {
      const node = this.nodes[id];
      if (node) {
        const parents = this.nodes[id].getParents();
        parents.forEach(parent => {
          prev[parent.id] = true;
        });
      }
      return prev;
    }, init);
    return Object.keys(ret);
  }

  public POT(): Array<TreeNode<T> & T> {
    const root = this.roots[0];
    return root.POT() as Array<TreeNode<T> & T>;
  }
}
