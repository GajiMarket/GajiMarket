import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useChatStore } from '../utils/chatStore';
import io from 'socket.io-client';
import axios from 'axios';
import ChatHeader from '../components/chatpage/ChatHeader';
import ChatProduct from '../components/chatpage/ChatProduct';
import Chatting from '../components/chatpage/Chatting';
import ChatSend from '../components/chatpage/ChatSend';

// const socket = io('http://localhost:3000');

interface ChatMessage {
  id: number;
  sender: 'buyer' | 'seller';
  message: string;
  timestamp: string;
}

interface Product {
  status: string;
  title: string;
  price: number;
  location: string;
}

const Chatpage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const roomId = id || ''; // roomId를 string으로 변환
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name') || 'Unknown';
  const memberNo = searchParams.get('memberNo') || 'Unknown';
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState('');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // 서버에서 채팅 메시지 데이터를 가져옴
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for chat ID: ${roomId}`);
        const response = await axios.get(`http://localhost:3000/api/chat/${roomId}`);
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

  useEffect(() => {
    // 서버에서 상품 데이터를 가져옴
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product for memberNo: ${memberNo}`);
        const response = await axios.get(`http://localhost:3000/api/product/${memberNo}`);
        console.log('Fetched product:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [memberNo]);

  const sendMessage = () => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: 'buyer',
      message: input,
      timestamp: new Date().toISOString(),
    };
    socket.emit('message', newMessage);
    addMessage(roomId, newMessage);
    setInput('');
  };

  const handleSendMessage = async (message: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/chat/${roomId}`, { message });
      addMessage(roomId, response.data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="chatpage">
      <ChatHeader roomId={roomId} chatName={name} />
      {product && (
        <ChatProduct
          status={product.status}
          title={product.title}
          price={product.price}
          location={product.location}
        />
      )}
      <Chatting messages={messages[roomId] || []} />
      <ChatSend onSendMessage={handleSendMessage} />
    </div>
  );
};


export default Chatpage;