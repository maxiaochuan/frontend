import React, { Fragment, SFC, useState, useLayoutEffect } from 'react';
import Redirect from 'umi/redirect';
import Cookie from 'js-cookie';
import { PageLoading } from '@/components';
import { request } from '@/utils';

const AuthenticateRoute: SFC = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (Cookie.get('Authorization')) {
      request.post('/authenticate.json').then(() => {
        setAuthorized(true);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  if (!authorized) {
    return <Redirect to="/login" />;
  }

  return <Fragment>{props.children}</Fragment>;
};

export default AuthenticateRoute;
