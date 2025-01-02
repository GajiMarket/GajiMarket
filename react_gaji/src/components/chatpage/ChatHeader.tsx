import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../../style/Chatpage.css"

interface ChatHeaderProps {
  chatId: string
  chatName: string
}

const ChatHeader:React.FC<ChatHeaderProps> = ({ chatId, chatName }) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/chatlist')
  }

  return (
    <div className='chat-header'>
      <button className="chat-back-button" onClick={handleBackClick}>←</button>
      <h2 className="chat-header-name">{chatName}</h2>
      {/* <p className="chat-response-time">1분 내 응답</p> */}
    </div>
  )
}

export default ChatHeader