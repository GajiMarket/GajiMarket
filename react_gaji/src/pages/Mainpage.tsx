import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../style/Mainpage.css'
import SearchBar from '../components/mainpage/SearchBar.tsx';
import Footer from '../components/all/Footer.tsx';
import Mapbox from '../components/mainpage/Mapbox';
import { useLocation } from 'react-router-dom'
import loginStore from '../utils/loginStore.ts';

interface LocationState {
  loginSuccess: boolean;
}

const Mainpage:React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');


  const navigate = useNavigate();
  const {isAuthenticated} = loginStore();

  useEffect(() => {
        
  
        if(!isAuthenticated) {
            
          alert('로그인이 필요합니다.');
          navigate('/');
          return;
        }
      }, [isAuthenticated])

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