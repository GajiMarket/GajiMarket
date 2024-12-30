import React from 'react'
import "../../style/Chatpage.css"

const Chatting:React.FC = () => {
  return (
    <div className="chatting-container">
        <div className="chat-time">2024년 12월 19일</div>
        <div className="chat-bubble received">물건 팔렸나요?</div>
        <div className="chat-bubble sent">아니요! 아직 안 팔렸습니다.</div>
        <div className="chat-bubble sent">직거래 하실 건가요?</div>
        <div className="chat-bubble received">네. 계신 곳에서 거래하겠습니다.</div>
    </div>
  )
}

export default Chatting