import React from 'react'
import { executeDaumPostCode, PostCodeData } from '../../hooks/sign';

interface PostCodeProps {

    postcode: string;
    address: string;
    extraAddress: string;
    detailAddress: string;
    onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
    onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange2: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange3: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange4: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const PostCode: React.FC<PostCodeProps> = ({postcode, address, extraAddress, detailAddress, onClick, onChange1, onChange2, onChange3, onChange4}) => {
  return (
    <div className="postCode">
        <input id="postCodeForm" placeholder="우편번호" type="text" value={postcode} onChange={onChange1} />
        <input type="button" onClick={onClick} value="우편번호 찾기" />
        <input id="address" placeholder='주소' type="text" value={address} onChange={onChange2}  /><br/>
        <input id="detailAddress" type="text" value={detailAddress} onChange={onChange3}/>
        <input id="extraAddress" type="text" value={extraAddress} onChange={onChange4}/>
    </div>
  )
}

export default PostCode
