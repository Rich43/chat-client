import React, { useCallback, useEffect, useRef } from 'react';
import { useCreateMessageMutation } from "../graphql/createMessage";
import { useListMessagesQuery } from "../graphql/listMessages";
import { useUpdateMessageSubscription } from "../graphql/updateMessage";
import { Box, Button, TextField } from '@mui/material';
import { useMessagePrunedSubscription } from "../graphql/messagePruned";
import alert from './alert.mp3';
import useSound from "use-sound";

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
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isCurrentMessage, setIsCurrentMessage] = React.useState(false);
    const [isCurrentMessageResetTimeout, setIsCurrentMessageResetTimeout] = React.useState(new Date().getTime());
    const [alertSfx] = useSound(alert, {
        onplay: () => setIsPlaying(true),
        onend: () => setIsPlaying(false)
    });
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
            return messageHistoryRef.current.value;
        }
        return '';
    }, [messageHistoryRef, channel]);
    const onSubmit = useCallback(() => {
        setIsCurrentMessage(true);
        setIsCurrentMessageResetTimeout(new Date().getTime());
        if (messageHistoryRef.current && createMessageTextBoxRef.current) {
            createMessage(
                {
                    variables: {session: channel, message: `<${username}> ${createMessageTextBoxRef.current.value}` || ''}
                }
            ).then(data => {
                if (createMessageTextBoxRef.current) {
                    if (messageHistoryRef.current && createMessageTextBoxRef.current && data.data && data.data.createMessage) {
                        scrollToBottom();
                        createMessageTextBoxRef.current.value = '';
                        refreshView(data.data.createMessage);
                    }
                }
            });
        }
    }, [createMessage, username, channel, refreshView, isCurrentMessage, isCurrentMessageResetTimeout]);
    useEffect(() => {
        if (pruneMessageData) {
            refreshView(pruneMessageData);
            scrollToBottom();
        }
    }, [pruneMessageData, refreshView]);
    useEffect(() => {
        if (listMessagesData) {
            refreshView(listMessagesData);
            scrollToBottom();
        }
    }, [listMessagesData, refreshView]);
    useEffect(() => {
        if (messageHistoryRef.current && updateMessageData) {
            const oldMessages = messageHistoryRef.current.value;
            const newMessages = refreshView(updateMessageData);
            scrollToBottom();
            if (oldMessages !== newMessages && !isPlaying && !isCurrentMessage) {
                alertSfx();
            }
            if (isCurrentMessage && !isPlaying && new Date().getTime() - isCurrentMessageResetTimeout > 5000) {
                setIsCurrentMessage(false);
            }
        }

    }, [updateMessageData, refreshView, alertSfx, isPlaying, isCurrentMessageResetTimeout, isCurrentMessage]);
    return (
        <>
            <Box display="flex" flexDirection="column" flex="1">
                <Box display="flex" flexDirection="row" alignSelf="flex-start" padding={2}>
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
