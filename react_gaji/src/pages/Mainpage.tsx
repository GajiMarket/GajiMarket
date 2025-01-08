import React from 'react'
import '../style/Mainpage.css'
import SearchBar from '../components/mainpage/SearchBar.tsx';
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
      <SearchBar />
      <Footer />
    </div>
  )
}

export default Mainpage