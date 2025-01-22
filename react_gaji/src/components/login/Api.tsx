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
          {import.meta.env.VITE_NODE_ENV === 'production' ? <img src="../dist/img/google_button.png" /> : <img src="../../src/assets/images/google_button.png" />}
          {/* <img src="../../src/assets/images/google_button.png" /> */}
        </button>
      </div>
      <div className="naver">
        <button type="button" className="naver_button" onClick={naverApi}>
        {import.meta.env.VITE_NODE_ENV === 'production' ? <img src="../dist/img/Naver_button.png" /> :  <img src="../../src/assets/images/Naver_button.png" />}
         {/* <img src="../../src/assets/images/Naver_button.png" /> */}
        </button>
      </div>
      <div className="kakao">
        <button type="button" className="kakao_button" onClick={kakaoApi}>
        {import.meta.env.VITE_NODE_ENV === 'production' ? <img src="../dist/img/Kakao_button" /> :  <img src="../../src/assets/images/Kakao_button" />}
          {/* <img src="../../src/assets/images/Kakao_button" /> */}
        </button>
      </div>
    </div>
  )
}

export default Api
