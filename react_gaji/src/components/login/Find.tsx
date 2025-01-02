import React from 'react'

interface IFindeProps {
    idFind: () => void;
    pwFind: () => void;
    signUp: () => void;
}

const Find: React.FC<IFindeProps> = ({idFind, pwFind, signUp}) => {
  return (
    <div className="find">
      <button className="id_find" type="button" onClick={idFind}>아이디 찾기</button> |
      <button className="password_find" type="button" onClick={pwFind}>비밀번호 찾기</button> |
      <button className="signup_button" type="button" onClick={signUp} >회원가입</button>
    </div>
  )
}

export default Find
