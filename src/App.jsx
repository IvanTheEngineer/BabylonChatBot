import { useState } from 'react'
import * as React from 'react';
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Babylon Chat Bot</h1>
      <TextField id="outlined-basic" label="Enter Text" variant="outlined" />
      <Button variant="contained" endIcon={<SendIcon />}>
      Send
      </Button>

    </>
  )
}

export default App
