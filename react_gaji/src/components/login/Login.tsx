import React from 'react'
import { useNavigate } from 'react-router-dom'
import Id from './Id'
import Password from './Password'
import Find from './Find'
// import IdFind from './IdFind'
// import PwFind from './PwFind'
import Api from './Api'
import {login} from '../../hooks/useLogin';


interface ILoginProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  loginSuccess: boolean;
  setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  handleTest: () => void;
}

const Login:React.FC<ILoginProps> = ({formData, setFormData, loginSuccess, setLoginSuccess, handleTest}) => {

  const kakaoKey: string = import.meta.env.VITE_KAKAO_LOGIN;
  // const redirectUri: string = import.meta.env.VITE_REDIRECT_URL;
  const localUri: string = import.meta.env.VITE_REDIRECT_LOCAL_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${localUri}&response_type=code`;
  const navigate = useNavigate();

 const handleForm = (data: string) => (e: React.ChangeEvent<HTMLInputElement>) => {

  setFormData ({...formData, [data]: e.target.value});

 }

  const handleLogin = async() => {

    try {
      
      const form = await login(formData);

      if(form?.loginCheck) {

        setLoginSuccess(true);
        
        alert('로그인 성공')
      } else {
        alert('id와 비밀번호를 확인해주세요')
      }
    } catch {

      console.error('로그인 도중 오류 발생');
      
    }
    
  }

  // 누르면 인가 코드 페이지 이동
  const handleKakao = () => {

    navigate(kakaoURL);

  
  } 

  // const handleIdFind = async () => {

  //   try {

      
  //   }
  // }

  

  return (
    <div className="login_container">
      <div className="login_logo">
        <img src='../../public/img/image 16.png' />
      </div>
    <Id id={formData.id || ''} setId={handleForm('id')} />
    <Password password={formData.password || ''} setPassword={handleForm('password')} />
    <button className="loginButton"  type="button" onClick={handleLogin}>로그인</button>
    <Find idFind={handleTest} pwFind={handleTest} signUp={handleTest} />
    <Api kakaoApi={handleKakao} naverApi={handleTest} googleApi={handleTest}/> 
    </div>
  )
}

export default Login
