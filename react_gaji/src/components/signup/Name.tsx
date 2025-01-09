import React from 'react'

interface INameProps {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string;
}

const Name:React.FC<INameProps> = ({name, onChange, errors}) => {
  return (
    <div className="name_form">
      <input type="text" placeholder='이름 입력' value={name} onChange={onChange} />
      {errors && <span className="errorMessage">{errors}</span>}
    </div>
  )
}

export default Name
