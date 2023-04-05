import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

interface StyledInputProps {
  value: string;
  type: string;
  placeholder: string;
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = styled.input<StyledInputProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: calc(100%-3.2rem);
  width: ${(props) => (props.width === '60rem' ? '60rem' : props.width)};
  border: 1px solid #dfdfdf;
  background: #fffdf5;
  padding: 1.6rem 3.2rem;
`;

const Div = styled.div`
  width: 100%;
  height: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${css`
    color: rgba(128, 128, 128, 0.3);
  `}
`;
function StyledInput(props: StyledInputProps) {
  const { value, type, placeholder, width, onChange } = props;
  return (
    <Div className={Styles.p1bold}>
      <Input value={value} type={type} style={{ width }} placeholder={placeholder} onChange={onChange} />
    </Div>
  );
}

StyledInput.defaultProps = {
  width: '60rem',
};

export default StyledInput;
