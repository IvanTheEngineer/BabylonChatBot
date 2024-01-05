import { useState, useEffect } from 'react'
import * as React from 'react';
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { OpenAI } from "openai";

function App() {

  // creates api instance
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })

  // variable to store thread id
  const [threadID, setThreadID] = useState("");

  // function to make a thread and set the id
  const createThread = async () => {
    const thread = await openai.beta.threads.create();
    setThreadID(thread.id)
  }

  // one time function to create a thread at the beginning
  useEffect(() => {
  createThread()
  }, []);

  //prints thread id (debugging)
  console.log(threadID)

  // stores message typed by user
  const [message, setMessage] = useState("")

  // function to add messages to the thread
  const addMessage = async () => {
    const newmessage = await openai.beta.threads.messages.create(
      threadID,
      {
        role: "user",
        content: message
      }
    );
  }

  // variable to store/update chat log
  const [chatLog, setChatLog] = useState({});

  // function to get messages
  const getMessages = async () => {
  }

  // takes care of everything that needs to be done when user sends message
  const handleSubmit = async () => {
    console.log(message);
    addMessage();
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
