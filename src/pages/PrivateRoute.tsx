import React, { useEffect, useRef } from 'react';
import { ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  authentication: boolean; // true : 인증을 반드시 해야하만 접속가능, false : 인증을 반디스 안해야만 접속 가능
}

export default function PrivateRoute({ authentication }: PrivateRouteProps): React.ReactElement | null {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const location = useLocation();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (authentication && (isAuthenticated === null || isAuthenticated === 'false') && !hasAlerted.current) {
      alert('로그인이 필요합니다.');
      hasAlerted.current = true;
    }
  }, [location]);

  if (authentication) {
    // 인증이 필요한 페이지
    return isAuthenticated === null || isAuthenticated === 'false' ? <Navigate to="/login" /> : <Outlet />;
  }

  // 인증이 필요 없는 페이지
  return isAuthenticated === null || isAuthenticated === 'false' ? <Outlet /> : <Navigate to="/" />;
}
