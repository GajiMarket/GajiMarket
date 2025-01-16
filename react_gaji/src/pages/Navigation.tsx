import React from 'react'
import MapComponent from '../components/navigation/MapComponent';

import '../style/Mainpage.css'

const Navigation: React.FC = () => {

  return (
    <div className='Mainpage'>
      <MapComponent />
    </div>
  )
}

export default Navigation;