import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useChatStore } from '../utils/chatStore';
import io from 'socket.io-client';
import axios from 'axios';
import ChatHeader from '../components/chatpage/ChatHeader';
import ChatProduct from '../components/chatpage/ChatProduct';
import Chatting from '../components/chatpage/Chatting';
import ChatSend from '../components/chatpage/ChatSend';

const socket = io('http://localhost:8080');

interface ChatMessage {
  id: number;
  sender: 'buyer' | 'seller';
  message: string;
  timestamp: string;
}

const Chatpage: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name') || 'Unknown';
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState('');

  useEffect(() => {
    // 서버에서 채팅 메시지 데이터를 가져옴
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for chat ID: ${roomId}`);
        const response = await axios.get(`http://localhost:5000/api/chat/${roomId}`);
        console.log('Fetched messages:', response.data);
        response.data.forEach((msg: ChatMessage) => addMessage(roomId, msg.message));
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    socket.on('message', (message: string) => {
      addMessage(roomId, message);
    });

    return () => {
      socket.off('message');
    };
  }, [addMessage, roomId]);

  const sendMessage = () => {
    socket.emit('message', input);
    addMessage(roomId, input);
    setInput('');
  };

  const handleSendMessage = async (message: string) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/chat/${roomId}`, { message });
      addMessage(roomId, response.data.message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="chatpage">
      <ChatHeader roomId={roomId} chatName={name} />
      <ChatProduct />
      <Chatting messages={messages[roomId] || []} />
      <ChatSend onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatpage;