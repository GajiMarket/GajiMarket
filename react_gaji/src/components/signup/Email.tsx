import React, {useEffect} from 'react'
import '../../style/Signup.css';

interface EmailProps {

    email: string;
    onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange2: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // setCodeNumber: React.Dispatch<React.SetStateAction< Record<string, string>>>;
    codeNumber: string;
    codeChecked: boolean;
    accessChecked: boolean;
    errors?: string;
    onClick1: () => void;
    onClick2: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


const Email:React.FC<EmailProps> = ({email, errors, codeNumber, onChange1, onChange2, onClick1, onClick2, accessChecked, codeChecked}) => {

 useEffect(() => {
  console.log(codeChecked);
 },[]);
  

  return (
    <div className="emailForm">
      <div className="email-input-group">
        <input className="email" type="email" placeholder="이메일 입력" value={email} onChange={onChange1} />
        <button id="access" type="button" onClick={onClick1}>인증하기</button>
      </div>
        {codeChecked && <div className="code-input-group">
                          <input className="codeAccess" type="text" placeholder="인증번호 입력" value={codeNumber} onChange={onChange2} />
                          <button id="codeCheck" type="button" onClick={onClick2}>인증번호 확인</button>
                        </div>
          }
          {/* <div className="code-input-group">
                          <input className="codeAccess" type="text" placeholder="인증번호 입력" value={codeNumber} onChange={onChange2} />
                          <button id="codeCheck" type="button" onClick={onClick2}>인증번호 확인</button> */}
       
        {accessChecked &&<div className="validateCode">인증이 완료 되었습니다.</div>}
      {errors && <span className="errorMessage">{errors}</span>}
      {/* </div> */}
    </div>
  );
};

export default Email
