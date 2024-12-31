import React from 'react'
import "../../style/Chatpage.css"

interface ChatMessage {
  id: number
  sender: 'buyer' | 'seller'
  message: string
  timestamp: string
}

const Chatting:React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div className="chatting-container">메시지가 없습니다.</div>;
  }

  return (
    <div className="chatting-container">
      {messages.map((msg) => (
        <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
          <div className="chat-message">{msg.message}</div>
          <div className="chat-timestamp">{msg.timestamp}</div>
        </div>
      ))}
    </div>


    // <div className="chatting-container">
    //     <div className="chat-time">2024년 12월 19일</div>
    //     <div className="chat-bubble received">물건 팔렸나요?</div>
    //     <div className="chat-bubble sent">아니요! 아직 안 팔렸습니다.</div>
    //     <div className="chat-bubble sent">직거래 하실 건가요?</div>
    //     <div className="chat-bubble received">네. 계신 곳에서 거래하겠습니다.</div>
    // </div>
  )
}

export default Chatting