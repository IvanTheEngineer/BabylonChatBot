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

  // NOTE: useState set methods are asynchronus, and therefore do not
  // update the variable immediately, it takes a second

  // creates api instance which we can use for its built in functions 
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })

  // variable to store and update thread id
  const [threadID, setThreadID] = useState("");

  // function used to make a thread and set the ID
  const createThread = async () => {
    const thread = await openai.beta.threads.create();
    setThreadID(thread.id)
  }

  // one time function to create a thread at the beginning
  useEffect(() => {
  createThread()
  }, []);

  // variable to store and update message typed by user
  const [message, setMessage] = useState("")

  // function to add messages to the thread
  const addMessage = async () => {
    await openai.beta.threads.messages.create(
      threadID,
      {
        role: "user",
        content: message
      }
    );
  }

  // variable to store/update chat log
  const [chatLog, setChatLog] = useState({});

  // variable to store/update msg log
  const [msgLog, setMsgLog] = useState([]);

  // function to update message log 
  // since setChatLog doesn't update immediately, a console.log has to be used 
  // with the same request to get updated results (need a better solution)
  const getMessages = async () => {
    setChatLog(await openai.beta.threads.messages.list(threadID));
    const messageList = [];
    (await openai.beta.threads.messages.list(threadID)).data.forEach((obj) => messageList.push(obj.content[0].text.value))
    setMsgLog(messageList.reverse());
    console.log(messageList);
    console.log(await openai.beta.threads.messages.list(threadID));
  }

  // function to perform run
  const doRun = async () => {

    getMessages()
    
    // this creates a run for our specific thread
    const myRun = await openai.beta.threads.runs.create(threadID, {
      assistant_id: import.meta.env.VITE_ASSISTANT_ID,
    });
    
    // this fetches an updated version of the run we just made and stores it in a new variable
    let runStatus = await openai.beta.threads.runs.retrieve(
      threadID,
      myRun.id
    );
    
    // this loop keeps fetching a new run every 1000ms until the status is "completed"
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve,
        1000));
      runStatus = await openai.beta.threads.runs.retrieve(
        threadID,
        myRun.id
      );
    }

    // this updates our chat log after the run is over 
    getMessages();
  };

  // takes care of everything that needs to be done when user sends message
  const handleSubmit = async () => {
    try {
      // prints message sent by user (for debugging)
      console.log(message);

      // adds the user's message to the thread
      await addMessage();

      // resets message to clear field
      setMessage("");

      // performs a run on the thread
      await doRun();

      // handles any errors that occur
    } catch (error){
      console.log("Error: " + error);
    }
  };

  // Currently no implementation for displaying messages. To see api in action go to
  // inspect element -> console as you type and send messages (Larger indexes in the 
  // thread data array are older)
  return (
    <>
      <h1>Babylon Chat Bot</h1>
      <ul>
        {msgLog.map((element, index) => (
          <li key="{element}">{element}</li>
        ))}
      </ul>
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
