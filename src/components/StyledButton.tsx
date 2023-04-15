import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

interface StyledButtonProps {
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
  fontsize?: string;
  padding?: string;
}

const Btn = styled.button<StyledButtonProps>`
  width: 100%;
  height: 100%;
  color: ${(props) => (props.color === 'rgba(255, 137, 35, 0.6)' ? 'white' : 'rgba(128, 128, 128, 1)')};
  font-size: ${(props) => (props.fontsize === '24px' ? '24px' : props.fontsize)};
  font-weight: 700;
  border: 0px;
  padding: ${(props) => (props.padding === '1.6rem 3.2rem' ? '1.6rem 3.2rem' : props.padding)};
  background-color: ${(props) => (props.color === 'rgba(255, 137, 35, 0.6)' ? 'rgba(255, 137, 35, 0.6)' : props.color)};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

function StyledButton(props: StyledButtonProps) {
  const { color, onClick, children, fontsize, padding } = props;
  return (
    <Btn color={color} onClick={onClick} fontsize={fontsize} padding={padding}>
      {children}
    </Btn>
  );
}

StyledButton.defaultProps = {
  color: 'rgba(255, 137, 35, 0.6)',
  fontsize: '24px',
  padding: '1.6rem 3.2rem',
};
export default StyledButton;