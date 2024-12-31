import React, { useState } from 'react'
import "../../style/Chatpage.css"

interface ChatSendProps {
  onSendMessage: (message: string) => void;
}

const ChatSend:React.FC<ChatSendProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(message.trim()) {
      onSendMessage(message)
      setMessage('');
    }
  }

  return (
    <form className="chat-send" onSubmit={handleSubmit}>
    <button className="chat-plus-button">+</button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요."
        className="chat-input"
      />
      <button type="submit" className="chat-send-button">전송</button>
    </form>
  )
}

export default ChatSend