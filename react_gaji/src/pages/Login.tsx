import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import LoginAccess from '../components/login/Login'
import '../style/Login.css'
import loginStore from '../utils/loginStore'



const Login:React.FC = () => {

  const navigate = useNavigate();

  const {isAuthenticated} = loginStore();
useEffect(() =>{
  
  if(isAuthenticated) {
    navigate('/map');
  }

},[])

console.log(import.meta.env.MODE);

  
  const [formData, setFormData] = useState<Record<string, string>>({
    id: '',
    password: '',
  });

  //  로그인 여부


  return (
    <LoginAccess formData={formData} setFormData={setFormData} />
  )
}

export default Login