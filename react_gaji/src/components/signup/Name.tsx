import React from 'react'

interface INameProps {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Name:React.FC<INameProps> = ({name, onChange}) => {
  return (
    <div className="name_form">
      <input type="text" value={name} onChange={onChange} />
    </div>
  )
}

export default Name
