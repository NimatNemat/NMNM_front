import React from 'react';
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import Styles from '../config/globalFontStyle.module.css';

const onClickfunction = () => {
  console.log('click');
};

function RegisterPage() {
  return (
    <div className="Register" style={{ width: '200px', height: '200px' }}>
      RegisterPage
      <StyledButton onClick={onClickfunction}>Login</StyledButton>
    </div>
  );
}

export default RegisterPage;
