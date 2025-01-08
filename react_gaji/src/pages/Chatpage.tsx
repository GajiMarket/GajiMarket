import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/Chatpage.css";
import ChatHeader from '../components/chatpage/ChatHeader';
import ChatProduct from '../components/chatpage/ChatProduct';
import Chatting from '../components/chatpage/Chatting';
import ChatSend from '../components/chatpage/ChatSend';
import { useParams, useLocation } from 'react-router-dom';

interface ChatMessage {
  id: number;
  sender: 'buyer' | 'seller';
  message: string;
  timestamp: string;
}

const Chatpage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name') || 'Unknown';
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // 서버에서 채팅 메시지 데이터를 가져옴
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for chat ID: ${id}`);
        const response = await axios.get(`http://localhost:5000/api/chat/${id}`);
        console.log('Fetched messages:', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [id]);

  // // 1:1 채팅방 채팅글 임시 데이터
  // useEffect(() => {
  //   // 임시 데이터를 사용하여 페이지가 제대로 렌더링되는지 확인합니다.
  //   const fetchMessages = async () => {
  //     try {
  //       console.log(`Fetching messages for chat ID: ${id}`);
  //       // 임시 데이터
  //       const tempMessages: ChatMessage[] = [
  //         { id: 1, sender: 'buyer', message: '안녕하세요!', timestamp: '10:00 AM' },
  //         { id: 2, sender: 'seller', message: '안녕하세요, 무엇을 도와드릴까요?', timestamp: '10:01 AM' },
  //         { id: 3, sender: 'buyer', message: '이 제품 아직 판매 중인가요?', timestamp: '10:02 AM' },
  //         { id: 4, sender: 'seller', message: '네, 아직 판매 중입니다.', timestamp: '10:03 AM' },
  //       ];
  //       setMessages(tempMessages);
  //     } catch (error) {
  //       console.error('Failed to fetch messages:', error);
  //     }
  //   };
  //   fetchMessages();
  // }, [id]);

  // 메시지 전송 핸들러
  const handleSendMessage = async (message: string, image?: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/chat/${id}`, { message, image });
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!id) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="chatpage">
      <ChatHeader chatId={id} chatName={name} />
      <ChatProduct />
      <Chatting messages={messages} />
      <ChatSend onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatpage;