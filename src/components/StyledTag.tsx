import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

interface StyledTagProps {
  imgSrc?: string;
  text: string;
  onClick?: () => void;
}

const Tag = styled.div<{ isActive: boolean }>`
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  //width: 6.6rem;
  height: 3.5rem;
  border-radius: 0.4rem;
  border: 0.1rem solid rgba(128, 128, 128, 0.3);
  background: ${(props) => (props.isActive ? 'rgba(255, 137, 35, 0.6)' : '#FFFBEF')};
`;

const ImgIcon = styled.img`
  margin-right: 0.2rem;
  width: 1.2rem;
  height: 1.2rem;
`;

const TagText = styled.span`
  color: rgba(128, 128, 128, 0.7);
`;
function StyledTag(props: StyledTagProps) {
  const { imgSrc, text, onClick = () => null } = props;
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <Tag isActive={isActive} onClick={handleClick}>
      {imgSrc && <ImgIcon src={imgSrc} alt="" />}
      <TagText className={Styles.p1bold}>{text}</TagText>
    </Tag>
  );
}

StyledTag.defaultProps = {
  imgSrc: '',
  onClick: () => null,
};
export default StyledTag;
