import { OperationDefinitionNode } from "graphql";
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const wsLink = new GraphQLWsLink(createClient({
    url: `ws${window.location.protocol.toLowerCase().startsWith('https') ? 's' : ''}://${window.location.host}/graphql`,
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
