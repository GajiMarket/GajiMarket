import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/Chatlist.css";
import ChatlistHeader from '../components/chatlist/ChatlistHeader';
import ChatlistForm from '../components/chatlist/ChatlistForm';
import Footer from '../components/all/Footer';
import { useNavigate } from 'react-router-dom';
import loginStore from '../utils/loginStore'; // 로그인 상태를 가져오는 훅

const api = import.meta.env.VITE_API_LOCAL;

const google = import.meta.env.VITE_GOOGLE_URL;

interface Chat {
  chat_room_id: number;
  last_message: string;
  last_message_time: string;
  name: string;
  location: string;
  avatar: string; // 추가
  time: string; // 추가
  productId: number; // 추가
}

const Chatlist: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const navigate = useNavigate();
  const { userNo } = loginStore(); // 로그인한 회원 정보 가져오기

  useEffect(() => {
    if (!userNo) return; // 로그인한 회원이 없으면 리턴

    const fetchChats = async () => {
      try {
        const response = await axios.get(import.meta.env.NODE_ENV === 'production' ? `${google}/api/chatrooms/${userNo}` : `${api}/api/chatrooms/${userNo}`); // 회원 번호를 URL에 포함
        console.log('Fetched chats:', response.data); // 로그 추가
        setChats(response.data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    fetchChats();
  }, [userNo]);

  const handleChatClick = (chatRoomId: number, chatName: string, productId: number) => {
    navigate(`/chatpage/${chatRoomId}?name=${encodeURIComponent(chatName)}&memberNo=${userNo}&productId=${productId}`);
  };

  return (
    <div className="chatlist">
      <ChatlistHeader />
      <div className="chatlist-scroll-container">
        <ChatlistForm chats={chats} onChatClick={handleChatClick} />
      </div>
      <Footer currentPage={3} />
    </div>
  );
};

export default Chatlist;