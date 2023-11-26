import gql from "graphql-tag";
import { useSubscription } from '@apollo/client';
import { UpdateMessageSubscription } from "../__generated__/graphql";

const SUBSCRIPTION = gql`
    subscription UpdateMessage {
        updateMessage {
            id
            message
            created
            session
        }
    }
`;

export const useUpdateMessageSubscription = () => useSubscription<UpdateMessageSubscription>(SUBSCRIPTION);
