import React from 'react'
import '../style/Mainpage.css'
import Mapbox from '../components/navigation/MapComponent';
import { useLocation } from "react-router-dom";

const Navigation:React.FC = () => {
  const location = useLocation();
  const { product } = location.state || {};

  console.log('navigation10',product);
  
  return (
    <div className='Mainpage'>
      <Mapbox />
    </div>
  )
}

export default Navigation;