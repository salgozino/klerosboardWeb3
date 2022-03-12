import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Courts from "./pages/Courts"
import Disputes from "./pages/Disputes"
import Dispute from "./pages/Dispute"
import Court from "./pages/Court";
import Odds from "./pages/Odds";
import Support from "./pages/Support";
import Community from "./pages/Community";
import Stakes from "./pages/Stakes";
import Arbitrables from "./pages/Arbitrables";
import Profile from "./pages/Profile";
import Arbitrable from "./pages/Arbitrable";


const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/salgozino/sarasa-mainnet',
  cache: new InMemoryCache()
});
  


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/courts" element={<Courts />} />
          <Route path="/courts/:id" element={<Court />} />
          <Route path="/cases" element={<Disputes />} />
          <Route path="/cases/:id" element={<Dispute />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/arbitrables" element={<Arbitrables />} />
          <Route path="/arbitrables/:id" element={<Arbitrable />} />
          <Route path="/stakes" element={<Stakes />} />
          <Route path="/odds" element={<Odds />} />
          <Route path="/community" element={<Community />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Routes>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
