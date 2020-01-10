import { SFC } from 'react';

export interface IGetInitialProps {
  (props: { isServer: boolean; req: any; res: any; context: any; location: Location }):
    | Promise<any>
    | any;
}

export interface ISSRSFC<T extends {} = {}> extends SFC<T> {
  getInitialProps: IGetInitialProps;
}
