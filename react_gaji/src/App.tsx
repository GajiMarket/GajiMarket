import './App.css';
import Chatlist from "./pages/Chatlist";
import Chatpage from "./pages/Chatpage";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import Productadd from "./pages/Productadd";
import Productlistpage from "./pages/Productlistpage";
import Productpage from "./pages/Productpage";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import MypageProfileEdit from './pages/Mypage_profileedit';
import MypageLove from './components/mypage/Mypage_love'; // MypageLove 추가
import MypageSell from './components/mypage/Mypage_sell'; // MypageSell 추가
import MypageBuy from './components/mypage/Mypage_buy'; // MypageBuy 추가
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navigation from './pages/Navigation';
import { FooterProvider } from './components/all/FooterContext';
import { ProfileProvider } from './components/mypage/ProfileContext'; // ProfileProvider 추가

const App: React.FC = () => {
  return (
    <ProfileProvider> {/* ProfileProvider로 감싸기 */}
      <FooterProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/chatlist" element={<Chatlist />} />
              <Route path="/chatpage/:id" element={<Chatpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/productadd" element={<Productadd />} />
              <Route path="/productlistpage" element={<Productlistpage />} />
              <Route path="/productpage" element={<Productpage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/mypage_profileedit" element={<MypageProfileEdit />} />
              <Route path="/mypage_love" element={<MypageLove />} /> {/* 관심목록 경로 추가 */}
              <Route path="/mypage_sell" element={<MypageSell />} /> {/* 판매내역 경로 추가 */}
              <Route path="/mypage_buy" element={<MypageBuy />} /> {/* 구매내역 경로 추가 */}
              <Route path="/navigation" element={<Navigation />} />
            </Routes>
          </div>
        </BrowserRouter>
      </FooterProvider>
    </ProfileProvider>
  );
};

export default App;
