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
      {
        path: '/account',
        component: '../layouts/AccountLayout',
        routes: [
          {
            path: '/account/join',
            component: './Account/SignUp',
          },
        ],
      },
    ],
  },
];

export default routes;
