import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose, AiOutlinePlus, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';
import StyledInput from './StyledInput';
import StyledButton from './StyledButton';

interface ModalProps {
  onClose?: () => void;
  show: boolean;
  onConfirm: (pwd: string) => void;
  modalRef: React.ForwardedRef<HTMLDivElement>;
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
`;
const ModalContent = styled.div`
  display: flex;
  width: 30%;
  background-color: white;
  padding: 4rem;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 3.2vh;
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
const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
const Button = styled.div`
  display: flex;
  width: 10rem;
`;

function PwdModal(props: ModalProps) {
  const { onClose = () => null, show, onConfirm, modalRef } = props;
  const [pwdValue, setPwdValue] = useState<string>('');

  const handlePwdEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwdValue(event.target.value);
  };

  const handleSubmit = () => {
    onConfirm(pwdValue);
    setPwdValue('');
  };

  return (
    <ModalWrapper show={show} ref={modalRef} onClick={onClose}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <ModalRow>
          <span className={Styles.h4}>현재 비밀번호 입력</span>
        </ModalRow>
        <ModalRow>
          <StyledInput
            value={pwdValue}
            type="password"
            onChange={handlePwdEvent}
            placeholder="현재 비밀번호를 입력하세요"
            style={{ width: '100%' }}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </ModalRow>
        <ButtonBox>
          <Button>
            <StyledButton onClick={onClose} borderRadius="3rem" color="rgba(128, 128, 128, 1)">
              <span className={Styles.p2bold}>취소</span>
            </StyledButton>
          </Button>
          <Button>
            <StyledButton onClick={handleSubmit} borderRadius="3rem">
              <span className={Styles.p2bold}>확인</span>
            </StyledButton>
          </Button>
        </ButtonBox>
      </ModalContent>
    </ModalWrapper>
  );
}

PwdModal.defaultProps = {
  onClose: () => null,
};
export default PwdModal;
