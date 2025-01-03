import React, { useState } from "react";
import "../../style/Mypage_keyword_settings.css"; // 스타일 파일
import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";
import searchIcon from "../../assets/icons/search-icon.png";

const MypageKeywordSettings: React.FC = () => {
  const [addedKeywords, setAddedKeywords] = useState<string[]>([
    "가방",
    "텀블러",
    "갤럭시",
    "스타벅스",
    "컴퓨터",
  ]);
  const [recentKeywords, setRecentKeywords] = useState<string[]>([
    "스마트폰",
    "카메라",
    "책상",
    "의자",
    "TV",
    "커피머신",
    "헤드폰",
    "키보드",
    "마우스",
    "노트북",
  ]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([
    "냉장고",
    "세탁기",
    "에어컨",
    "자전거",
    "운동화",
    "드론",
    "테이블",
    "모니터",
    "청소기",
    "스피커",
  ]);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleRemoveKeyword = (
    keyword: string,
    type: "added" | "recent" | "suggested"
  ) => {
    if (type === "added") {
      setAddedKeywords((prevKeywords) =>
        prevKeywords.filter((item) => item !== keyword)
      );
    } else if (type === "recent") {
      setRecentKeywords((prevKeywords) =>
        prevKeywords.filter((item) => item !== keyword)
      );
    } else if (type === "suggested") {
      setSuggestedKeywords((prevKeywords) =>
        prevKeywords.filter((item) => item !== keyword)
      );
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      if (addedKeywords.includes(searchInput.trim())) {
        alert("이미 추가된 키워드입니다.");
        return;
      }
      if (addedKeywords.length < 10) {
        setAddedKeywords((prevKeywords) => [...prevKeywords, searchInput.trim()]);
        setSearchInput(""); // 입력 필드 초기화
      } else {
        alert("최대 10개의 키워드만 추가할 수 있습니다.");
      }
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="keyword-settings-page">
      <Header />
      <div className="keyword-settings-content">
        <div className="keyword-settings-header">
          <h1 className="keyword-settings-title">키워드 알림 설정</h1>
          <div className="keyword-search-box">
            <input
              type="text"
              className="keyword-search-input"
              placeholder="알림 받을 키워드를 입력해주세요."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress} // 엔터키 이벤트 추가
            />
            <button className="keyword-search-btn" onClick={handleSearch}>
              <img src={searchIcon} alt="검색 아이콘" className="keyword-search-icon" />
            </button>
          </div>
        </div>

        <div className="keyword-section">
          <h2 className="keyword-section-title">추가된 키워드 ({addedKeywords.length}/10)</h2>
          <div className="keyword-list">
            {addedKeywords.map((keyword, index) => (
              <span key={index} className="keyword-item">
                {keyword}
                <button
                  className="keyword-remove-btn"
                  onClick={() => handleRemoveKeyword(keyword, "added")}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="keyword-section">
          <h2 className="keyword-section-title">최근 본 키워드</h2>
          <div className="keyword-list">
            {recentKeywords.map((keyword, index) => (
              <span key={index} className="keyword-item">
                {keyword}
                <button
                  className="keyword-remove-btn"
                  onClick={() => handleRemoveKeyword(keyword, "recent")}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="keyword-section">
          <h2 className="keyword-section-title">추천 키워드</h2>
          <div className="keyword-list">
            {suggestedKeywords.map((keyword, index) => (
              <span key={index} className="keyword-item">
                {keyword}
                <button
                  className="keyword-remove-btn"
                  onClick={() => handleRemoveKeyword(keyword, "suggested")}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageKeywordSettings;
