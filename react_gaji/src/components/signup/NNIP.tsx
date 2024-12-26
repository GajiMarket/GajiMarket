import React from 'react'
import { validatePassword, checkId, signUp, validatePhone, validateEmail} from '../../hooks/sign';
import Email from './Email';
import NickName from './NickName';
import Id from './Id';
import Password from './Password';
import Phone from './Phone';
import PostCode from './PostCode';
import '../../style/Signup.css';



interface SignupFormProps {

  //회원가입 데이터
  formData: Record<string, string>;
  //회원가입 입력한 데이터
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSuccess: () => void;
  isCheckId: boolean;

}



export const NNIP:React.FC<SignupFormProps> = ({formData, setFormData, onSuccess}) => {

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isIdChecked, setIsIdChecked] = React.useState<boolean>(false);

  const handleClickPost = (data: Record<string, string>) => (event: React.MouseEvent<HTMLInputElement>) => {

    
  }


  //input 태그에서 값을 입력하면 해당 매개변수에 담긴다.
  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {

    //기존 formData 값에 field[]값 추가
    setFormData({...formData, [field]: event.target.value});

  };

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

  const handleIdCheck = async () => {

    try {
      const isDuplicated = await checkId(formData.id);

      if(isDuplicated) {

        setErrors((prev) => ({...prev, id: '중복된 아이디 입니다.'}));
      } else {
        setErrors((prev) => ({...prev, id: ''}));
        setIsIdChecked(true);
        alert('아이디 사용가능');
      }

    } catch(error) {

      console.error('아이디 중복 체크 실패', error);
      alert('아이디 중복 체크 중 오류가 발생했습니다.');
      
    }
  }

  //아이디 중복

  // const duplicatedId = async (id: string) => {

  //   try {

  //     const isDuplicated = await checkId(id);

  //     if (isDuplicated) {

  //       alert('아이디 중복');

  //     } else {

  //       onSuccess();
  //     }

  //   } catch {

  //     alert('전송 실패 되었습니다.')
  //   }
  // };

  

  //form 전송
  const handleSubmit = async () => {


    if(!validateForm()) {
      
      alert('중복체크와 유효성검사를 실행해 주세요');

    } 

    try {

      await signUp(formData);
      onSuccess();

    } catch {

      alert('전송실패 다시 시도해주세요');
    }

  };
  
  return (
    
    <div className="signUpForm">
      <h1 className="title">회원가입</h1>
      <div className="subtitle">회원이 되어 다양한 혜택을 경험해 보세요!</div>

      <NickName nickName={formData.nickName || ''} onChange={handleChange('nickName')} />

      <Id id={formData.id || ''} onChange={handleChange('id')} onClick={handleIdCheck} />{errors.id && <span>{errors.id}</span>}

      <Password password={formData.password || ''} passwordCheck={formData.passwordcheck || ''} onChange1={handleChange('password')} onChange2={handleChange('passwordCheck')} />{errors.password && <span>{errors.password}</span>}
      {/* <input className="passwordCheck" type="password" placeholder="비밀번호 재입력" value={formData.passwordCheck || ''} onChange={handleChange('passwordCheck')} />{errors.passwordCheck && <span>{errors.passwordCheck}</span>} */}

      <Email email={formData.email || ''} onChange={handleChange('email')} codeNumber={formData.codeNumber || ''} />{errors.email && <span>{errors.email}</span>}

      <Phone phone={formData.phone || ''} onChange={handleChange('phone')} />

      <PostCode postcode={formData.postCode || ''} onClick={} />
        <button className="signUp" type="button" onClick={handleSubmit}>회원가입</button>
    </div>
  )
}

