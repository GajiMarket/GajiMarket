import React from 'react'
import '../style/Mainpage.css'
import SerchBar from '../components/mainpage/SerchBar.tsx';
import Footer from '../components/all/Footer.tsx';
import Product_preview from '../components/mainpage/Product_preview';
import Mapbox from '../components/mainpage/Mapbox';

const Mainpage:React.FC = () => {
  
  
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