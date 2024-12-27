import React, {useState} from 'react'
import { NNIP } from '../components/signup/NNIP';

const Signup:React.FC = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isIdChecked, setIsIdChecked] = React.useState<boolean>(false);

  const [formData, setFormData] = useState<Record<string, string>>({
    nickName: '',
    id: '',
    password: '',
    passwordCheck: '',
    email: '',
    phone: '',
    address: '',
    detailAddress: '',
    year: '',
    month: '',
    day: '',

  })

  const handleSuccess = () => {

    alert('회원가입이 완료 되었습니다.');
    console.log('회원가입 데이터:', formData);
    
  }

  return (
    <div>
      <NNIP formData={formData} setFormData={setFormData} onSuccess={handleSuccess} errors={errors} setErrors={setErrors} />
    </div>
  )
}

export default Signup