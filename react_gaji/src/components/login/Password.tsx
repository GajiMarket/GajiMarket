import React from 'react'

interface LoginPasswordProps {

    password: string;
    setPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Password:React.FC<LoginPasswordProps> = ({password, setPassword}) => {
  return (
    <div className="login_password">
      <input id="form_password" type="password" placeholder='비밀번호' value={password} onChange={setPassword}  />
    </div>
  )
}

export default Password
