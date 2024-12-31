import React from 'react'

interface LoginIdProps {
    id: string,
    setId: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const Id: React.FC<LoginIdProps> = ({id, setId}) => {
  return (
    <div className="login_id">
        <input id="form_id" placeholder="아이디" type="text" value={id} onChange={setId} />
    </div>
  )
}

export default Id
