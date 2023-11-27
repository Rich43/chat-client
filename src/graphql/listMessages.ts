import gql from "graphql-tag";
import { useQuery } from '@apollo/client';
import { ListMessagesQuery, ListMessagesQueryVariables } from "../__generated__/graphql";
import { client } from '../graphql';

const QUERY = gql`
    query ListMessages($session: Int!) {
        messages(session: $session) {
            id
            message
            created
            session
        }
    }
`;

export const useListMessagesQuery = (session: number) => useQuery<ListMessagesQuery, ListMessagesQueryVariables>(QUERY, {
    variables: {
        session,
    },
});

export const listMessagesForceRefetch = async () => {
    await client.refetchQueries({
        include: [QUERY],
    });
}
