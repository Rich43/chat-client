import React, { useState } from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import { useCreateContentMutation } from "../graphql/createMessage";

export function Home() {
    const [content, setContent] = useState('');
    const [createContent] = useCreateContentMutation();
    const onSubmit = () => {
        console.log(content);
        createContent(
            {
                variables: {content}
            }
        ).then();
    };
    return (
        <>
            <Box p={2}>{ content }</Box>
            <TextField
                value={content}
                onChange={event => setContent(event.target.value)}
            />
            <Button onClick={() => onSubmit()}>Submit</Button>
        </>
    );
}

export default Home;
