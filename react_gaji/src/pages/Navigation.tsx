import React from 'react'
import '../style/Mainpage.css'
import Mapbox from '../components/mainpage/Mapbox';

const Navigation:React.FC = () => {

  return (
    <div className='Mainpage'>
      <Mapbox />
    </div>
  )
}

export default Navigation;