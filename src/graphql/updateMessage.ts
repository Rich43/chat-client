import gql from "graphql-tag";
import {useSubscription} from "@apollo/react-hooks";
import {UpdateMessage} from "../types/UpdateMessage";

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
