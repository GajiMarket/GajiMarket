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
  const [items, setItems] = useState<Item[]>([]);
  const { userNo, isAuthenticated } = loginStore();

  // 구매내역 가져오기
  useEffect(() => {
    const fetchBuyHistory = async () => {
      try {
        const response = await axios.get(`/mypage_buy/${userNo}`);
        setItems(response.data);
      } catch (error) {
        console.error("구매내역을 불러오는 중 오류 발생:", error);
      }
    };

    if (isAuthenticated && userNo) {
      fetchBuyHistory();
    }
  }, [userNo, isAuthenticated]);

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
                  <p>{item.location} · {item.created_at}</p>
                  <p className="price">{item.sell_price.toLocaleString()}원</p>
                </div>
              </Link>
              <div className="item-actions">
                <button className="status-button">{item.status}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer currentPage={4} />
    </div>
  );
};

export default MypageBuy;
