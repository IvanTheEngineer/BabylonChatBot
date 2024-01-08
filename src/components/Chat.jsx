import { useState } from "react";
import "./ChatBox.css"
import { Message } from "./Message.jsx"

export const Chat = ({messageLog, userLog}) => {

    if (messageLog) {
        return (
    <div className="chatBox">
        <ul>    
            {messageLog.map((element, index) => (
            <Message message={element} sender={userLog[index]}/>
        ))}
        </ul>
    </div>)
    }
}
