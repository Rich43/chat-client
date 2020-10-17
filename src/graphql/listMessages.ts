import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';
import {ListMessages} from "../types/ListMessages";

const QUERY = gql`
    query ListMessages {
        listMessages {
            id
            message
            created
        }
    }
`;

export const useListMessagesQuery = () => useQuery<ListMessages>(QUERY);
