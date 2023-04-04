import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

interface StyledInputProps {
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const StyledInput = styled.input<StyledInputProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 600px;
  height: 100%;
  border: 1px solid #dfdfdf;
`;

function Input(props: StyledInputProps) {
  const { value, type, onChange } = props;
  return (
    <div style={{ width: '100%', height: '48px' }}>
      <StyledInput value={value} type={type} onChange={onChange} />
    </div>
  );
}

export default Input;
