import React from 'react'
import "../../style/Chatpage.css"

interface ChatHeaderProps {
  chatId: string
  chatName: string
}

const ChatHeader:React.FC<ChatHeaderProps> = ({ chatId, chatName }) => {


  return (
    <div className='chat-header'>
      <button className="chat-back-button">←</button>
      <h2 className="chat-header-name">{chatName}</h2>
      <p className="chat-response-time">1분 내 응답</p>
    </div>
  )
}

export default ChatHeader