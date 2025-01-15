import React from 'react'
import MapComponent from '../components/navigation/MapComponent';
import { useLocation } from 'react-router-dom';
import { usePathStore } from '../utils/pathStore';

import '../style/Mainpage.css'

const Navigation:React.FC = () => {
  const productState = usePathStore.getState();

  console.log("Current Product State:", productState);
  
  return (
    <div className='Mainpage'>
      <MapComponent />
    </div>
  )
}

export default Navigation;