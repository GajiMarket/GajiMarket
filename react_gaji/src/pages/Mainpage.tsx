import React from 'react'
import '../style/Mainpage.css'
import SerchBar from '../components/mainpage/SerchBar.tsx';
import Footer from '../components/all/Footer.tsx';
import Product_preview from '../components/mainpage/Product_preview';
import Mapbox from '../components/mainpage/Mapbox';
import { useLocation } from 'react-router-dom'

interface LocationState {
  loginSuccess: boolean;
}

const Mainpage:React.FC = () => {

  // const location = useLocation();

  // const state = location.state as LocationState;

  // const loginCheck = state.loginSuccess
  
  
  return (
    <div className='Mainpage'>
      <Mapbox />
      <Product_preview />
      <SerchBar />
      <Footer />
    </div>
  )
}

export default Mainpage