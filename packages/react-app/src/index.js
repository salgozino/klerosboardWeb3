import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';



const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/salgozino/sarasa-mainnet',
  cache: new InMemoryCache()
});
  


ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
