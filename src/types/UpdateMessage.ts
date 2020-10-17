/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: UpdateMessage
// ====================================================

export interface UpdateMessage_updateMessage {
  __typename: "Message";
  id: string;
  message: string;
  created: string;
}

export interface UpdateMessage {
  updateMessage: UpdateMessage_updateMessage | null;
}
