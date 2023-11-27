import React, { useCallback, useEffect, useRef } from 'react';
import { useCreateMessageMutation } from "../graphql/createMessage";
import { listMessagesForceRefetch, useListMessagesQuery } from "../graphql/listMessages";
import { useUpdateMessageSubscription } from "../graphql/updateMessage";
import { Box, Button, TextField } from '@mui/material';
import { useMessagePrunedSubscription } from "../graphql/messagePruned";

export function Home() {
    const messageHistoryRef = useRef<HTMLTextAreaElement>(null);
    const createMessageTextBoxRef = useRef<HTMLInputElement>(null);
    const channelRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const [createMessage] = useCreateMessageMutation();
    const [channel, setChannel] = React.useState(123);
    const [username, setUsername] = React.useState('Anonymous');
    let listMessages = useListMessagesQuery(channel);
    const updateMessage = useUpdateMessageSubscription();
    const pruneMessage = useMessagePrunedSubscription();
    const updateMessageData = updateMessage.data && updateMessage.data.updateMessage;
    const pruneMessageData = pruneMessage.data && pruneMessage.data.messagePruned;
    const listMessagesData = listMessages.data && listMessages.data.messages;

    function scrollToBottom() {
        if (messageHistoryRef.current) {
            messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
        }
    }

    const refreshView = useCallback((data: any) => {
        if (messageHistoryRef.current) {
            messageHistoryRef.current.value = ''.concat(
                ...data.filter((row: any) => row.session === channel)
                    .map((row: any) => `[${row.created}] ${row.message}\n`)
            );
        }
    }, [messageHistoryRef, channel]);

    useEffect(() => {
        if (pruneMessageData) {
            refreshView(pruneMessageData);
            scrollToBottom();
        }
    }, [pruneMessageData, refreshView]);
    const onSubmit = useCallback(() => {
        if (messageHistoryRef.current && createMessageTextBoxRef.current) {
            createMessage(
                {
                    variables: {session: channel, message: `<${username}> ${createMessageTextBoxRef.current.value}` || ''}
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
    }, [createMessage, username, channel]);
    useEffect(() => {
        if (listMessagesData) {
            refreshView(listMessagesData);
            scrollToBottom();
        }
    }, [listMessagesData, refreshView]);
    useEffect(() => {
        if (messageHistoryRef.current && updateMessageData) {
            messageHistoryRef.current.value += `[${updateMessageData.created}] ${updateMessageData.message}\n`;
            scrollToBottom();
        }
    }, [updateMessageData]);
    return (
        <>
            <Box display="flex" flexDirection="column" flex="1">
                <Box display="flex" flexDirection="row" alignSelf="flex-start" width="100%" padding={2}>
                    <Box paddingRight={2}>
                        <TextField
                            id="channel"
                            label="Channel"
                            type="number"
                            value={channel}
                            onChange={(event) => setChannel(parseInt(event.target.value))}
                            inputRef={channelRef}
                            InputProps={{
                                inputProps: {
                                    max: 1000000, min: 100
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                    <TextField
                        id="username"
                        label="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        inputRef={usernameRef}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
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
