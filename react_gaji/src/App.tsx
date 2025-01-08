import "./App.css";
import Chatlist from "./pages/Chatlist";
import Chatpage from "./pages/Chatpage";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import Productadd from "./pages/Productadd";
import Productlistpage from "./pages/Productlistpage";
import Productpage from "./pages/Productpage";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import MypageProfileEdit from "./pages/Mypage_profileedit";
import MypageLove from "./components/mypage/Mypage_love";
import MypageSell from "./components/mypage/Mypage_sell";
import MypageBuy from "./components/mypage/Mypage_buy";
import MypageFAQ from "./components/mypage/Mypage_faq";
import MypageTerms from "./components/mypage/Mypage_terms";
import MypageTermsDetail from "./components/mypage/Mypage_terms_detail";
import MypageNeighborhoodSettings from "./components/mypage/Mypage_neighborhood_settings";
import MypageNeighborhoodAuth from "./components/mypage/Mypage_neighborhood_auth";
import MypageKeywordSettings from "./components/mypage/Mypage_keyword_settings";
import MypageAlarm from "./components/mypage/Mypage_alarm"; // 알림 페이지 추가
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navigation from "./pages/Navigation";
import { FooterProvider } from "./components/all/FooterContext";
import Lodingpage from "./pages/Lodingpage";
import FindMain from "./pages/FindMain";
import ZustandTest from "./pages/ZustandTest";

const App: React.FC = () => {
  return (
    <FooterProvider>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/lodingpage" element={<Lodingpage />} />
            <Route path="/chatlist" element={<Chatlist />} />
            <Route path="/chatpage/:id" element={<Chatpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find" element={<FindMain />} />
            <Route path="/productadd" element={<Productadd />} />
            <Route path="/productlistpage" element={<Productlistpage />} />
            <Route path="/productpage" element={<Productpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage_profileedit" element={<MypageProfileEdit />} />
            <Route path="/mypage_love" element={<MypageLove />} />
            <Route path="/mypage_sell" element={<MypageSell />} />
            <Route path="/mypage_buy" element={<MypageBuy />} />
            <Route path="/mypage_faq" element={<MypageFAQ />} />
            <Route path="/mypage_terms" element={<MypageTerms />} />
            <Route
              path="/mypage_terms_detail"
              element={<MypageTermsDetail />}
            />
            <Route
              path="/mypage_neighborhood_settings"
              element={<MypageNeighborhoodSettings />}
            />
            <Route
              path="/mypage_neighborhood_auth"
              element={<MypageNeighborhoodAuth />}
            />
            <Route
              path="/mypage_keyword_settings"
              element={<MypageKeywordSettings />}
            />
            <Route path="/mypage_alarm" element={<MypageAlarm />} />{" "}
            {/* 알림 페이지 추가 */}
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/zustandtest" element={<ZustandTest />} />
          </Routes>
        </>
      </BrowserRouter>
    </FooterProvider>
  );
};

export default App;
