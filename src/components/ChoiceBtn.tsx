import React, { useState } from 'react';
import styled from 'styled-components';

interface IChoicebtn {
  selected: boolean;
}

const ChoiceContainer = styled.button<IChoicebtn>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 90px;
  /* padding: 2vw 1vh; */
  border-radius: 30px;
  background: ${(props) => (props.selected ? 'rgba(255, 137, 35, 0.6)' : '#ffffff')};
  box-shadow: 0.5rem 0.5rem 1.2rem rgba(0, 0, 0, 0.1);
  border: none;
  &:hover {
    box-shadow: 0.5rem 0.5rem 1.2rem rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
interface IChoicebtnProps {
  selected: boolean;
  onClick: () => void;
}
function ChoiceBtn(props: React.PropsWithChildren<IChoicebtnProps>) {
  const { selected, onClick, children } = props;
  return (
    <ChoiceContainer selected={selected} onClick={onClick}>
      {children}
    </ChoiceContainer>
  );
}

export default ChoiceBtn;