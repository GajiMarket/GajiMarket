import React, { useState } from "react";
import { useKeywordStore } from "../../utils/keywordStore.ts";
import { sendKeyword } from "../../api/sendKeyWord.ts";
import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";
import searchIcon from "../../assets/icons/search-icon.png";

import "../../style/Mypage_keyword_settings.css"; // 스타일 파일

const MypageKeywordSettings: React.FC = () => {
  const { addedKeywords, addKeyword, removeKeyword } = useKeywordStore(); // Zustand에서 상태 가져오기
  const { postKeywords } = sendKeyword(); // Axios 훅 가져오기
  const [searchInput, setSearchInput] = useState<string>("");
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
  const [isSaving, setIsSaving] = useState(false);

  const handleSearch = () => {
    const trimmedInput = searchInput.trim();
    if (!trimmedInput) return alert("검색어를 입력해주세요.");
    if (addedKeywords.includes(trimmedInput)) return alert("이미 추가된 키워드입니다.");
    if (addedKeywords.length >= 10) return alert("최대 10개의 키워드만 추가할 수 있습니다.");
    addKeyword(trimmedInput);
    setSearchInput("");
  };

  const handleSaveKeywords = async () => {
    setIsSaving(true);
    try {
      await postKeywords(addedKeywords);
      alert("키워드가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("키워드 저장 실패:", error);
      alert("키워드 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveKeyword = (keyword: string, type: "added" | "recent" | "suggested") => {
    const updateState = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
      setter((prevKeywords) => prevKeywords.filter((item) => item !== keyword));

    if (type === "added") removeKeyword(keyword);
    if (type === "recent") updateState(setRecentKeywords);
    if (type === "suggested") updateState(setSuggestedKeywords);
  };

  const renderKeywordList = (
    title: string,
    keywords: string[],
    type: "added" | "recent" | "suggested"
  ) => (
    <div className="keyword-section">
      <h2 className="keyword-section-title">{title}</h2>
      <div className="keyword-list">
        {keywords.map((keyword, index) => (
          <span key={index} className="keyword-item">
            {keyword}
            <button
              className="keyword-remove-btn"
              onClick={() => handleRemoveKeyword(keyword, type)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="keyword-settings-page">
      <Header />
      <div className="keyword-settings-container">
        <div className="mypage-header-margin-top"></div>
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
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="keyword-search-btn" onClick={handleSearch}>
                <img src={searchIcon} alt="검색 아이콘" className="keyword-search-icon" />
              </button>
            </div>
          </div>

          {/* 추가된 키워드 섹션 */}
          <div className="keyword-section">
            <div className="keyword-save">
              <h2 className="keyword-section-title">추가된 키워드 ({addedKeywords.length}/10)</h2>
              <button onClick={handleSaveKeywords} disabled={isSaving}>
                {isSaving ? "저장 중..." : "저장"}
              </button>
            </div>
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
            
          {/* 최근 본 키워드 섹션 */}
          {renderKeywordList("최근 본 키워드", recentKeywords, "recent")}

          {/* 추천 키워드 섹션 */}
          {renderKeywordList("추천 키워드", suggestedKeywords, "suggested")}
        </div>
        <div className="mypage-footer-margin-bottom"></div>
      </div>
      <Footer currentPage={4} />
    </div>
  );
};

export default MypageKeywordSettings;