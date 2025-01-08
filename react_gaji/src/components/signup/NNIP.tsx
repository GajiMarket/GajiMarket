import React from 'react'
import { useNavigate } from 'react-router-dom';
import { validatePassword, checkId, signUp, validatePhone, validateEmail, emailCheck, emailSend, executeDaumPostCode} from '../../hooks/useSign';
import Email from './Email';
import NickName from './NickName';
import Id from './Id';
import Password from './Password';
import Phone from './Phone';
import PostCode from './PostCode';
import BirthDay from './BirthDay';
import Name from './Name';



/*package.json에 --host 입력하면 네트워크 주소나옴 */

interface SignupFormProps {

  //회원가입 데이터
  formData: Record<string, string>;
  //회원가입 입력한 데이터
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSuccess: () => void;
  codeNumber: string;
  setCodeNumber: React.Dispatch<React.SetStateAction<string>>;
  inputCode: string;
  setInputCode: React.Dispatch<React.SetStateAction<string>>;
  isCheckId: boolean;
  setIsCheckedId: React.Dispatch<React.SetStateAction<boolean>>;
  accessChecked: boolean;
  setAccessChecked: React.Dispatch<React.SetStateAction<boolean>>;
  codeNumberChecked: boolean;
  setCodeNumberChecked: React.Dispatch<React.SetStateAction<boolean>>;
  // selectData: Record<string, string>;
  // setSelectData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  // postCodeData: PostCodeData;
  
}



