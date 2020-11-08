import ApolloClient from "apollo-client";
import {WebSocketLink} from "apollo-link-ws";
import {HttpLink} from "apollo-link-http";
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import {InMemoryCache} from "apollo-cache-inmemory";
import {OperationDefinitionNode} from "graphql";

const wsLink = new WebSocketLink({
    uri: `ws://${window.location.host}/subscriptions`,
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
)

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});
