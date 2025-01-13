import React from 'react'

interface IdProps {

    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    errors?: string;
    isCheckId: boolean;
}

const Id:React.FC<IdProps> = ({id, onChange, onClick, errors, isCheckId}) => {
  return (
    <div className="id">
    <div className="id-input-group">
        <input className="idForm" type="text" placeholder="아이디 입력(6~20자)" value={id} onChange={onChange} />
       <button className="idButton" type="button" onClick={onClick} >중복확인</button>
       
    </div>
       {isCheckId && <span className="checkedId">사용 가능한 아이디 입니다.</span>}
       {errors && <span className="errorMessage">{errors}</span>}
    </div>
  )
}

export default Id
