import React from 'react'

interface PostCodeProps {

    postcode: string;
    address: string;
    extraAddress: string;
    detailAddress: string;
    handleClick: () => void;
    postChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    detailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    extraChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const PostCode: React.FC<PostCodeProps> = ({postcode, address, extraAddress, detailAddress, handleClick, postChange, addressChange, detailChange, extraChange}) => {
  return (
    <div className="postCode">
        <input id="postCodeForm" placeholder="우편번호" type="text" value={postcode} onChange={postChange} />
        <input type="button" onClick={handleClick} value="우편번호 찾기" />
        <input id="address" placeholder='주소' type="text" value={address} onChange={addressChange}  /><br/>
        <input id="detailAddress" type="text" value={detailAddress} onChange={detailChange}/>
        <input id="extraAddress" type="text" value={extraAddress} onChange={extraChange}/>
    </div>
  )
}

export default PostCode