import React, { useEffect, useState } from "react";
import { useKeywordStore } from "../../utils/keywordStore.ts";
import loginStore from "../../utils/loginStore.ts";
import { sendKeyword } from "../../api/sendKeyWord.ts";
import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";
import searchIcon from "../../assets/icons/search-icon.png";

import "../../style/Mypage_keyword_settings.css"; // 스타일 파일

const MypageKeywordSettings: React.FC = () => {
  // const { addedKeywords, addKeyword, removeKeyword } = useKeywordStore(); // Zustand에서 상태 가져오기
  const { addKeyword, removeKeyword } = useKeywordStore(); // Zustand에서 상태 가져오기
  const { postKeywords, getKeywords } = sendKeyword(); // Axios 훅 가져오기
  const [searchInput, setSearchInput] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]); // 저장된 키워드 + 추가된 키워드
  // const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([
  //   "냉장고",
  //   "세탁기",
  //   "에어컨",
  //   "자전거",
  //   "운동화",
  //   "드론",
  //   "테이블",
  //   "모니터",
  //   "청소기",
  //   "스피커",
  // ]);
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

  console.log(setSuggestedKeywords);
  
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // 저장된 키워드 가져오기
  useEffect(() => {
    const fetchKeywords = async () => {
      setLoading(true);
      try {
        const userNo = loginStore.getState().userNo; // 사용자 번호 가져오기
        const response = await getKeywords(Number(userNo));

        // keyword_name 배열만 상태에 저장
        if (response?.data?.keyword_name) {
          setKeywords(response.data.keyword_name); // 저장된 키워드로 초기화
        }
      } catch (error) {
        console.error("키워드 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
  }, []);

  const handleSearch = () => {
    const trimmedInput = searchInput.trim();
    if (!trimmedInput) return alert("검색어를 입력해주세요.");
    if (keywords.includes(trimmedInput)) return alert("이미 추가된 키워드입니다.");
    if (keywords.length >= 10) return alert("최대 10개의 키워드만 추가할 수 있습니다.");

    // 상태에 키워드 추가
    setKeywords((prevKeywords) => [...prevKeywords, trimmedInput]);
    addKeyword(trimmedInput); // Zustand 상태에도 추가
    setSearchInput("");
  };

  const handleSaveKeywords = async () => {
    setIsSaving(true);
    try {
      await postKeywords(keywords); // 모든 키워드를 서버에 저장
      alert("키워드가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("키워드 저장 실패:", error);
      alert("키워드 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords((prevKeywords) => prevKeywords.filter((item) => item !== keyword));
    removeKeyword(keyword); // Zustand 상태에서도 삭제
  };

  const renderKeywordList = (
    title: string,
    keywords: string[],
    type: "saved" | "suggested"
  ) => (
    <div className="keyword-section">
      <h2 className="keyword-section-title">{title}</h2>
      <ul className="keyword-list">
        {keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <li key={index} className="keyword-item">
              {keyword} {/* 키워드 이름만 렌더링 */}
              {type === "saved" && (
                <button
                  className="keyword-remove-btn"
                  onClick={() => handleRemoveKeyword(keyword)}
                >
                  ✕
                </button>
              )}
            </li>
          ))
        ) : (
          <p>키워드가 없습니다.</p>
        )}
      </ul>
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

          {/* 키워드 섹션 */}
          <div className="keyword-section">
            <div className="keyword-save">
              <h2 className="keyword-section-title">키워드 ({keywords.length}/10)</h2>
              <button onClick={handleSaveKeywords} disabled={isSaving} className="keyword-save-btn">
                {isSaving ? "저장 중..." : "저장"}
              </button>
            </div>
            <div className="keyword-list">
              {renderKeywordList("저장된 키워드", keywords, "saved")}
            </div>
          </div>

          {loading ? (
            <p>로딩 중...</p>
          ) : (
            <>
              {/* 추천 키워드 섹션 */}
              {renderKeywordList("추천 키워드", suggestedKeywords, "suggested")}
            </>
          )}
        </div>
        <div className="mypage-footer-margin-bottom"></div>
      </div>
      <Footer currentPage={4} />
    </div>
  );
};

export default MypageKeywordSettings;