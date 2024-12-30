import React from 'react'

interface LoginIdProps {
    id: string,
    setId: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const Id: React.FC<LoginIdProps> = ({id, setId}) => {
  return (
    <div className="input-wrapper">
        <input type="text" value={id} onChange={setId} />
    </div>
  )
}

export default Id
