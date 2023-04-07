import { createGlobalStyle } from 'styled-components';
import './assets/fonts/fonts.css';

const GlobalStyle = createGlobalStyle`

body {
  font-family: 'Pretendard';
}
/* 세로모드 모바일 디바이스 ( 해상도가 767px 보다 작은 화면 ) */
@media (max-width: 767px) {
  html{
    font-size: 8px;
  }
}
/* 태블릿 디바이스 ( 해상도가 768px보다 크고 1119px 보다 작은 화면에 적용 )  */
@media (min-width: 768px) and (max-width: 1199px) {
  html{
    font-size: 9px;
  }
} 
/* 큰화면 데스크탑 ( 해상도가 1200px 보다 큰 화면에 적용 )  */
@media (min-width: 1200px) {
  html{
  font-size: 10px;
  }
}
`;

export default GlobalStyle;
