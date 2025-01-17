import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/Mypage_love.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

import heartFullIcon from "../../assets/icons/heart-full-icon.png";
import heartUnfillIcon from "../../assets/icons/heart-unfill-icon.png";

import axios from "axios";
import loginStore from "../../utils/loginStore.ts";

// Product 타입 정의
interface Product {
    product_id: number;
    title: string;
    sell_price: number;
    location: string;
    product_image: string;
    liked: boolean;
}

const MypageLove: React.FC = () => {
    // 상태 선언
    const [products, setProducts] = useState<Product[]>([]); // 관심목록 데이터
    const { userNo, isAuthenticated } = loginStore(); // 로그인 사용자 정보

    // 관심목록 데이터 로드
    useEffect(() => {
        const fetchMypageLove = async () => {
            try {
                console.log("Fetching wishlist for userNo:", userNo);
                const response = await axios.get(`/Mypage_love/${userNo}`); // API 호출
                console.log("API 응답 데이터:", response.data);
                if (Array.isArray(response.data)) {
                    setProducts(response.data); // 상태 업데이트
                    console.log("현재 products 상태:", response.data);
                } else {
                    console.error("API 응답이 배열이 아닙니다:", response.data);
                    setProducts([]); // 잘못된 응답일 경우 빈 배열 설정
                }
            } catch (error) {
                console.error("관심목록 데이터를 불러오는 중 오류 발생:", error);
                setProducts([]); // 에러 발생 시 빈 배열 설정
            }
        };

        if (isAuthenticated && userNo) {
            fetchMypageLove(); // API 호출
        } else {
            console.error("로그인되지 않았거나 userNo가 설정되지 않았습니다.");
        }
    }, [userNo, isAuthenticated]);

    // 관심목록 항목 삭제
    const toggleLike = async (productId: number) => {
        try {
            console.log("Removing product from wishlist:", productId);
            await axios.delete(`/Mypage_love/${productId}/${userNo}`); // 항목 삭제 API 호출
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.product_id !== productId)
            ); // 상태 업데이트
        } catch (error) {
            console.error("관심목록 항목 삭제 중 오류 발생:", error);
        }
    };

    // 컴포넌트 렌더링
    return (
        <div className="Mypage_love">
            <Header />
            <div className="mypage-love">
                <h1>관심목록</h1>
                {Array.isArray(products) && products.length > 0 ? (
                    <ul className="item-list">
                        {products.map((product) => (
                            <li key={product.product_id} className="item">
                                <Link to={`/productpage/${product.product_id}`} className="item-link">
                                    <img
                                        src={product.product_image || "https://via.placeholder.com/60"}
                                        alt={product.title}
                                        className="item-image"
                                    />
                                    <div className="item-info">
                                        <h2>{product.title}</h2>
                                        <p>{product.location}</p>
                                        <p className="price">{product.sell_price.toLocaleString()}원</p>
                                    </div>
                                </Link>
                                <div className="item-actions">
                                    <button
                                        className="heart-button"
                                        onClick={() => toggleLike(product.product_id)}
                                    >
                                        <img
                                            src={product.liked ? heartUnfillIcon : heartFullIcon}
                                            alt="like"
                                            className="heart-icon"
                                        />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>관심목록이 비어 있습니다.</p>
                )}

        </div>
        <Footer currentPage={4}/>
    </div>
  );
};

export default MypageLove;
