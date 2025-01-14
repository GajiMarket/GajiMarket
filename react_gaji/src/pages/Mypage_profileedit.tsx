import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { useProfile } from '../components/mypage/ProfileContext'; // Context import
import '../style/Mypage_profileedit.css';
import Header from '../components/mypage/Header.tsx';
import Footer from '../components/all/Footer.tsx';
import smileIcon from '../assets/icons/smile-icon.png'; // 기본 이미지

import loginStore from "../utils/loginStore.ts";
// import { getUserInfo } from "../hooks/useLogin.ts";
import { imageUpload } from '../hooks/useMypage.ts';

const MypageProfileEdit: React.FC = () => {

      const {isAuthenticated, nickname, setNickname, userNo, profileImage, setImage} = loginStore(); 
  
  
    const navigate = useNavigate();
  
    // 로그인 아니면 로그인 페이지로
    useEffect(() => {
      if (!isAuthenticated) {
        console.log('로그인 해야 접근할수있습니다.');
        navigate('/');
        
      }
    })
  
    

    

  // const [profileImage, setProfileImage] = useState<string>(smileIcon); // 로컬 상태로 대체
  // const [newName, setNewName] = useState<string>('홍길동'); // 로컬 상태로 대체
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);

  // 이미지 업로드
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // const reader = new FileReader();
      const file = event.target.files[0];

      // const originalName = file.name.split('\\').slice(0, -1).join('.');
      // const fileExtension = originalName.split('.').pop(); // '\\'로 split후 마지막 요소
      // const fileName = `${originalName}.${fileExtension}`;

      // const originName = file.name.split('.').slice(0, -1);

      //확장자만 남긴다.
      const extension = file.name.split('.').pop();
      //지금 날짜와 확장자를 저장
      const imageName = `${Date.now()}.${extension}`;

      // console.log("지정한 fileName:", fileName);
      // console.log("지정한 file:", file);

      console.log("지정한 fileName:", imageName);
      // console.log("지정한 file:", file);

      


      //===========================유경이 한거 주석처리========================

      // reader.onload = () => {
      //   if (reader.result) {
      //     setProfileImage(reader.result as string); // Context에 새 이미지 저장
      //   }
      // };
      // reader.readAsDataURL(file);

      // ====================================================================
      
      const formData = new FormData();
      //키, input type이 file인 경우에만
      // formData.append('profileImage', file, fileName);
      formData.append('profileImage', file, imageName);
      formData.append('userNo', userNo as string);


      try {

        const response = await imageUpload(formData);

        console.log('이미지 업로드 성공:', response);

        setImage(response as string);
        
      } catch (error) {

        console.error('이미지 업로드 실패:', error);
        
      }
    }
  };

  const handleNicknameEdit = () => {
    setIsEditingNickname(true);
  };

  // const handleNicknameSave = () => {
  //   setName(newName); // Context에 이름 저장
  //   setIsEditingNickname(false);
  //   alert('닉네임을 변경하였습니다!');
  // };


  const handleNicknameSave = () => {
    alert(`닉네임이 '${nickname}'로 변경되었습니다!`);
    setIsEditingNickname(false);
  };

  return (
    <div className="mypage_profileedit">
      <div className="profileedit-container">
        <Header />
        <div className="profileedit-section">
          <h1 className="profileedit-title">프로필 수정</h1> {/* 프로필 수정 문구 추가 */}
          {/* Profile Image Section */}
          <div className="profileedit-image-wrapper">
            <img
              className="profileedit-smile-icon"
              src={profileImage || smileIcon} // 기본 이미지 또는 변경된 이미지 표시
              alt="프로필 이미지"
            />
            <label htmlFor="profile-image-upload" className="profileedit-image-edit-btn">
              이미지 변경
            </label>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>

          {/* Nickname Edit Section */}
          <div className="profileedit-nickname-section">
            <label htmlFor="nickname" className="profileedit-nickname-label">닉네임</label>
            <div className="profileedit-nickname-input-group">
              {isEditingNickname ? (
                <>
                  <input
                    type="text"
                    id="nickname"
                    value={nickname as string}
                    onChange={(e) => setNickname(e.target.value)}
                    className="profileedit-nickname-input"
                  />
                  <button
                    className="profileedit-nickname-save-btn"
                    onClick={handleNicknameSave}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    id="nickname"
                    value={nickname as string}
                    readOnly
                    className="profileedit-nickname-input"
                  />
                  <button
                    className="profileedit-nickname-edit-btn"
                    onClick={handleNicknameEdit}
                  >
                    닉네임 변경
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageProfileEdit;