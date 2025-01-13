import React, {useState} from 'react'
import KakaoInfoCOM from '../components/login/KakaoInfo'

const KakaoInfo: React.FC = () => {

    const [formData, setFormData] = useState<Record<string, string>>({
        id: '',
        password: '',
        
    })

  return (
    <div>
      <KakaoInfoCOM formData={formData} setFormData={setFormData}/>
    </div>
  )
}

export default KakaoInfo
