import React from 'react'

interface IIdFindProps {
  userName: string;
  setUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userEmail: string;
  setUserEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accessCode: () => void;
}

const IdFind: React.FC<IIdFindProps> = ({ userName, setUserEmail, setUserName, userEmail, accessCode }) => {
  return (
    <div className="id_find">
      <h1>회원정보에 등록한 휴대전화로 인증</h1>
      <div className="find_name">이름</div>
      <input type="text" value={userName} onChange={setUserName} />
      <div className="find_email">이메일</div>
      <div className="access_email_find">
        <input type="email" value={userEmail} onChange={setUserEmail} />
        <button type="button" onClick={accessCode}></button>
      </div>
    </div>
  )
}

export default IdFind
