import './App.css'

import Chatlist from "./pages/Chatlist";
import Chatpage from "./pages/Chatpage";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import Productadd from "./pages/Productadd";
import Productlistpage from "./pages/Productlistpage";
import Productpage from "./pages/Productpage";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className='app-container'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage/>} />
        <Route path="/chatlist" element={<Chatlist/>} />
        <Route path="/chatpage" element={<Chatpage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/productadd" element={<Productadd/>} />
        <Route path="/productlistpage" element={<Productlistpage/>} />
        <Route path="/productpage" element={<Productpage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/mypage" element={<Mypage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
