import { IRouteComponentProps } from '@mxcins/types';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-boost';
import { ServerError } from 'apollo-link-http-common';
import React, { SFC } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

const client = new ApolloClient({
  uri: '/api/graphql',
  onError: ({ networkError }) => {
    if (networkError) {
      if (networkError.name === 'ServerError') {
        const err = networkError as ServerError;
        if (err.response.status === 401) {
          alert('401');
        }
      }
    }
  }
});
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: '/api/graphql',
//   }),
//   cache: new InMemoryCache({
//     addTypename: false,
//   }),
// });

const Layout: SFC<IRouteComponentProps> = props => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        {props.children}
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default Layout;
