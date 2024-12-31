import React, { useState } from 'react';
import { useProfile } from '../components/mypage/ProfileContext'; // Context import
import '../style/Mypage_profileedit.css';
import Header from '../components/mypage/Header.tsx';
import Footer from '../components/all/Footer.tsx';
import smileIcon from '../assets/icons/smile-icon.png'; // 기본 이미지

const MypageProfileEdit: React.FC = () => {
  const { name, setName, profileImage, setProfileImage } = useProfile(); // Context에서 상태 가져오기
  const [newName, setNewName] = useState<string>(name); // 로컬 상태로 이름 관리
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

  const handleNicknameSave = () => {
    setName(newName); // Context에 이름 저장
    setIsEditingNickname(false);
    alert('닉네임을 변경하였습니다!');
  };

  return (
    <div className="Mypage_profileedit">
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
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
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
                    value={newName}
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
