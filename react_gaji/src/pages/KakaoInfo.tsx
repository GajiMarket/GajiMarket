import React, {useState} from 'react'
import KakaoInfoCOM from '../components/login/KakaoInfo'

const KakaoInfo = () => {

    const [formData, setFormData] = useState<Record<string, string>>({
        id: '',
        password: '',
        
    })

  return (
    <div>
      <KakaoInfoCOM />
    </div>
  )
}

export default KakaoInfo
