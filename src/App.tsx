import React from 'react';
import './App.css';
import { client } from './graphql';
import Home from './components/Home';
import { ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
    const gqlClient = client;
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home/>,
        },
    ]);
    return (
        <ApolloProvider client={gqlClient}>
            <RouterProvider router={router}/>
        </ApolloProvider>
    );
}

export default App;
