import gql from "graphql-tag";
import {UpdateMessage} from "../types/UpdateMessage";
import { useSubscription } from '@apollo/client';

const SUBSCRIPTION = gql`
    subscription UpdateMessage {
        updateMessage {
            id
            message
            created
        }
    }
`;

export const useUpdateMessageSubscription = () => useSubscription<UpdateMessage>(SUBSCRIPTION);
