import React, {useState} from 'react'
import { NNIP } from '../components/signup/NNIP';
import { PostCodeData } from '../hooks/useSign';
import { useNavigate } from 'react-router-dom';

interface PageProps {
  postCodeData: PostCodeData
}


const Signup:React.FC<PageProps> = ({postCodeData}) => {
  const navigate: any = useNavigate();
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);

  //이메일 인증코드
  const [codeNumber, setCodeNumber] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [codeNumberChecked, setCodeNumberChecked] = useState<boolean>(false);
  const [accessChecked, setAccessChecked] = useState<boolean>(false);


  const [formData, setFormData] = useState<Record<string, string>>({
    nickName: '',
    id: '',
    password: '',
    passwordCheck: '',
    email: '',
    phone: '',
    year: '',
    month: '',
    day: '',
    zonecode: '',
    address: '',
    extraAddress: '',
    detailAddress: '',

  })

  const handleSuccess = async () => {

    try {

      alert('회원가입이 완료 되었습니다.');
      console.log('회원가입 데이터:', formData);

      return navigate('/login');
    } catch {

      console.error('회원가입 실패');
      throw Error
      
    }

    
  }

  return (
    <div>
      <NNIP 
      formData={formData} 
      setFormData={setFormData} 
      onSuccess={handleSuccess} 
      errors={errors} 
      setErrors={setErrors}
      isCheckId={isIdChecked}
      setIsCheckedId={setIsIdChecked}
      codeNumber={codeNumber}
      setCodeNumber={setCodeNumber}
      inputCode={inputCode}
      setInputCode={setInputCode}
      codeNumberChecked={codeNumberChecked}
      setCodeNumberChecked={setCodeNumberChecked}
      accessChecked={accessChecked}
      setAccessChecked={setAccessChecked}
      postCodeData={postCodeData}
       />
    </div>
  )
}

export default Signup