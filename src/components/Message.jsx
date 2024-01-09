import './Chat.css'
import logo from './logo.png'

export const Message = ({message, sender}) => {
    const isUserMessage = sender === 'user';

    return (
        <div className={`chatMessage ${isUserMessage ? 'userMessage' : 'assistantMessage'}`}>
        <p className="messageSender">{isUserMessage ? 'You: ' : <img src={logo} alt="Assistant:" style={{ width: '20px' }} />}
        </p>
        <p className="messageText">{message}</p>
        </div>
    );
}