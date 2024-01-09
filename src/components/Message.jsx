import './Chat.css'
import logo from './logo.png'
import profile from './User-profile.png'

export const Message = ({message, sender}) => {
    const isUserMessage = sender === 'user';

    return (
        <div className={`chatMessage ${isUserMessage ? 'userMessage' : 'assistantMessage'}`}>
        <p className="messageSender">{isUserMessage ? <img src={profile} alt="You:" style={{ width: '20px' }} /> : <img src={logo} alt="Assistant:" style={{ width: '20px' }} />}
        </p>
        <p className="messageText">{message}</p>
        </div>
    );
}