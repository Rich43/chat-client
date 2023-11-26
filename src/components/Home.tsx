import React, { useEffect, useRef } from 'react';
import { useCreateMessageMutation } from "../graphql/createMessage";
import { useListMessagesQuery } from "../graphql/listMessages";
import { useUpdateMessageSubscription } from "../graphql/updateMessage";
import { Box, Button, TextField } from '@mui/material';

export function Home() {
    const messageHistoryRef = useRef<HTMLTextAreaElement>(null);
    const createMessageTextBoxRef = useRef<HTMLInputElement>(null);
    const [createMessage] = useCreateMessageMutation();
    const listMessages = useListMessagesQuery(123);
    const updateMessage = useUpdateMessageSubscription();
    const updateMessageData = updateMessage.data && updateMessage.data.updateMessage;
    useEffect(() => {
        if (messageHistoryRef.current && listMessages.data && listMessages.data.messages) {
            messageHistoryRef.current.value = ''.concat(...listMessages.data.messages.map(row => `[${row.created}] ${row.message}\n`));
            messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
        }
    }, [listMessages]);
    useEffect(() => {
        if (messageHistoryRef.current && updateMessageData) {
            messageHistoryRef.current.value += `[${updateMessageData.created}] ${updateMessageData.message}\n`;
            messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
        }
    }, [updateMessageData]);
    const onSubmit = () => {
        if (createMessageTextBoxRef.current) {
            createMessage(
                {
                    variables: {session: 123, message: createMessageTextBoxRef.current.value || ''}
                }
            ).then();
            createMessageTextBoxRef.current.value = '';
        }
    };
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
