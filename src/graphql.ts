import { OperationDefinitionNode } from "graphql";
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

let wsUri = `ws${window.location.protocol.toLowerCase().startsWith('https') ? 's' : ''}://${window.location.host}/graphql`;

if (window.location.host === 'localhost:3000') {
    wsUri = 'ws://localhost:4000/graphql';
    console.log('Using localhost:4000');
}

const wsLink = new GraphQLWsLink(createClient({
    url: wsUri,
}));
const httpLink = new HttpLink({
    uri: '/graphql',
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});
