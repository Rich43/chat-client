import React, { useState } from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import { useCreateContentMutation } from "../graphql/createMessage";

export function Home() {
    const [message, setMessage] = useState('');
    const [createContent] = useCreateContentMutation();
    const onSubmit = () => {
        console.log(message);
        createContent(
            {
                variables: {message}
            }
        ).then();
    };
    return (
        <>
            <Box p={2}>{ message }</Box>
            <TextField
                value={message}
                onChange={event => setMessage(event.target.value)}
            />
            <Button onClick={() => onSubmit()}>Submit</Button>
        </>
    );
}

export default Home;
