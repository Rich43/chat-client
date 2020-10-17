import React, { useState } from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import { useCreateMessageMutation } from "../graphql/createMessage";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    chatLog: {
        height: '100%'
    },
});

export function Home() {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [createMessage] = useCreateMessageMutation();
    const onSubmit = () => {
        console.log(message);
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
                />
                <Box display="flex" flexDirection="row" alignSelf="flex-end">
                    <TextField
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    />
                    <Button onClick={() => onSubmit()}>Submit</Button>
                </Box>
            </Box>
        </>
    );
}

export default Home;
