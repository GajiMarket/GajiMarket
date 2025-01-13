import React from 'react'

interface IInfoProps {
    formData: Record<string, string>;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const KakaoInfo: React.FC<IInfoProps> = ({formData, setFormData}) => {

    const handleState = (data: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  
      //data는 무조건 기본타입이나 any
      setFormData({...formData, [data]:e.target.value});
  
    }




  return (
    <div className="info">
      <input type="text" value={formData.id || ''} onChange={handleState('id')} />
    </div>
  )
}

export default KakaoInfo
