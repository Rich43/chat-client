import gql from "graphql-tag";
import { useMutation } from '@apollo/client';
import { CreateMessageMutation, CreateMessageMutationVariables } from "../__generated__/graphql";

const MUTATION = gql`
    mutation CreateMessage($session: Int!, $message: String!) {
        createMessage(session: $session, message: $message) {
            id
            message
            created
            session
        }
    }
`;

export const useCreateMessageMutation = () => useMutation<CreateMessageMutation, CreateMessageMutationVariables>(MUTATION);
