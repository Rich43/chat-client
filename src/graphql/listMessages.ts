import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';
import {UpdateMessage} from "../types/UpdateMessage";

const QUERY = gql`
    query ListMessages {
        listMessages {
            id
            message
            created
        }
    }
`;

export const useListMessagesQuery = () => useQuery<UpdateMessage>(QUERY);
