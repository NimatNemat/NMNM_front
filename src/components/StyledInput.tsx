import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

interface StyledInputProps {
  value: string | number;
  type: string;
  placeholder: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  border?: string;
  borderBottom?: string;
  background?: string;
  padding?: string;
  style?: React.CSSProperties;
  borderRadius?: string;
  icon?: React.ReactNode;
}
const Input = styled.input<StyledInputProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: ${(props) => (props.border === '1px solid #dfdfdf' ? '1px solid #dfdfdf' : props.border)}; // border 적용
  border-bottom: ${(props) => props.borderBottom}; // borderBottom 적용
  background: ${(props) => (props.background === '#FFFDF5' ? '#FFFDF5' : props.background)}; // background 적용
  padding: ${(props) => (props.padding === '1.6rem 1.6rem' ? '1.6rem 1.6rem' : props.padding)};
  border-radius: ${(props) => (props.borderRadius === '0' ? '0' : props.borderRadius)};
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  ${css`
    color: rgba(128, 128, 128, 0.3);
  `}
`;

const IconContainer = styled.span`
  margin-left: -4rem; // 아이콘 위치를 Input 요소 안으로 이동
  display: flex;
  align-items: center;
  color: rgba(128, 128, 128, 0.6);
`;

const InputWrapper = styled.div`
  display: flex; // Input과 IconContainer를 가로로 배치
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  background: #fffdf5; // background 적용
`;

function StyledInput(props: StyledInputProps) {
  const {
    value,
    type,
    placeholder,
    onChange,
    onKeyPress,
    border,
    borderBottom,
    background,
    padding,
    onBlur,
    style,
    borderRadius,
    icon,
  } = props;
  return (
    <Div className={Styles.p1bold}>
      <InputWrapper>
        <Input
          className={Styles.p1regular}
          value={value}
          type={type}
          style={style}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={onKeyPress}
          border={border}
          borderBottom={borderBottom}
          background={background}
          padding={padding}
          onBlur={onBlur}
          borderRadius={borderRadius}
        />
        {icon && <IconContainer>{icon}</IconContainer>}
      </InputWrapper>
    </Div>
  );
}

StyledInput.defaultProps = {
  onKeyPress: null,
  border: '1px solid #dfdfdf',
  borderBottom: '',
  background: '#FFFDF5',
  padding: '1.6rem 1.6rem',
  onBlur: null,
  style: { width: '60rem' },
  borderRadius: 0,
  icon: null,
};

export default StyledInput;
