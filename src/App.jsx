import { useState, useEffect } from 'react'
import * as React from 'react';
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { OpenAI } from "openai";
import { Chat } from "./components/Chat.jsx"
import logo from './components/logo.png'
import IconButton from '@mui/material/IconButton';

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
  const [toggle, setToggle] = useState(1);

  useEffect(() => {
  createThread()
  }, [toggle]);

  useEffect(() => {
    if (threadID !== "") {
      getMessages()
    }
    }, [threadID]);
  
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


  // variable to store/update message list
  const [msgLog, setMsgLog] = useState([]);

  // variable to store/update user list
  const [userLog, setUserLog] = useState([]);

  // function to update message log 
  // since setChatLog doesn't update immediately, a console.log has to be used 
  // with the same request to get updated results (need a better solution)
  const getMessages = async () => {
    const messageList = [];
    const userList = [];
    (await openai.beta.threads.messages.list(threadID)).data.forEach((obj) => messageList.push(obj.content[0].text.value));
    (await openai.beta.threads.messages.list(threadID)).data.forEach((obj) => userList.push(obj.role));
    messageList.push("Hey there! I’m Harvest! I'm an AI assistant here to help you with information about Babylon Micro-Farms.");
    userList.push("assistant");
    setMsgLog(messageList.reverse());
    setUserLog(userList.reverse());
    console.log(await openai.beta.threads.messages.list(threadID));
  }

  useEffect(() => {
    setMsgLog(["Hey there! I’m Harvest! I'm an AI assistant here to help you with information about Babylon Micro-Farms."]),
    setUserLog(["assistant"]);
    }, []);

    const [disableReset, setDisableReset] = useState(false);

  // function to perform run
  async function doRun() {

    getMessages();

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
  }

  // takes care of everything that needs to be done when user sends message
  const handleSubmit = async () => {
    try {
      // prints message sent by user (for debugging)
      console.log(message);

      // adds the user's message to the thread
      await addMessage();

      // resets message to clear field
      setMessage("");

      setDisableReset(true);
      // performs a run on the thread
      await doRun();
      setDisableReset(false);

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
    <div className='links'>
      <a href="https://babylonmicrofarms.com/" target ="_blank" style={{ width: 'fit-content',textDecoration: "none", color: "black", marginLeft:"5%", marginRight:"5%", fontWeight: "bold", fontFamily: "source-sans-3-variable"}} > Home</a>
      <a href="https://babylonmicrofarms.com/the-galleri-by-babylon-micro-farms/" target ="_blank" style={{ width: 'fit-content', textDecoration: "none", color: "black", marginLeft:"2%", marginRight:"8%", fontWeight: "bold", fontFamily: "source-sans-3-variable"}} > Galleri Micro-Farm</a>
      <a href="https://babylonmicrofarms.com/your-impact/" target ="_blank" style={{ width: 'fit-content', textDecoration: "none", color: "black", marginRight:"5%", fontWeight: "bold", fontFamily: "source-sans-3-variable", textAlign: "center" }} > Sustainability</a>
      <a href="https://babylonmicrofarms.com/faq/" target ="_blank" style={{ width: 'fit-content',textDecoration: "none", color: "black", marginLeft:"5%", marginRight:"5%", fontWeight: "bold", fontFamily: "source-sans-3-variable"}} > FAQs</a>
      <a href="https://www.instagram.com/babylonmicrofarms/?hl=en" target ="_blank" style={{ width: 'fit-content',textDecoration: "none", color: "black", marginLeft:"5%", marginRight:"5%", fontWeight: "bold", fontFamily: "source-sans-3-variable"}}> Contact</a>
    </div>
    
    <div style={{ textAlign: "center", marginBottom: "10px", maxWidth: "93%", margin: "auto" }}>
      <div style={{ background: "#5991A1", padding: "10px", borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}>
      <img src= {logo} alt="Harvest Icon" style={{ width: '30px', verticalAlign: 'middle', marginRight: '10px' }} />
        <h1 style={{  fontFamily: '"source-serif-pro", serif', fontWeight: '600',
    fontStyle: 'normal', color: "black", margin: 0}}>
            Harvest
        </h1>
        <h3 style={{ fontWeight: "400", fontFamily: "source-sans-3-variable",
    fontStyle: 'italic', color: "black", margin: 0 }}>
        Meet Harvest, your personal Babylon Micro-Farms AI Assistant
        </h3>

      </div>
    </div>
    
      <Chat messageLog={msgLog} userLog={userLog}/>
    
      <div style={{ textAlign: "center", marginBottom: "10px",  maxWidth: "93%", margin: "auto" }}>
        <div style={{ background: "#5991A1",  padding: "10px", borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px"}}>
      <div className="barElement">
      <IconButton disabled={disableReset} style={{alignSelf: "center", width:'fit-content', marginLeft: '0', marginTop: "12px", color: disableReset?"grey":"white", backgroundColor: "#004258"}} onClick={() => setToggle(toggle * -1)} variant="contained" > <ReplayIcon />
      </IconButton>
      <TextField InputProps={{ disableUnderline: true }} style={{width:'70%', flex:"1", backgroundColor: "#004258", color: "white", marginTop: "8px", marginLeft: '5px', borderRadius: "15px"}} InputLabelProps={{ style: { color: 'white', fontFamily: "source-sans-3-variable",
    fontVariationSettings: '"wght" 200' } }} sx={{ input: { color: 'white', fontFamily: "source-sans-3-variable", 
    fontVariationSettings: '"wght" 200'  } }} id="outlined-basic" label="Ask me anything . . ." variant="filled" value={message} 
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevents the default behavior of Enter key in a textarea
          handleSubmit();
        }
      }}
      />
      <IconButton style={{width:'fit-content', alignSelf: "center",marginLeft: '5px', marginTop: "12px", color: "white", backgroundColor: "#004258"}} onClick={() => handleSubmit()} variant="contained" > <SendIcon />
      </IconButton>
      </div>
      </div>
      </div>
    
      
      
    
    </>
  )
}

export default App
