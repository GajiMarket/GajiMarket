import React from 'react'
import "../style/Chatlist.css"
import ChatlistHeader from '../components/chatlist/ChatlistHeader'
import ChatlistForm from '../components/chatlist/ChatlistForm'

const Chatlist:React.FC = () => {
  const chats = [
    {
      id: 1,
      name: "이강인",
      location: "가산동",
      time: "1시간전",
      message: "하하네네 맞습니다 맞고요",
      avatar: "/path/to/avatar1.jpg", // 적절한 이미지 경로 삽입
    },
    {
      id: 2,
      name: "손흥민",
      location: "가산동",
      time: "1시간전",
      message: "아니요 그쪽에서 오셔야죠",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      id: 3,
      name: "김민재",
      location: "가산동",
      time: "1시간전",
      message: "나찜찜 vs 깡패대장",
      avatar: "/path/to/avatar1.jpg",
    },
  ];

  return (
    <div className="chatlist">
      <ChatlistHeader />
      <ChatlistForm chats={chats} />
    </div>
  );
};

export default Chatlist