import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';

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
