import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Listings } from './sections';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:9000/api'
});

render(
  <ApolloProvider client={client}>
    <Listings title="TinyHouse Listings" />,
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
