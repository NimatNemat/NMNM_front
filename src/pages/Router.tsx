import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Main from './MainPage';
import IntroPage from './IntroPage';
import LoginPage from './LoginPage';
import DetailPage from './DetailPage';
import IdsearchPage from './IdsearchPage';
import ModifyPage from './ModifyPage';
import Mypage from './MyPage';
import PreferencePage from './PreferencePage';
import RegisterPage from './RegisterPage';
import PrivacyPage from './PrivacyPage';
import PrivateRoute from './PrivateRoute';
import Header from '../components/Header';
import PlayListPage from './PlayListPage';
import ReviewPage from './ReviewPage';
import Suggestion from './Suggestion';
import MydetailPage from './MyDetailPage';

const Container = styled.div`
  padding: 2.4rem;
`;
const NopaddingContainer = styled.div`
  padding: 0;
`;
export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          {/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
          {/* <Route path="/" element={<NavPage />} /> */}
          <Route path="/preference/*" element={<PreferencePage />} />
          <Route path="/privacy/*" element={<PrivacyPage />} />

          {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
          <Route element={<PrivateRoute authentication={false} />}>
            <Route path="/login/*" element={<LoginPage />} />
            <Route path="/idsearch/*" element={<IdsearchPage />} />
            <Route path="/register/:id" element={<RegisterPage />} />
          </Route>

          {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
          <Route element={<PrivateRoute authentication />}>
            <Route path="/main/*" element={<Main />} />
            <Route path="/playlistpage/*" element={<PlayListPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/mypage/:id" element={<Mypage />} />
            <Route path="/modify/*" element={<ModifyPage />} />
            <Route path="/review/:id" element={<ReviewPage />} />
            <Route path="/Suggestion/:id" element={<Suggestion />} />
            <Route path="/mydetail/:id*" element={<MydetailPage />} />
          </Route>
        </Routes>
      </Container>
      <NopaddingContainer>
        <Routes>
          <Route path="/" element={<IntroPage />} />
        </Routes>
      </NopaddingContainer>
    </BrowserRouter>
  );
}
