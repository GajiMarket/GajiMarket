import React, {useState} from 'react'
import LoginAccess from '../components/login/Login'
import '../style/Login.css'



const Login:React.FC = () => {

  const [formData, setFormData] = useState<Record<string, string>>({
    id: '',
    password: '',
  });

  //  로그인 여부
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);


  return (
    <LoginAccess formData={formData} setFormData={setFormData} loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess}  />
  )
}

export default Login