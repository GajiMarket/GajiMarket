import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "../style/Chatlist.css"
import ChatlistHeader from '../components/chatlist/ChatlistHeader'
import ChatlistForm from '../components/chatlist/ChatlistForm'
// import Footer from '../components/all/Footer'

interface ChatItem {
  id: number;
  name: string;
  location: string;
  time: string;
  message: string;
  avatar: string;
}

const Chatlist:React.FC = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "이강인파리생제르망",
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
      message: "아니요 그쪽에서 오셔야죠. 다음분한테 넘기겠습니다.",
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
    {
      id: 4,
      name: "흥부놀부",
      location: "가산동",
      time: "1시간전",
      message: "하하네네 맞습니다 맞고요",
      avatar: "/path/to/avatar1.jpg", // 적절한 이미지 경로 삽입
    },
    {
      id: 5,
      name: "진달래",
      location: "가산동",
      time: "1시간전",
      message: "아니요 그쪽에서 오셔야죠. 다음분한테 넘기겠습니다.",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      id: 6,
      name: "손호준",
      location: "가산동",
      time: "1시간전",
      message: "나찜찜 vs 깡패대장",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      id: 7,
      name: "유재석",
      location: "가산동",
      time: "1시간전",
      message: "하하네네 맞습니다 맞고요",
      avatar: "/path/to/avatar1.jpg", // 적절한 이미지 경로 삽입
    },
    {
      id: 8,
      name: "이수근",
      location: "가산동",
      time: "1시간전",
      message: "아니요 그쪽에서 오셔야죠. 다음분한테 넘기겠습니다.",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      id: 9,
      name: "강호동",
      location: "가산동",
      time: "1시간전",
      message: "나찜찜 vs 깡패대장",
      avatar: "/path/to/avatar1.jpg",
    }
  ]);

  useEffect(() => {
    // 서버에서 대화글 데이터를 가져오는 로직을 추가할 수 있습니다.
    // 예를 들어, axios를 사용하여 데이터를 가져올 수 있습니다.
    // axios.get('/api/chats').then(response => setChats(response.data));
  }, []);

  // 실제 데이터를 가져오는 코드
  // const [chats, setChats] = useState<ChatItem[]>([]);

  // useEffect(() => {
  //   // 서버에서 대화글 데이터를 가져오는 로직
  //   const fetchChats = async () => {
  //     try {
  //       const response = await axios.get('/api/chats'); // 서버의 API 엔드포인트를 호출
  //       setChats(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch chats:', error);
  //     }
  //   };

  //   fetchChats();
  // }, []);

  return (
    <div className="chatlist">
      <ChatlistHeader />
      <div className="chatlist-scroll-container">
        <ChatlistForm chats={chats} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Chatlist