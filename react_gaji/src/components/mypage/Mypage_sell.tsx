import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/Mypage_sell.css";

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

const MypageSell: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // 초기 상태는 배열
  const { userNo, isAuthenticated } = loginStore();

  // 판매내역 가져오기
  useEffect(() => {
    const fetchSellHistory = async () => {
      try {
        console.log("Fetching sell history for userNo:", userNo); // 디버깅
        const response = await axios.get(`/mypage/sell/${userNo}`);
        console.log("API Response:", response.data); // API 응답 디버깅

        // 응답이 배열인지 확인하고 설정
        if (Array.isArray(response.data)) {
          setItems(response.data); // 배열일 경우만 상태 업데이트
        } else {
          console.error("API 응답이 배열이 아닙니다:", response.data);
          setItems([]); // 배열이 아니면 빈 배열로 설정
        }
      } catch (error) {
        console.error("판매내역을 불러오는 중 오류 발생:", error);
        setItems([]); // 에러 발생 시 빈 배열로 설정
      }
    };

    if (isAuthenticated && userNo) {
      fetchSellHistory();
    }
  }, [userNo, isAuthenticated]);

  // 상태 업데이트
  const toggleStatus = async (product_id: number) => {
    try {
      const newStatus =
        items.find((item) => item.product_id === product_id)?.status ===
        "판매 중"
          ? "거래완료"
          : "판매 중";

      await axios.patch(`/mypage/sell/${product_id}`, { status: newStatus });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.product_id === product_id
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      console.error("상품 상태 업데이트 중 오류 발생:", error);
    }
  };

  return (
    <div className="Mypage_sell">
      <Header />
      <div className="mypage-sell">
        <h1>판매내역</h1>
        {Array.isArray(items) && items.length > 0 ? ( // items가 배열인지 확인
          <ul className="item-list">
            {items.map((item) => (
              <li key={item.product_id} className="item">
                <Link
                  to={`/productpage/${item.product_id}`}
                  className="item-link"
                >
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
                    <p className="price">{item.sell_price.toLocaleString()}원</p>
                  </div>
                </Link>
                <div className="item-actions">
                  <button
                    className={`status-button ${
                      item.status === "판매 중"
                        ? "status-selling"
                        : "status-complete"
                    }`}
                    onClick={() => toggleStatus(item.product_id)}
                  >
                    {item.status}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>판매 내역이 없습니다.</p> // 데이터가 없을 경우 처리
        )}
      </div>
      <Footer currentPage={4} />
    </div>
  );
};

export default MypageSell;
