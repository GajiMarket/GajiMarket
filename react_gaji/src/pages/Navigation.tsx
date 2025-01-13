import React from 'react'
import Mapbox from '../components/navigation/MapComponent';
import { useLocation } from "react-router-dom";
import { useProductStore } from '../utils/pathStore';

import '../style/Mainpage.css'

const Navigation:React.FC = () => {
  const location = useLocation();
  // const { product } = location.state || {};
  const productState = useProductStore.getState();

  // console.log('navigation10',product);
  console.log("Current Product State:", productState);
  
  return (
    <div className='Mainpage'>
      <Mapbox />
    </div>
  )
}

export default Navigation;