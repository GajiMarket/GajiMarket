import React from 'react'
import {emailCheck, emailSend} from '../../hooks/sign';
// import '../../style/Signup.css';

interface EmailProps {

    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setCodeNumber: React.Dispatch<React.SetStateAction<number>>;
    codeNumber: number;
    error?: string;
}


const Email:React.FC<EmailProps> = ({value, onChange, error, codeNumber, setCodeNumber}) => {
  
  

const codeCheck = async () => {

  try {

    const code = await emailCheck(codeNumber);

    if (code) {

      alert('인증번호가 일치합니다.');
    } else {

      alert('인증번호가 일치하지 않습니다.');
    }

    return code;

  } catch(error) {

    console.error('인증 도중에 오류가 발생했습니다.', error);

    throw error;
    
  }
}

const codeSend = async () => {

  try {

    const email = await emailSend(value);

    if (email) {

      alert('인증번호가 전송되었습니다.');

    } else {

      alert('인증번호 전송에 실패했습니다.');
    }

  } catch(error) {

    console.error('전송 도중 오류가 발생했습니다', error);

    throw error;
    
  }
}


  return (
    <div>
      <input type="email" placeholder="이메일 입력" value={value} onChange={onChange} />
      <button id="access" type="button" onClick={codeSend}>이메일 인증하기</button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default Email
