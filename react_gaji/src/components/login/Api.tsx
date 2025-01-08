import React from 'react'

interface IApiProps {

    kakaoApi: () => void;
    naverApi: () => void;
    googleApi: () => void;

}

const Api:React.FC<IApiProps> = ({kakaoApi, naverApi, googleApi}) => {
  return (
    <div className="login_api">
      <div className="google">
        <button type="button" className="google_button" onClick={googleApi}>
          <img src="../../public/img/google_button.png" />
        </button>
      </div>
      <div className="naver">
        <button type="button" className="naver_button" onClick={naverApi}>
         <img src="../../public/img/naver_button.png" />
        </button>
      </div>
      <div className="kakao">
        <button type="button" className="kakao_button" onClick={kakaoApi}>
          <img src="../../public/img/Kakao_button.png" />
        </button>
      </div>
    </div>
  )
}

export default Api
