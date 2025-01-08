import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { useProfile } from '../components/mypage/ProfileContext'; // Context import
import '../style/Mypage_profileedit.css';
import Header from '../components/mypage/Header.tsx';
import Footer from '../components/all/Footer.tsx';
import smileIcon from '../assets/icons/smile-icon.png'; // 기본 이미지

import loginStore from "../utils/loginStore.ts";
import { getUserInfo } from "../hooks/useLogin.ts";

const MypageProfileEdit: React.FC = () => {

      const {isAuthenticated} = loginStore(); 
    const token = loginStore.getState().token;
  
  
    const navigate = useNavigate();
  
    // 로그인 아니면 로그인 페이지로
    useEffect(() => {
      if (!isAuthenticated) {
        console.log('로그인 해야 접근할수있습니다.');
        navigate('/');
        
      }
    })
  
    const [nickname, setNickName] = useState<string>('');
  
    useEffect(() => {
    
        const userInfo = async () => {
          try {
            const info = await getUserInfo(token as string);
      
            if(!info.data.nickname) {
              
              console.log('해당 사용자의 닉네임이 없습니다.');
              
            }
            
            if(info && info.data.nickname !== nickname) {
                
              setNickName(info.data.nickname);
            }
            
          } catch {
    
            console.error('사용자 정보를 불러오는 도중에 오류가 일어났습니다.');
            
          }
        }
    
        userInfo();
    
      }, [nickname])
    

  const [profileImage, setProfileImage] = useState<string>(smileIcon); // 로컬 상태로 대체
  // const [newName, setNewName] = useState<string>('홍길동'); // 로컬 상태로 대체
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string); // Context에 새 이미지 저장
        }
      };
      reader.readAsDataURL(event.target.files[0]);
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
                    value={nickname}
                    onChange={(e) => setNickName(e.target.value)}
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
                    value={nickname}
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