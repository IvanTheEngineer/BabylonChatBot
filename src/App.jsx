import { useState } from 'react'
import * as React from 'react';
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

function App() {
  const [message, setMessage] = useState("")
  
  const handleSubmit = () => {
    console.log(message);
    setMessage("");
  };
  return (
    <>
      <h1>Babylon Chat Bot</h1>
      <TextField id="outlined-basic" label="Message" variant="outlined" value={message} 
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      />
      <Button onClick={() => handleSubmit()} variant="contained" endIcon={<SendIcon />}>
      Send
      </Button>

    </>
  )
}

export default App
