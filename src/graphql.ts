import {OperationDefinitionNode} from "graphql";
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
    uri: `ws${window.location.protocol.toLowerCase().startsWith('https') ? 's' : ''}://${window.location.host}/subscriptions`,
    options: {
        reconnect: true
    }
});
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
