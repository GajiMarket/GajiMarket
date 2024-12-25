import React from 'react'
import {emailCheck, emailSend} from '../../hooks/sign';
// import '../../style/Signup.css';

interface EmailProps {

    email: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // setCodeNumber: React.Dispatch<React.SetStateAction< Record<string, string>>>;
    codeNumber: string;
    accessChecked: boolean;
    setAccessChecked: React.Dispatch<React.SetStateAction<boolean>>;
    error?: string;
}


const Email:React.FC<EmailProps> = ({email, error, codeNumber, onChange}) => {

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  //   setEmail(event.target.value);

  // }
  
 
  
  

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

    const send = await emailSend(email);

    if (send) {

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
      <input type="email" placeholder="이메일 입력" value={email} onChange={onChange} />
      <button id="access" type="button" onClick={codeSend}>이메일 인증하기</button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default Email
