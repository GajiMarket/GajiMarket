import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useChatStore } from '../utils/chatStore';
import io from 'socket.io-client';
import axios from 'axios';
import ChatHeader from '../components/chatpage/ChatHeader';
import ChatProduct from '../components/chatpage/ChatProduct';
import Chatting from '../components/chatpage/Chatting';
import ChatSend from '../components/chatpage/ChatSend';

const api = import.meta.env.VITE_API_LOCAL;

// const google = import.meta.env.VITE_GOOGLE_URL;

const socket = io(import.meta.env.MODE === 'production' ? `https://gajimarket-api-dot-winged-woods-442503-f1.du.r.appspot.com` : `${api}`);

interface ChatMessage {
  id: number;
  sender: 'buyer' | 'seller';
  message: string;
  timestamp: string;
}

const Chatpage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const roomId = id || ''; // roomId를 string으로 변환
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name') || 'Unknown';
  const productId = searchParams.get('productId') || '';
  // const memberNo = searchParams.get('memberNo') || '';
  const { messages, addMessage } = useChatStore();
  // const [input, setInput] = useState('');

  useEffect(() => {
    console.log(`Product ID in Chatpage: ${productId}`); // 추가된 로그
    // 서버에서 채팅 메시지 데이터를 가져옴
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for chat ID: ${roomId}`);
        const response = await axios.get(import.meta.env.MODE === 'production' ? `https://gajimarket-api-dot-winged-woods-442503-f1.du.r.appspot.com/api/chat/${roomId}` : `${api}/api/chat/${roomId}`);
        console.log('Fetched messages:', response.data);
        response.data.forEach((msg: ChatMessage) => addMessage(roomId, msg));
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    socket.on('message', (message: ChatMessage) => {
      addMessage(roomId, message);
    });

    return () => {
      socket.off('message');
    };
  }, [addMessage, roomId]);

  // const sendMessage = () => {
  //   const newMessage: ChatMessage = {
  //     id: Date.now(),
  //     sender: 'buyer',
  //     message: input,
  //     timestamp: new Date().toISOString(),
  //   };
  //   socket.emit('message', newMessage);
  //   addMessage(roomId, newMessage);
  //   setInput('');
  // };

  const handleSendMessage = async (message: string) => {
    try {
      const response = await axios.post(import.meta.env.MODE === 'production' ? `https://gajimarket-api-dot-winged-woods-442503-f1.du.r.appspot.com/api/chat/${roomId}` : `${api}/api/chat/${roomId}`, { message });
      addMessage(roomId, response.data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="chatpage">
      <ChatHeader roomId={roomId} chatName={name} />
      <ChatProduct productId={productId} />
      <Chatting messages={messages[roomId] || []} />
      <ChatSend onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatpage;