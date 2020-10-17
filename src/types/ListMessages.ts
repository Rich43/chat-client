/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListMessages
// ====================================================

export interface ListMessages_listMessages {
  __typename: "Message";
  id: string;
  message: string;
  created: string;
}

export interface ListMessages {
  listMessages: ListMessages_listMessages[];
}
