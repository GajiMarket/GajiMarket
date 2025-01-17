import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/Mypage_buy.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";
import axios from "axios";
import loginStore from "../../utils/loginStore.ts";

interface Item {
  product_id: number;
  title: string;
  sell_price: number;
  location: string;
  created_at: string;
  status: string;
  image: string;
}

const MypageBuy: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // 구매 내역 상태
  const { userNo, isAuthenticated } = loginStore(); // 로그인 상태와 사용자 번호 가져오기

  // 구매 내역 가져오기
  useEffect(() => {
    const fetchBuyHistory = async () => {
      try {
        console.log("userNo 값:", userNo); // userNo 값 확인
        const response = await axios.get(`http://localhost:3000/api/mypage_buy/${userNo}`); // 백엔드 API 주소
        console.log("API 응답 데이터:", response.data); // 응답 데이터 확인

        if (Array.isArray(response.data)) {
          setItems(response.data); // 상태 업데이트
        } else {
          console.error("API 응답이 배열이 아닙니다:", response.data);
          setItems([]); // 빈 배열로 초기화
        }
      } catch (error) {
        console.error("구매내역을 불러오는 중 오류 발생:", error);
        setItems([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    if (isAuthenticated && userNo) {
      fetchBuyHistory(); // API 호출
    } else {
      console.error("사용자가 로그인하지 않았거나 userNo가 없습니다.");
    }
  }, [userNo, isAuthenticated]); // userNo와 isAuthenticated 변경 시 재호출

  return (
    <div className="Mypage_buy">
      <Header />
      <div className="mypage-buy">
        <h1>구매내역</h1>
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.product_id} className="item">
              <Link to={`/productpage/${item.product_id}`} className="item-link">
                <img
                  src={item.image || "https://via.placeholder.com/60"}
                  alt={item.title}
                  className="item-image"
                />
                <div className="item-info">
                  <h2>{item.title}</h2>
                  <p>
                    {item.location} · {item.created_at}
                  </p>
                  <p className="price">
                    {item.sell_price.toLocaleString()}원
                  </p>
                </div>
              </Link>
              <div className="item-actions">
                <button className="status-button">{item.status}</button>
              </div>
            </li>
          ))}
        </ul>
        {items.length === 0 && <p>구매내역이 없습니다.</p>} {/* 빈 데이터 표시 */}
      </div>
      <Footer currentPage={4} /> {/* Footer는 수정하지 않음 */}
    </div>
  );
};

export default MypageBuy;
