import React, {useEffect, useRef, useState} from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import { useCreateMessageMutation } from "../graphql/createMessage";
import {makeStyles} from "@material-ui/core/styles";
import {useListMessagesQuery} from "../graphql/listMessages";
import {useUpdateMessageSubscription} from "../graphql/updateMessage";

const useStyles = makeStyles({
    chatLog: {
        height: '100%'
    },
    inputBox: {
        width: '100%'
    }
});

export function Home() {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const ref = useRef<HTMLTextAreaElement>(null);
    const [createMessage] = useCreateMessageMutation();
    const listMessages = useListMessagesQuery();
    const updateMessage = useUpdateMessageSubscription();
    const updateMessageData = updateMessage.data && updateMessage.data.updateMessage;
    useEffect(() => {
        if (ref.current && listMessages.data) {
            ref.current.value = ''.concat(...listMessages.data.listMessages.map(row => `[${row.created}] ${row.message}\n`));
        }
    }, [listMessages]);
    useEffect(() => {
        if (ref.current && updateMessageData) {
            ref.current.value += `[${updateMessageData.created}] ${updateMessageData.message}\n`;
        }
    }, [updateMessageData]);
    const onSubmit = () => {
        setMessage('');
        createMessage(
            {
                variables: {message}
            }
        ).then();
    };
    return (
        <>
            <Box display="flex" flexDirection="column" flex="1">
                <textarea
                    className={classes.chatLog}
                    ref={ref}
                />
                <Box display="flex" flexDirection="row" alignSelf="flex-end" width="100%">
                    <TextField
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        onKeyPress={event => event.charCode === 13 ? onSubmit() : undefined}
                        className={classes.inputBox}
                    />
                    <Button onClick={() => onSubmit()}>Submit</Button>
                </Box>
            </Box>
        </>
    );
}

export default Home;
