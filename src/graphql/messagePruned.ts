import gql from "graphql-tag";
import { useSubscription } from '@apollo/client';
import { MessagePrunedSubscription } from "../__generated__/graphql";

const SUBSCRIPTION = gql`
    subscription MessagePruned {
        messagePruned
    }
`;

export const useMessagePrunedSubscription = () => useSubscription<MessagePrunedSubscription>(SUBSCRIPTION);
