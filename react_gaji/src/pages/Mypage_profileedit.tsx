import React, { useState } from 'react';
import '../style/Mypage_profileedit.css';
import Header from '../components/mypage/Header.tsx';
import Footer from '../components/all/Footer.tsx';
import smileIcon from '../assets/icons/smile-icon.png';

const MypageProfileEdit: React.FC = () => {
  // State to manage profile image and nickname
  const [profileImage, setProfileImage] = useState<string>(smileIcon);
  const [nickname, setNickname] = useState<string>('홍길동');
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);

  // Handle profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Handle nickname edit
  const handleNicknameEdit = () => {
    setIsEditingNickname(true);
  };

  // Handle nickname save
  const handleNicknameSave = () => {
    setIsEditingNickname(false);
  };

  return (
    <div className="Mypage_profileedit">
      <div className="profileedit-container">
        <Header />
        <div className="profileedit-section">
          {/* Profile Image Section */}
          <div className="profileedit-image-wrapper">
            <div className="profileedit-image">
              <img className="profileedit-smile-icon" src={profileImage} alt="프로필 이미지" />
            </div>
            <div className="profileedit-image-edit-wrapper">
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
