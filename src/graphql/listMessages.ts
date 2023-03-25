import gql from "graphql-tag";
import {ListMessages} from "../types/ListMessages";
import { useQuery } from '@apollo/client';

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
