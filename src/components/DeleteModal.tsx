import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from './StyledButton';

interface ModalProps {
  onClose?: () => void;
  show: boolean;
  modalRef: React.ForwardedRef<HTMLDivElement>;
  onDelete: () => void;
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
const ModalContent = styled.div`
  display: flex;
  width: 30%;
  background-color: #ffffff;
  border-radius: 2rem;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 50%;
  }
  @media (min-width: 768px) {
    width: 40%;
  }
  @media (min-width: 1024px) {
    width: 30%;
  }
  @media (min-width: 1440px) {
    width: 20%;
  }
`;

const ModalBtn = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #ffffff;
  border-style: none;
  border-radius: 2rem;
  padding: 1.6rem 1.6rem;
  :hover {
    cursor: pointer;
    color: rgba(255, 137, 35, 0.6);
  }
`;

const Line = styled.div`
  width: 100%;
  background-color: rgba(128, 128, 128, 0.3);
  height: 1px;
`;

function DeleteModal(props: ModalProps) {
  const { onClose = () => null, show, modalRef, onDelete } = props;

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <ModalWrapper show={show} ref={modalRef} onClick={onClose}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <ModalBtn onClick={handleDelete}>
          <span className={Styles.p1bold}>삭제</span>
        </ModalBtn>
        <Line />
        <ModalBtn onClick={handleClose}>
          <span className={Styles.p1bold}>취소</span>
        </ModalBtn>
      </ModalContent>
    </ModalWrapper>
  );
}

DeleteModal.defaultProps = {
  onClose: () => null,
};

export default DeleteModal;
