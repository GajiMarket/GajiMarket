import React from 'react'

interface PhoneProps {
    phone: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string;
}

const Phone: React.FC<PhoneProps> = ({phone, onChange, errors}) => {
  return (
      <div className="phone">
        <input className="phoneForm" type="text" placeholder="전화번호 입력" value={phone} onChange={onChange} />{errors && <span>{errors}</span>}
      </div>
  )
}

export default Phone
