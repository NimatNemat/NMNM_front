import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function PwdRoute(): React.ReactElement | null {
  const pwdAuthenticated = sessionStorage.getItem('pwdAuthenticated');
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = useRef(location);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  useEffect(() => {
    if (pwdAuthenticated === null || pwdAuthenticated === 'false') {
      alert('인증이 필요합니다.');
      navigate(-1);
    }
  }, [pwdAuthenticated, location]);

  if (pwdAuthenticated === 'true') {
    return <Outlet />;
  }

  return null;
}
