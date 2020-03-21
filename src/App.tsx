import React from 'react';
import './App.css';
import ApolloProvider from 'react-apollo/ApolloProvider';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { client } from "./graphql";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./components/Home";
import { Navigation } from "./components/nav/Navigation";
import { KeycloakProvider } from '@react-keycloak/web'
import keycloak from "./keycloak";

export const HOME = '/';

function App() {
    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <KeycloakProvider keycloak={keycloak}>
                    <BrowserRouter>
                        <Navigation/>
                        <Route path={HOME} component={Home}/>
                    </BrowserRouter>
                </KeycloakProvider>
            </ApolloHooksProvider>
        </ApolloProvider>
    );
}

export default App;
