import React from 'react'

interface IdProps {

    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    errors?: string;
}

const Id:React.FC<IdProps> = ({id, onChange, onClick, errors}) => {
  return (
    <div className="id">
       <input className="idForm" type="text" placeholder="아이디 입력(6~20자)" value={id} onChange={onChange} />
       <button className="idButton" type="button" onClick={onClick} >중복확인</button>
       {errors && <span>{errors}</span>}
    </div>
  )
}

export default Id
