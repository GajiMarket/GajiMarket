import React, {useState} from 'react'
import LoginAccess from '../components/login/Login'



const Login:React.FC = () => {

  const [formData, setFormData] = useState<Record<string, string>>({
    id: '',
    password: '',
  });

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  return (
    <LoginAccess formData={formData} setFormData={setFormData} loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess}  />
  )
}

export default Login