export const NNIP:React.FC<SignupFormProps> = ({formData, setFormData, isCheckId, setIsCheckedId, accessChecked, setAccessChecked, codeNumberChecked, setCodeNumberChecked, codeNumber, setCodeNumber, errors, setErrors, inputCode, setInputCode}) => {

  // const [errors, setErrors] = React.useState<Record<string, string>>({});
  // const [isIdChecked, setIsIdChecked] = React.useState<boolean>(false);



const navigate= useNavigate();



  //input 태그에서 값을 입력하면 해당 매개변수에 담긴다.
  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {

     //기존 formData 값에 field[]값 추가
     setFormData({...formData, [field]: event.target.value});

  };


  const handleBirthDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const { name, value} = event.target;
    // const [name, value] = {event.target.name, event.target.value};
    setFormData({...formData, [name]: value});
  }

  // const handleKakaoPost = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {

  //   setPostCodeData({...postCodeData, [field]: event?.target.value})
  // }

  const handlePostCode = async () => {

    try {

      const postcode = await executeDaumPostCode();

      if(postcode) {


        setFormData({
          zonecode: postcode.zonecode,
          address: postcode.address,
          extraAddress: postcode.extraAddress,
        });
        console.log('성공');
        

        
      } else {

        console.log('불러오기 실패패');
        
      }
    } catch(error) {

      console.error('실행 에러', error);
      throw error;
      
    }




    
  }



  //유효성 검증, 아이디 중복
  const validateForm = (): boolean => {

    const newErrors: Record<string, string> = {};

    if (validateEmail(formData.email)) newErrors.email = validateEmail(formData.email) as string;

    if (validatePassword(formData.password)) newErrors.password = validatePassword(formData.password) as string;

    if (formData.password !== formData.passwordCheck) newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';

    if (validatePhone(formData.phone)) newErrors.phone = validatePhone(formData.phone) as string;

    // try {
      
    //   const isDuplicated = await checkId(formData.id);

    //   if (isDuplicated) {

    //     alert('아이디 중복');
      
    //   } else {
  
    //     newErrors.id = '';
  
    //   }

    // } catch(error) {

    //   console.error('아이디 중복 체크 실패', error);
    //   alert('아이디 중복 체크 중 오류가 발생했습니다.');
      
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // 이메일 인증번호 발송
  const codeSend = async () => {

    try {
  
      const send = await emailSend(formData.email);
      
  
      if (send?.success) {
        //이메일 발송시 같이 보내진 코드
        setCodeNumber(String(send.code))

        setCodeNumberChecked(true)

        console.log('현재 코드 번호:', codeNumber);
        
  
        alert('인증번호가 전송되었습니다.');
  
      } else {
  

        setCodeNumberChecked(false)
        alert('인증번호 전송에 실패했습니다.');
      }
  
    } catch(error) {
  
      console.log('현재 이메일:', formData.email);
      
      console.error('전송 도중 오류가 발생했습니다', error);
      throw error;
      
    }
  }
   
  

  // 발송된 인증번호와 비교하여 일치하는지 확인
  const codeCheck = async () => {

    try {

      const code = await emailCheck(inputCode);
      

      if (code.codeNum === codeNumber) {
        setAccessChecked(true)
        alert('인증번호가 일치합니다.');

      } else {
        setAccessChecked(false)
        alert('인증번호가 일치하지 않습니다.');

      }
      return setInputCode(code.codeNum);;

    } catch(error) {
      console.error('인증 도중에 오류가 발생했습니다.', error);
      throw error;
      
    }
  }
  const handleIdCheck = async () => {

    try {
      
      const isDuplicated = await checkId(formData.id);

      console.log("isDuplicated값:", isDuplicated);
      

      if(!isDuplicated) {

        setIsCheckedId(false);
        
        console.log("isDuplicated값:", isDuplicated);

        setErrors((prev) => ({...prev, id: '중복된 아이디 입니다.'}));

      } else {

        setErrors((prev) => ({...prev, id: ''}));

        setIsCheckedId(true);

        alert('아이디 사용가능');
      }

    } catch(error) {

      console.error('아이디 중복 체크 실패', error);
      alert('아이디 중복 체크 중 오류가 발생했습니다.');
      
    }
  }

  

  //form 전송
  const handleSubmit = async () => {


    if(!validateForm()) {
      
      alert('유효성검사를 실행해 주세요');

    }

    if(!accessChecked) {

      alert('이메일 인증을 해주세요');

    }

    if(!handleIdCheck) {

      alert('아이디 중복 체크를 해주세요');
    }

    try {

      const response = await signUp(formData);


    } catch {

      alert('전송실패 다시 시도해주세요');
    }

  };

  
  return (
    
    <div className="signUpForm">
      <h1 className="sign_title">회원가입</h1>
        <div className="sub_title">회원이 되어 다양한 혜택을 경험해 보세요!</div>
            <h3 className="sub_Header">이름</h3>
            <Name name={formData.name || ''} onChange={handleChange('name')} />
            <h3 className="sub_Header">닉네임</h3>
            <NickName nickName={formData.nickName || ''} onChange={handleChange('nickName')} />
            <h3 className="sub_Header">아이디</h3>
            <Id id={formData.id || ''} onChange={handleChange('id')} onClick={handleIdCheck} isCheckId={isCheckId} errors={errors.id}  />
            <h3 className="sub_Header">비밀번호</h3>
            <Password password={formData.password || ''} passwordCheck={formData.passwordCheck || ''} onChange1={handleChange('password')} onChange2={handleChange('passwordCheck')} errors={errors.password} />
            <h3 className="sub_Header">이메일</h3>
            <Email email={formData.email || ''} onChange1={handleChange('email')} onClick1={codeSend} onChange2={(e) => setInputCode(e.target.value)} codeNumber={inputCode} onClick2={codeCheck} codeChecked={codeNumberChecked} accessChecked={accessChecked} errors={errors.email} />
            <h3 className="sub_Header">휴대폰</h3>
            <Phone phone={formData.phone || ''} onChange={handleChange('phone')} />
            <h3 className="sub_Header">생년월일</h3>
            <BirthDay BirthDate={{year:formData.year, month:formData.month, day:formData.day}} handleChange={handleBirthDateChange} />
            <h3 className="sub_Header">주소</h3>
            <PostCode postcode={formData.zonecode || ''} address={formData.address || ''} detailAddress={formData.detailAddress || ''} extraAddress={formData.extraAddress || ''} postChange={handleChange('zonecode')} addressChange={handleChange('address')} detailChange={handleChange('detailAddress')} extraChange={handleChange('extraAddress')} handleClick={handlePostCode}/>
        <button className="formSubmit-button" type="button" onClick={() => navigate('/')} >로그인</button>
        <button className="formSubmit-button" type="button" onClick={handleSubmit}>회원가입</button>
    </div>
  )
}

