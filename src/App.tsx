import React from 'react';
import './App.css';
import { client } from './graphql';
import Home from './components/Home';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
    const gqlClient = client;
    return (
        <ApolloProvider client={gqlClient}>
            <BrowserRouter basename="/app">
                <Route path="/">
                    <Home />
                </Route>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
