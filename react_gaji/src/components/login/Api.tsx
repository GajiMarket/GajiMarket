import React from 'react'

interface IApiProps {

    kakaoApi: () => void;
    naverApi: () => void;
    googleApi: () => void;

}

const Api:React.FC<IApiProps> = ({kakaoApi, naverApi, googleApi}) => {
  return (
    <div className="login_api">
      <div className="kakao">
        <button type="button" className="kakao_button" onClick={kakaoApi}></button>
      </div>
      <div className="naver">
        <button type="button" className="naver_button" onClick={naverApi}></button>
      </div>
      <div className="google">
        <button type="button" className="google_button" onClick={googleApi}></button>
      </div>
    </div>
  )
}

export default Api
