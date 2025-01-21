import React from 'react'
import '../style/erorrpage.css'
import { useNavigate } from 'react-router-dom'

const Erorrpage:React.FC = () => {

    const navigate= useNavigate();

    const home = () =>{
        navigate('/');
    }
  return (
    <div className='erorrpage'>
      <h1 className='erorrpage_h1'>404</h1>
      <p className='erorrpage_p1'>조리 중입니다.</p>
      <p className='erorrpage_p2'>금방가겠습니다.</p>
      <p className='erorrpage_p3'>감사합니다.</p>
      <button className='erorrpage_home_button' onClick={home}>홈으로 이동</button>
    </div>
  )
}

export default Erorrpage