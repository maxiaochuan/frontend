import { IRouteComponentProps } from '@mxcins/types';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React, { SFC } from 'react';
import { ApolloProvider } from 'react-apollo';

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
