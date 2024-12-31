import React, { createContext, useContext, useState } from 'react';
import smileIcon from '../../assets/icons/smile-icon.png'; // 기본 이미지

interface ProfileContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>('홍길동'); // 초기 이름
  const [profileImage, setProfileImage] = useState<string>(smileIcon); // 기본 이미지

  return (
    <ProfileContext.Provider value={{ name, setName, profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
