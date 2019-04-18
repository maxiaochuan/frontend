import { IRouteComponentProps } from '@mxcins/types';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import React, { SFC } from 'react';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const Layout: SFC<IRouteComponentProps> = props => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default Layout;
