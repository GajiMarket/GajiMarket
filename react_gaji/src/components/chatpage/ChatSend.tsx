import React from 'react'
import "../../style/Chatpage.css"

const ChatSend:React.FC = () => {
  return (
    <div className="chat-send">
      <button className="chat-plus-button">+</button>
      <input type="text" className="chat-input" placeholder="메시지 보내기" />
      <button className="chat-send-button">➤</button>
    </div>
  )
}

export default ChatSend