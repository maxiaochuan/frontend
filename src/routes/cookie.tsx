import React, { useRef, Fragment, SFC } from 'react';
import Redirect from 'umi/redirect';
import Cookie from 'js-cookie';

const CookieRoute: SFC = props => {
  const cookie = useRef(Cookie.get('Authorization'));
  return cookie.current ? <Fragment>{props.children}</Fragment> : <Redirect to="/login" />
}

export default CookieRoute;