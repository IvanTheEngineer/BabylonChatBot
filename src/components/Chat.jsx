import { useState } from "react";
import "./ChatBox.css"
import { Message } from "./Message.jsx"
import CircularProgress from '@mui/material-next/CircularProgress';

export const Chat = ({messageLog, userLog}) => {

    const waiting = (userLog[userLog.length-1] === "user");

    if (messageLog) {
        return (
    <div className="chatBox">
            {messageLog.map((element, index) => (
            <Message message={element} sender={userLog[index]}/>
        ))}
        {waiting && <CircularProgress color="info" style={{marginLeft:"3%", marginBottom:"20px"}}/>}
    </div>)
    }
}
