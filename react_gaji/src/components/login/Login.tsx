import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Id from './Id'
import Password from './Password'
import Find from './Find'
// import IdFind from './IdFind'
// import PwFind from './PwFind'
import Api from './Api'
import {login, tokenValidate} from '../../hooks/useLogin';
import loginStore from '../../utils/loginStore';


interface ILoginProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  loginSuccess: boolean;
  setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  handleGoogle: () => void;
  handleNaver: () => void;
}

const Login:React.FC<ILoginProps> = ({formData, setFormData, loginSuccess, setLoginSuccess, handleGoogle, handleNaver}) => {

  const kakaoKey: string = import.meta.env.VITE_KAKAO_KEY;
  // const redirectUri: string = import.meta.env.VITE_REDIRECT_URL;
  const localUri: string = import.meta.env.VITE_REDIRECT_LOCAL_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${localUri}&response_type=code`;
  const navigate = useNavigate();

  const { loginMethod } = loginStore(); 

  // zustand 상태에서 필요한 값, 메서드 가져오기
  // const isAuthenticated = loginStore((state) => state.isAuthenticated);
  // const token = loginStore((state) => state.token);
  // const setFormDataStore = loginStore((state) => state.setFormData);
  // const loginMethod = loginStore((state) => state.loginMethod);

  // 버튼 클릭하면 해당 페이지로 이동
  const routeMap: {[key: string]: string} = {
    id_find: "/idFind",
    password_find: "/pwFind",
    signup_button:"/signup",
  };

 const handleForm = (data: string) => (e: React.ChangeEvent<HTMLInputElement>) => {

  setFormData ({...formData, [data]: e.target.value});

 }

//  useEffect(() => {

//   // 토큰 검증
//   const authValidate = async () => {

//     try {
//       const token = await tokenValidate();

//       if (!token) {

//         alert("검증하는데 실패 했습니다.");

//       }

//       return setLoginSuccess(true);

//     } catch (error) {
//       console.error("검증 처리중 오류 발생했습니다.");
      
//       return setLoginSuccess(false);
      
//     }
//   };

//   authValidate();

//  }, []);


  const handleLogin = async() => {

    try {
      
      const form = await login(formData);

      if(form.isChecked) {

        loginMethod(form.data);
        setLoginSuccess(true);
      
        
        alert('로그인 성공')

        navigate("/");

      } else {

        console.log(form.isChecked);
        
        alert('id와 비밀번호를 확인해주세요')
      }
    } catch {
      

      alert('없는 사용자 입니다.')

      throw new Error('로그인 도중 오류 발생');


      
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
    <Api kakaoApi={handleKakao} naverApi={handleNaver} googleApi={handleGoogle}/> 
    </div>
  )
}

export default Login


// gpt보면서 api 적용시키기 보면 이 주석 지우셈
