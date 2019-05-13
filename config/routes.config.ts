import { IRoute } from '@mxcins/types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      {
        path: '/users',
        component: './Users',
      },
    ],
  },
];

export default routes;
