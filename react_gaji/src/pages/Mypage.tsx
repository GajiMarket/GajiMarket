import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useProfile } from "../components/mypage/ProfileContext"; // Context를 불러옴
import "../style/Mypage.css";
import Header from "../components/mypage/Header.tsx";
import Footer from "../components/all/Footer.tsx";

import smileIcon from "../assets/icons/smile-icon.png";
import heartIcon from "../assets/icons/heart-icon.png";
import clipboardIcon from "../assets/icons/clipboard-icon.png";
import bagIcon from "../assets/icons/bag-icon.png";
import locationIcon from "../assets/icons/location-icon.png";
import gearIcon from "../assets/icons/gear-icon.png";
import keywordIcon from "../assets/icons/keyword-icon.png";
import headsetIcon from "../assets/icons/headset-icon.png";
import termsIcon from "../assets/icons/terms-icon.png";
import arrowIcon from "../assets/icons/arrow.png";

import loginStore from "../utils/loginStore.ts";

import {imagePath} from '../hooks/useMypage.ts' 

const Mypage: React.FC = () => {
  // store와 token 생성
  const {isAuthenticated, logoutMethod, nickname, userNo, profileImage, setImage} = loginStore(); 


  const navigate = useNavigate();

  // 로그인 아니면 로그인 페이지로
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('로그인을 해야 접근할 수 있습니다.');
      navigate('/');
      
    }
  })

 // 프로필 이미지 불러오기
     useEffect(() => {

       const profileDefault = async() => {

 
         try {
           const defaultImage = await imagePath(Number(userNo));

           if(!defaultImage) {
            console.error("이미지 불러오기 실패");

            return;
            
           }
 
           setImage(defaultImage as string);

           return;
 
         } catch(error) {

           console.error("이미지 불러오기 실패 500", error);

           return;
           
         }
       }
 
       profileDefault();
     }, []);

  // const [nickname, setNickName] = useState<string>('');

  // const { name } = useProfile(); // Context에서 이름 가져오기
  // const [name] = useState<string>("홍길동"); // 로컬 상태로 대체

  const handleProfileEdit = () => {
    navigate("/mypage_profileedit"); // 프로필 수정 페이지로 이동
  };

  const handleNavigateToLove = () => {
    navigate("/mypage_love"); // 관심목록 페이지로 이동
  };

  const handleNavigateToSell = () => {
    navigate("/mypage_sell"); // 판매내역 페이지로 이동
  };

  const handleNavigateToBuy = () => {
    navigate("/mypage_buy"); // 구매내역 페이지로 이동
  };

  const handleNavigateToNeighborhoodSettings = () => {
    navigate("/mypage_neighborhood_settings"); // 나의 동네 설정 페이지로 이동
  };

  const handleNavigateToNeighborhoodAuth = () => {
    navigate("/mypage_neighborhood_auth"); // 나의 동네 인증 페이지로 이동
  };

  const handleNavigateToKeywordSettings = () => {
    navigate("/mypage_keyword_settings"); // 키워드 알림 설정 페이지로 이동
  };

  const handleNavigateToFAQ = () => {
    navigate("/mypage_faq"); // FAQ 페이지로 이동
  };

  const handleNavigateToTerms = () => {
    navigate("/mypage_terms"); // 이용 및 약관 페이지로 이동
  };

  // store logoutMethod 추가, 아래 nickname으로 변경
  const handleLogout = () => {

    logoutMethod();
    alert("로그아웃 되었습니다.");
    navigate('/');
  };


  return (
    <div className="mypage">
      <Header />
      <div className="mypage-container">
        <div className="mypage-header-margin-top"></div>
        <div className="profile-section">
          <div className="profile-info">
            <img
              className="smile-icon cursor-pointer"
              src={profileImage as string || smileIcon}
              alt="프로필 이미지"
            />
            <div className="profile-name">{nickname}</div>
          </div>
          <button
            className="profile-edit-btn cursor-pointer"
            onClick={handleProfileEdit}
          >
            프로필 수정
          </button>
        </div>
        <section className="mypage-menu">
          <div className="menu-group">
            <h2>나의 거래</h2>
            <ul>
              <li onClick={handleNavigateToLove}>
                <span className="cursor-pointer">
                  <img src={heartIcon} alt="관심목록" /> 관심목록
                </span>
                <img
                  src={arrowIcon}
                  alt="화살표"
                  className="menu-arrow cursor-pointer"
                />
              </li>
              <li onClick={handleNavigateToSell}>
                <span className="cursor-pointer">
                  <img src={clipboardIcon} alt="판매내역" /> 판매내역
                </span>
                <img
                  src={arrowIcon}
                  alt="화살표"
                  className="menu-arrow cursor-pointer"
                />
              </li>
              <li onClick={handleNavigateToBuy}>
                <span className="cursor-pointer">
                  <img src={bagIcon} alt="구매내역" /> 구매내역
                </span>
                <img
                  src={arrowIcon}
                  alt="화살표"
                  className="menu-arrow cursor-pointer"
                />
              </li>
            </ul>
          </div>
          <div className="menu-group">
            <h2>설정</h2>
            <ul>
              <li onClick={handleNavigateToNeighborhoodSettings}>
                <span className="cursor-pointer">
                  <img src={locationIcon} alt="나의동네설정" /> 나의 동네 설정
                </span>
                <img
                  src={arrowIcon}
                  alt="화살표"
                  className="menu-arrow cursor-pointer"
                />
              </li>
              <li onClick={handleNavigateToNeighborhoodAuth}>
                <span className="cursor-pointer">
                  <img src={gearIcon} alt="나의동네인증" /> 나의 동네 인증
                </span>
                <img
                  src={arrowIcon}
                  alt="화살표"
                  className="menu-arrow cursor-pointer"
                />
              </li>
              <li onClick={handleNavigateToKeywordSettings}>
                <span className="cursor-pointer">
                  <img src={keywordIcon} alt="키워드알림설정" /> 키워드 알림 설정
                </span>
                <img
                  src={arrowIcon}
                  alt="화살표"
                  className="menu-arrow cursor-pointer"
                />
              </li>
            </ul>
          </div>
          <div className="menu-group">
            <h2>고객지원</h2>
            <ul>
              <li onClick={handleNavigateToFAQ}>
                <span className="cursor-pointer">
                  <img src={headsetIcon} alt="고객센터" /> 고객센터
                </span>
                <img
                  src={arrowIcon}
                  alt="화살표"
                  className="menu-arrow cursor-pointer"
                />
              </li>
              <li onClick={handleNavigateToTerms}>
                <span className="cursor-pointer">
                  <img src={termsIcon} alt="이용 및 약관" /> 이용 및 약관
                </span>
                <img
                  src={arrowIcon}
                  alt="화살표"
                  className="menu-arrow cursor-pointer"
                />
              </li>
            </ul>
          </div>
        </section>
        <div className="logout-section">
          <button className="logout-btn cursor-pointer" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
      <Footer currentPage={4}/>
    </div>
  );
};

export default Mypage;