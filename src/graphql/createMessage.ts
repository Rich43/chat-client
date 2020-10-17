import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { CreateMessage, CreateMessageVariables } from "../types/CreateMessage";

const MUTATION = gql`
    mutation CreateMessage($message: String!) {
        createMessage(message: $message) {
            id
            message
        }
    }
`;

export const useCreateContentMutation = () => useMutation<CreateMessage, CreateMessageVariables>(MUTATION);
