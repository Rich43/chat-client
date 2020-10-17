import React from 'react';
import './App.css';
import ApolloProvider from 'react-apollo/ApolloProvider';
import {ApolloProvider as ApolloHooksProvider} from '@apollo/react-hooks';
import {client} from "./graphql";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";

function App() {
    const gqlClient = client;
    return (
        <ApolloProvider client={gqlClient}>
            <ApolloHooksProvider client={gqlClient}>
                <BrowserRouter basename="/app">
                    <Switch>
                        <Route path={'/'} component={Home}/>
                    </Switch>
                </BrowserRouter>
            </ApolloHooksProvider>
        </ApolloProvider>
    );
}

export default App;
