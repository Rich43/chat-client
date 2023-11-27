import React, { useCallback, useEffect, useRef } from 'react';
import { useCreateMessageMutation } from "../graphql/createMessage";
import { listMessagesForceRefetch, useListMessagesQuery } from "../graphql/listMessages";
import { useUpdateMessageSubscription } from "../graphql/updateMessage";
import { Box, Button, TextField } from '@mui/material';
import { useMessagePrunedSubscription } from "../graphql/messagePruned";

export function Home() {
    const messageHistoryRef = useRef<HTMLTextAreaElement>(null);
    const createMessageTextBoxRef = useRef<HTMLInputElement>(null);
    const [createMessage] = useCreateMessageMutation();
    let listMessages = useListMessagesQuery(123);
    const updateMessage = useUpdateMessageSubscription();
    const pruneMessage = useMessagePrunedSubscription()
    const updateMessageData = updateMessage.data && updateMessage.data.updateMessage;
    const pruneMessageData = pruneMessage.data && pruneMessage.data.messagePruned;
    const listMessagesData = listMessages.data && listMessages.data.messages;

    function scrollToBottom() {
        if (messageHistoryRef.current) {
            messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
        }
    }

    function refreshView(data: any) {
        if (messageHistoryRef.current) {
            messageHistoryRef.current.value = ''.concat(
                ...data.filter((row: any) => row.session === 123)
                    .map((row: any) => `[${row.created}] ${row.message}\n`)
            );
        }
    }

    useEffect(() => {
        if (pruneMessageData) {
            refreshView(pruneMessageData);
            scrollToBottom();
        }
    }, [pruneMessageData]);
    const onSubmit = useCallback(() => {
        if (messageHistoryRef.current && createMessageTextBoxRef.current) {
            createMessage(
                {
                    variables: {session: 123, message: createMessageTextBoxRef.current.value || ''}
                }
            ).then(() => {
                if (createMessageTextBoxRef.current) {
                    listMessagesForceRefetch().then(() => {
                        if (messageHistoryRef.current && createMessageTextBoxRef.current) {
                            scrollToBottom();
                            createMessageTextBoxRef.current.value = '';
                        }
                    });
                }
            });
        }
    }, [createMessage]);
    useEffect(() => {
        if (listMessagesData) {
            refreshView(listMessagesData);
            scrollToBottom();
        }
    }, [listMessagesData]);
    useEffect(() => {
        if (messageHistoryRef.current && updateMessageData) {
            messageHistoryRef.current.value += `[${updateMessageData.created}] ${updateMessageData.message}\n`;
            scrollToBottom();
        }
    }, [updateMessageData]);
    return (
        <>
            <Box display="flex" flexDirection="column" flex="1">
                <textarea
                    style={{height: '100%'}}
                    ref={messageHistoryRef}
                />
                <Box display="flex" flexDirection="row" alignSelf="flex-end" width="100%">
                    <TextField
                        sx={{width: '100%'}}
                        inputRef={createMessageTextBoxRef}
                        onKeyPress={event => event.charCode === 13 ? onSubmit() : undefined}
                    />
                    <Button onClick={() => onSubmit()}>Submit</Button>
                </Box>
            </Box>
        </>
    );
}

export default Home;
