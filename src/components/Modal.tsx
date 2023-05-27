import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillCloseCircle, AiOutlineClose } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from './StyledButton';

interface ModalProps {
  onClose?: () => void;
  show: boolean;
  modalRef: React.ForwardedRef<HTMLDivElement>;
  children: React.ReactNode;
  share?: boolean;
  background?: string;
}

const ModalWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const ModalContent = styled.div<{
  background?: string;
}>`
  display: flex;
  /* background-color: ${(props) => props.background}; */
  background-color: white;
  border-radius: 2rem;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  width: 80%;
  height: ${(props) => (props.background === 'white' ? 'auto' : '50%')};
  @media (min-width: 320px) {
    width: 80vw;
  }
  @media (min-width: 425px) {
    width: 70vw;
  }
  @media (min-width: 768px) {
    width: 50vw;
  }
  @media (min-width: 1024px) {
    width: 30vw;
  }
  @media (min-width: 1440px) {
    width: 20vw;
  }
`;

const Btn = styled.div`
  width: 5rem;
  height: 100%;
  font-size: 1.2rem;
  font-weight: 700;
  border: 0px;
  border-radius: 1rem;
  padding: 0.8rem;
  background-color: rgba(255, 137, 35, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  color: white;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

function Modal(props: ModalProps) {
  const { onClose = () => null, show, modalRef, children, share, background } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalWrapper show={show} ref={modalRef} onClick={onClose}>
      <ModalContent background={background} onClick={(event) => event.stopPropagation()}>
        {!share && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>공유하기</div>
            <Btn onClick={handleClose}>나가기</Btn>
          </div>
        )}
        {children}
      </ModalContent>
    </ModalWrapper>
  );
}

Modal.defaultProps = {
  onClose: () => null,
  share: true,
  background: 'white',
};

export default Modal;
