import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Define a Spinner styled-component
const Spinner = styled.div`
  margin: 1rem auto;
  border: 16px solid #f3f3f3;
  border-top: 16px solid rgba(255, 137, 35, 1);
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  animation: ${spin} 2s linear infinite;
`;

function SpinnerComponent() {
  return <Spinner />;
}

export default SpinnerComponent;
