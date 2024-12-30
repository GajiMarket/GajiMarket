import React from 'react'
import "../style/Chatpage.css"
import ChatHeader from '../components/chatpage/ChatHeader'
import ChatProduct from '../components/chatpage/ChatProduct'
import Chatting from '../components/chatpage/Chatting'
import ChatSend from '../components/chatpage/ChatSend'
import { useParams, useLocation } from 'react-router-dom'

const Chatpage:React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name') || 'Unknown';

  if(!id) {
    return <div>잘못된 접근입니다.</div>
  }

  return (
    <div className="chatpage">
      <ChatHeader chatId={id} chatName={name} />
      <ChatProduct />
      <Chatting />
      <ChatSend />
    </div>
  );

}

export default Chatpage