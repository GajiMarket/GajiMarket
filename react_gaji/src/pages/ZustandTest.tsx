import React, {useState, useEffect} from 'react'
import store from '../utils/store'
import loginStore from '../utils/loginStore'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../hooks/useLogin'


const ZustandTest: React.FC = () => {

    const { count, increase, decrease, reset} = store();
    // store에서 사용할 필드 생성
    const { isAuthenticated, logoutMethod} = loginStore();
    // token값 생성
    const token = loginStore.getState().token;
    const [nickname ,setNickName] = useState<string | ''>('');
    const navigate = useNavigate();

    // const handleChange = (value: string) => {
    //   setName(value);
    // }

    // 로그인 상태가 아니면 로그인 페이지로

    // useEffect(() => {
      
      
    // },[isAuthenticated, navigate])

    useEffect(() => {


        if(!isAuthenticated) {
          
          alert('로그인이 필요합니다.');
          navigate('/login');
          return;
        }
      

      // 현재 loginStore에 따라 사용자 이름 변경 
      const getTokenInfo = async () => {

        try {

          // 토큰 값에서 사용자 정보(nickname) 추출후 값 반환
          const info = await getUserInfo(token as string)
          console.log(info.data.nickname);
          

          if(!info) {
            console.log('사용자 정보가 없습니다.');

          }

          if(info && info.data.nickname !== nickname) {
            
            setNickName(info.data.nickname);
          }
          
          
        } catch {
          console.error('함수 실행중 오류');
          
        }
      }

      getTokenInfo();
    },[nickname])

    // useEffect(() => {

    //   if (nickname) {
        
    //     alert('사용자 정보 전송 완료')
    //   }
      
    // }, [nickname]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
      <button onClick={reset}>리셋</button>
      
    {isAuthenticated ? (
      <div>
        <p>로그인 상태</p>
        <div>{nickname}</div>
        <button onClick={logoutMethod}>로그아웃</button>
      </div>
    ) : <p>로그인하지 않았습니다.</p>}
    </div>
  )
}

export default ZustandTest
