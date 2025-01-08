import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getAccessToken, kakaoUserInfo } from '../../hooks/useLogin';

interface IKakaoProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const KakaoLoginCOM:React.FC<IKakaoProps> = () => {

  // document.location.toString()을 사용하기 싫다면 아래대로 한다
  // const params = new URL(window.location.href).searchParams;

  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    // 토큰 받아오는 함수
    const tokenKakao = async () => {
      // code 파라미터가 없을시
      if(!code) {
        console.error("tokenKakao: 코드를 찾을 수 없습니다.");
        navigate("/login");

        return;
        
      }

      try {
        //hooks에서 인가코드를 서버로 보내는 로직 사용
        const accessToken = await getAccessToken(code);

        if(accessToken) {
          // 발급받은 토큰으로 사용자 정보를 가져오거나 처리
          
          const userInfo = await kakaoUserInfo(accessToken);
          
          if(userInfo) {

            alert('추가 정보를 입력해주세요')
            // 성공시 추가정보(회원가입) 페이지 이동
            navigate("/signup", {
              state: { 
                email: userInfo.kakao_account.email, 
                nickName: userInfo.properties.nickname
              }
            }); 
          }
          
        } else {

          console.error("토큰 발급 실패");
          navigate("/login");
          
        }
      }catch (error) {
        console.error("카카오 로그인 처리 중 오류");
        navigate("/login");
        
      }

    
    };

    tokenKakao();
  }, [code, navigate]);
  


  return (
    <div className="kakao_loading">
      카카오 로그인 처리중...
    </div>
  )
}

export default KakaoLoginCOM


//https://kapi.kakao.com/v2/user/me 해당 주소로 사용자 정보 받아오기