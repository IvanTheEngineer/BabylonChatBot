import './Chat.css'

export const Message = ({message, sender}) => {
    const isUserMessage = sender === 'user';

    return (
        <div className={`chatMessage ${isUserMessage ? 'userMessage' : 'assistantMessage'}`}>
        <p className="messageSender">{isUserMessage ? 'You: ' : "Assistant: "}</p>
        <p className="messageText">{message}</p>
        </div>
    );
}