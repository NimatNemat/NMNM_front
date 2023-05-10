import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface StyledButtonProps {
  color?: string;
  onClick: (event: any) => void;
  children: React.ReactNode;
  fontsize?: string;
  padding?: string;
  borderRadius?: string;
}

const Btn = styled.button<StyledButtonProps>`
  width: 100%;
  height: 100%;
  color: ${(props) => (props.color === 'rgba(255, 137, 35, 0.6)' ? 'white' : 'rgba(128, 128, 128, 1)')};
  font-size: ${(props) => (props.fontsize === '24px' ? '24px' : props.fontsize)};
  font-weight: 700;
  border: 0px;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '0rem')};
  padding: ${(props) => (props.padding === '1.6rem 3.2rem' ? '1.6rem 3.2rem' : props.padding)};
  background-color: ${(props) => (props.color === 'rgba(255, 137, 35, 1)' ? 'rgba(255, 137, 35,1)' : props.color)};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  color: ${(props) => (props.color === 'rgba(255, 137, 35, 1)' ? 'white' : 'rgba(128, 128, 128, 1)')};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    color: ${(props) => (props.color === 'rgba(255, 137, 35, 1)' ? 'white' : 'rgba(128, 128, 128, 1)')};
  }
`;

function StyledButton(props: StyledButtonProps) {
  const { color, onClick, children, fontsize, padding, borderRadius } = props;
  return (
    <Btn color={color} onClick={onClick} fontsize={fontsize} padding={padding} borderRadius={borderRadius}>
      {children}
    </Btn>
  );
}

StyledButton.defaultProps = {
  color: 'rgba(255, 137, 35, 1)',
  fontsize: '24px',
  padding: '1.6rem 3.2rem',
  borderRadius: '0rem',
};
export default StyledButton;
