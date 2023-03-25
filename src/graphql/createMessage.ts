import gql from "graphql-tag";
import { CreateMessage, CreateMessageVariables } from "../types/CreateMessage";
import { useMutation } from '@apollo/client';

const MUTATION = gql`
    mutation CreateMessage($message: String!) {
        createMessage(message: $message) {
            id
            message
        }
    }
`;

export const useCreateMessageMutation = () => useMutation<CreateMessage, CreateMessageVariables>(MUTATION);
