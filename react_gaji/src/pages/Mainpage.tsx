import React , {useRef} from 'react'
import useMap from "../hooks/useMap";
import { mapConfig } from "../config/mapConfig.ts";
import '../style/Mainpage.css'
import SerchBar from '../components/mainpage/SerchBar.tsx';
import Footer from '../components/all/Footer.tsx';
import Product_preview from '../components/mainpage/Product_Preview.tsx';

const Mainpage:React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  useMap(mapContainerRef, mapConfig.defaultStyle, mapConfig);
  
  return (
    <div className='Mainpage'>
      <div ref={mapContainerRef} className='mainpage_Googlemap'></div>
      <Product_preview />
      <SerchBar />
      <Footer />
    </div>
  )
}

export default Mainpage