import React from 'react'

interface LoginPasswordProps {

    password: string;
    setPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Password:React.FC<LoginPasswordProps> = ({password, setPassword}) => {
  return (
    <div className="input-wrapper">
      <input type="password" value={password} onChange={setPassword}  />
    </div>
  )
}

export default Password
