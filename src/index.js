import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";


const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/salgozino/sarasa',

  cache: new InMemoryCache()
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
