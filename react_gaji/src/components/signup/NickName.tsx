import React from 'react'

interface NickNameProps {

    nickName: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NickName: React.FC<NickNameProps> = ({nickName, onChange}) => {
  return (
    <div className="nickName">
      <input type="text" placeholder="닉네임 입력" value={nickName} onChange={onChange} />
    </div>
  )
}

export default NickName
