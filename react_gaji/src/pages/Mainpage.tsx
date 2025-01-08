import React,{useState} from 'react'
import '../style/Mainpage.css'
import SearchBar from '../components/mainpage/SearchBar.tsx';
import Footer from '../components/all/Footer.tsx';
import Mapbox from '../components/mainpage/Mapbox';
import { useLocation } from 'react-router-dom'

interface LocationState {
  loginSuccess: boolean;
}

const Mainpage:React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');


  // const location = useLocation();

  // const state = location.state as LocationState;

  // const loginCheck = state.loginSuccess
  
  
  return (
    <div className='Mainpage'>
      <Mapbox searchTerm={searchTerm}/>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Footer />
    </div>
  )
}

export default Mainpage