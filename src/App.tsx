import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import IdsearchPage from './pages/IdsearchPage';
import ModifyPage from './pages/ModifyPage';
import Mypage from './pages/MyPage';
import PreferencePage from './pages/PreferencePage';
import RegisterPage from './pages/RegisterPage';
import RegisterDetailPage from './pages/RegisterDetailPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/main/*" element={<Main />} />
          <Route path="/login/*" element={<LoginPage />} />
          <Route path="/idsearch/*" element={<IdsearchPage />} />
          <Route path="/modify/*" element={<ModifyPage />} />
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="/preference/*" element={<PreferencePage />} />
          <Route path="/register/*" element={<RegisterPage />} />
          <Route path="/registerdetail/*" element={<RegisterDetailPage />} />
          <Route path="/detail/*" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
