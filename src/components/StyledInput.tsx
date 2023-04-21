import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

interface StyledInputProps {
  value: string | number;
  type: string;
  placeholder: string;
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  border?: string;
  borderBottom?: string;
  background?: string;
  padding?: string;
}
const Input = styled.input<StyledInputProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: ${(props) => (props.border === '1px solid #dfdfdf' ? '1px solid #dfdfdf' : props.border)}; // border 적용
  border-bottom: ${(props) => props.borderBottom}; // borderBottom 적용
  background: ${(props) => (props.background === '#FFFDF5' ? '#FFFDF5' : props.background)}; // background 적용
  padding: ${(props) => (props.padding === '1.6rem 1.6rem' ? '1.6rem 1.6rem' : props.padding)};
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${css`
    color: rgba(128, 128, 128, 0.3);
  `}
`;
function StyledInput(props: StyledInputProps) {
  const { value, type, placeholder, width, onChange, onKeyPress, border, borderBottom, background, padding } = props;
  return (
    <Div className={Styles.p1bold}>
      <Input
        value={value}
        type={type}
        style={{ width }}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        border={border}
        borderBottom={borderBottom}
        background={background}
        padding={padding}
      />
    </Div>
  );
}

StyledInput.defaultProps = {
  width: '60rem',
  onKeyPress: null,
  border: '1px solid #dfdfdf',
  borderBottom: '',
  background: '#FFFDF5',
  padding: '1.6rem 1.6rem',
};

export default StyledInput;
