import React from 'react'

interface PasswordProps {
    password: string;
    passwordCheck: string;
    onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange2: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string;
}

const Password: React.FC<PasswordProps> = ({password, passwordCheck, onChange1, onChange2, errors}) => {
  return (
    <div className="pw">
       <input className="password" type="password" placeholder="비밀번호 입력(문자, 숫자 ,특수문자 포함 8~20자)" value={password} onChange={onChange1} />
       <input className="passwordCheck" type="password" placeholder="비밀번호 재입력" value={passwordCheck} onChange={onChange2} />
       {errors && <span>{errors}</span>}
    </div>
    
  )
}

export default Password
