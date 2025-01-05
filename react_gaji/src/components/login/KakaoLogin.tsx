import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../hooks/useLogin';

interface IKakaoProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const KakaoLogin:React.FC<IKakaoProps> = ({formData, setFormData}) => {

  const handleState = (data: string) => (e: React.ChangeEvent<HTMLInputElement>) => {

    //data는 무조건 기본타입이나 any
    setFormData({...formData, [data]:e.target.value});

  }

  
  const navigate = useNavigate();

  const tokenKakao = async () => {

    useEffect(() => {
      // const params = new URLSearchParams(window.location.search);
      // const code = params.get("code");
  
      // if (code) {
        
      //   const token = 
      // }
    })
  }


  return (
    <div className="kakao_loading">
      카카오 로그인 처리중...
    </div>
  )
}

export default KakaoLogin


//인가코드 페이지에서 토큰을 여기로 받아오면 어떻게 처리할지 생각해봐봐