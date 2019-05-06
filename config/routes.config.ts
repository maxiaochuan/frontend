import { IRoute } from '@mxcins/types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/test/users/:id',
        component: './test/table',
      },
    ],
  },
];

export default routes;
