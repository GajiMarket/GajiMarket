import React, { useState } from "react";
import "../../style/Mypage_faq.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  { question: "Q. 동네인증이 안 돼요.", answer: "A. 휴대전화(기기)의 위치 권한이 필요해요. 동네 인증을 하려면 휴대전화(기기)의 위치 권한이 꼭 필요해요. 아래 방법에 따라 ‘가지마켓’ 앱의 위치 권한을 허용해주세요." },
  { question: "Q. 거래 금지 물품에는 어떤 게 있나요?", answer: "A. 거래 금지 물품의 목록은 앱 내에서 확인할 수 있습니다." },
  { question: "Q. 거래를 취소하고 싶어요.", answer: "A. 거래 취소는 거래 상태에 따라 다릅니다. 고객센터에 문의해주세요." },
  { question: "Q. 게시글과 다른 상품(가품)을 받았어요.", answer: "A. 고객센터로 문의하시어 처리 방안을 안내받으세요." },
  { question: "Q. 사기를 당했을 때는 어떻게 해야 하나요?", answer: "A. 사기를 당한 경우 즉시 경찰서에 신고하시고 고객센터에 연락해주세요." },
  { question: "Q. 가까운 동네의 키워드 알림만 받을 수 있나요?", answer: "A. 동네 설정에서 키워드 알림 기능을 활성화하실 수 있습니다." },
  { question: "Q. 내 동네 설정은 어떤 기능인가요?", answer: "A. 내 동네 설정은 원하는 지역의 게시글만 보이게 설정할 수 있는 기능입니다." },
  { question: "Q. 동네는 어떻게 바꾸나요?", answer: "A. 동네 변경은 '내정보 > 동네 설정'에서 가능합니다." },
  { question: "Q. 알림이 오지 않아요!", answer: "A. 알림 설정이 켜져 있는지 확인해주세요. 설정에서 '가지마켓' 앱의 알림을 활성화하세요." },
  { question: "Q. 알림은 어디서 확인하나요?", answer: "A. 알림은 내정보 > 상단의 종 모양의 아이콘을 클릭하면 확인할 수 있습니다." },
];

const MypageFAQ: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]); // 여러 개의 열린 질문 인덱스를 관리

  const toggleAnswer = (index: number) => {
    if (openIndexes.includes(index)) {
      // 이미 열린 질문을 클릭한 경우 닫기
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      // 새로운 질문을 클릭한 경우 추가
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="Mypage_faq">
      <Header />
      <div className="faq-container">
        <div className="faq-title-container">
          <h1 className="faq-title">고객센터</h1>
        </div>
        <div className="faq-subtitle-container">
          <h2 className="faq-subtitle">자주 묻는 질문 (FAQ)</h2>
        </div>
        <ul className="faq-list">
          {faqData.map((item, index) => (
            <li key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleAnswer(index)} // 클릭 이벤트로 토글
              >
                {item.question}
              </div>
              {openIndexes.includes(index) && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer currentPage={4}/>
      <div className="faq-footer-space"></div> {/* Footer 여백 추가 */}
    </div>
  );
};

export default MypageFAQ;
