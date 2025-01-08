import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "../../style/Mypage_terms_detail.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

const MypageTermsDetail: React.FC = () => {
  const navigate = useNavigate();

  // 이전 페이지로 이동하는 함수
  const handleGoBack = () => {
    navigate("/mypage_terms");
  };

  return (
    <div className="MypageTermsDetail">
      <Header />
      <div className="MypageTermsDetail-container">
        {/* 제목에 < 기호 추가 및 이전 페이지 이동 */}
        <h1
          className="MypageTermsDetail-title"
          onClick={handleGoBack} // 클릭 시 이전 페이지로 이동
        >
          &lt; 위치기반서비스 이용 약관
        </h1>
        <div className="MypageTermsDetail-scrollable">
          <section className="MypageTermsDetail-section">
            <h2 className="MypageTermsDetail-subtitle">제1조 (목적)</h2>
            <p className="MypageTermsDetail-text">
              본 약관은 회원(본 약관에 동의한 자를 말합니다. 이하 “회원”이라고 합니다)이 가지마켓(이하 “회사”라고 합니다)가 제공하는 위치기반서비스(이하 “서비스”라고 합니다)를 이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>
          <section className="MypageTermsDetail-section">
            <h2 className="MypageTermsDetail-subtitle">제2조 (약관의 효력 및 변경)</h2>
            <p className="MypageTermsDetail-text">
              본 약관은 서비스를 신청한 고객 또는 개인정보주체가 본 약관에 동의하고 회사가 정한 소정의 절차에 따라 서비스의 이용자로 등록함으로써 효력이 발생합니다.
              <br />
              회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시하거나 기타의 방법으로 공지합니다.
              <br />
              회사는 필요하다고 인정되면 본 약관을 변경할 수 있으며, 회사가 약관을 개정할 경우에는 기존 약관과 개정약관 및 개정약관의 적용일자와 개정사유를 명시하여 현행약관과 함께 그 적용일자 7일 전부터 적용일 이후 상당한 기간 동안 공지합니다. 다만, 개정 내용이 회원에게 불리한 경우에는 그 적용일자 30일 전부터 적용일 이후 상당한 기간 동안 각각 이를 서비스 홈페이지에 게시하여 고지합니다.
              <br />
              회사가 전항에 따라 회원에게 공지하거나 통지하면서 공지 또는 통지ㆍ고지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 불구하고 거부의 의사표시가 없는 경우에는 변경된 약관에 승인한 것으로 봅니다. 회원이 개정약관에 동의하지 않을 경우 회원은 이용계약을 해지할 수 있습니다.
            </p>
          </section>
          <section className="MypageTermsDetail-section">
            <h2 className="MypageTermsDetail-subtitle">제3조 (약관 외 준칙)</h2>
            <p className="MypageTermsDetail-text">
              본 약관에 규정되지 않은 사항에 대해서는 위치정보의 보호 및 이용 등에 관한 법률(이하 “위치정보법”이라고 합니다), 전기통신사업법, 정보통신망 이용촉진 및 보호 등에 관한 법률(이하 “정보통신망법”이라고 합니다), 개인정보보호법 등 관련법령 또는 회사가 정한 서비스의 운영정책 및 규칙 등(이하 “세부지침”이라고 합니다)의 규정에 따릅니다.
            </p>
          </section>
          <section className="MypageTermsDetail-section">
            <h2 className="MypageTermsDetail-subtitle">제4조 (서비스의 가입)</h2>
            <p className="MypageTermsDetail-text">
              회원은 본 약관에 동의하고 서비스에 가입신청함으로써 서비스의 이용자가 될 수 있습니다.
              <br />
              회사는 아래와 같은 경우 회원의 서비스 가입신청에 대한 승낙을 유보할 수 있습니다.
              <br />
              - 실명이 아니거나 다른 사람의 명의를 사용하는 등 허위로 신청하는 경우
              <br />
              - 회원 등록 사항을 빠뜨리거나 잘못 기재하여 신청하는 경우
              <br />
              - 기타 회사가 정한 이용신청 요건을 충족하지 않았을 경우
            </p>
          </section>
          <section className="MypageTermsDetail-section">
            <h2 className="MypageTermsDetail-subtitle">제5조 (서비스의 해지)</h2>
            <p className="MypageTermsDetail-text">
              회원이 서비스 이용을 해지하고자 할 경우 회원은 회사가 정한 절차(서비스 홈페이지 등을 통해 공지합니다)를 통해 서비스 해지를 신청할 수 있으며, 회사는 법령이 정하는 바에 따라 신속히 처리합니다.
            </p>
          </section>
          <section className="MypageTermsDetail-section">
            <h2 className="MypageTermsDetail-subtitle">제6조 (서비스의 내용)</h2>
            <p className="MypageTermsDetail-text">
              서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 단, 회사의 업무 또는 기술상의 이유로 서비스가 일시 중지될 수 있으며, 운영상의 목적으로 회사가 정한 기간에도 서비스는 일시 중지될 수 있습니다. 이때 회사는 사전 또는 사후에 이를 공지합니다.
            </p>
          </section>
          <section className="MypageTermsDetail-section">
            <h2 className="MypageTermsDetail-subtitle">제7조 (서비스 이용 요금)</h2>
            <p className="MypageTermsDetail-text">
              회사가 제공하는 서비스는 기본적으로 유료 또는 무료입니다. 단, 별도의 유료서비스의 경우 해당 서비스에 명시된 요금을 지불하여야 사용 가능합니다.
              <br />
              회사는 유료서비스 이용요금을 회사와 계약한 전자지불업체에서 정한 방법에 의하거나 회사가 정한 청구서에 합산하여 청구할 수 있습니다.
              <br />
              유료서비스 이용을 통하여 결제된 대금에 대한 취소 및 환불은 회사의 결제 이용약관 등 관련법령에 따릅니다.
              <br />
              회원의 개인정보도용 및 결제사기로 인한 환불요청 또는 결제자의 개인정보 요구는 법률이 정한 경우 외에는 거절될 수 있습니다.
            </p>
          </section>
          <section className="MypageTermsDetail-section">
            <h2 className="MypageTermsDetail-subtitle">제8조 (서비스의 이용제한 및 중지)</h2>
            <p className="MypageTermsDetail-text">
              회사는 아래 각 호의 경우에는 회원의 서비스 이용을 제한하거나 중지시킬 수 있습니다.
              <br />
              - 회원이 회사 서비스의 운영을 고의 또는 중과실로 방해하는 경우
              <br />
              - 서비스용 설비 점검, 보수 또는 공사로 인하여 부득이한 경우
              <br />
              - 기타 중대한 사유로 회사가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우
            </p>
          </section>
          {/* <div className="MypageTermsDetail-footer-space"></div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageTermsDetail;
