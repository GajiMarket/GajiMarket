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

  const kakaoKey: string = import.meta.env.VITE_KAKAO_KEY;
  // const redirectUri: string = import.meta.env.VITE_REDIRECT_URL;
  const localUri: string = import.meta.env.VITE_REDIRECT_LOCAL_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${localUri}&response_type=code`;
  const navigate = useNavigate();

  // 버튼 클릭하면 해당 페이지로 이동
  const routeMap: {[key: string]: string} = {
    id_find: "/idFind",
    password_find: "/pwFind",
    signup_button:"/signup",
  };

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

    // navigate(kakaoURL);
    if (kakaoKey === '') {
      alert('키가 없습니다.')
    }
    window.location.href = kakaoURL;

  
  } 

  // 클릭하면 해당하는 className의 라우트 주소로 이동
  const moveFind = async (e: React.MouseEvent<HTMLButtonElement>) => {

    const className = e.currentTarget.className;
    const path = routeMap[className];

    if(path) {

      navigate(path);

    } else {
      
      console.warn("해당 라우트는 없는 주소입니다.");
      
    }

  };

  

  return (
    <div className="login_container">
      <div className="login_logo">
        <img src='../../public/img/image 16.png' />
      </div>
    <Id id={formData.id || ''} setId={handleForm('id')} />
    <Password password={formData.password || ''} setPassword={handleForm('password')} />
    <button className="loginButton"  type="button" onClick={handleLogin}>로그인</button>
    <Find idFind={moveFind} pwFind={moveFind} signUp={moveFind} />
    <Api kakaoApi={handleKakao} naverApi={handleTest} googleApi={handleTest}/> 
    </div>
  )
}

export default Login


// gpt보면서 api 적용시키기 보면 이 주석 지우셈
