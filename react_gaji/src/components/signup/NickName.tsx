import React from 'react'

interface NickNameProps {

    nickName: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string;
}

const NickName: React.FC<NickNameProps> = ({nickName, onChange, errors}) => {
  return (
    <div className="nickName">
      <input type="text" placeholder="닉네임 입력" value={nickName} onChange={onChange} />
      {errors && <span className="errorMessage">{errors}</span>}
    </div>
  )
}

export default NickName
