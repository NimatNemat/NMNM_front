import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose, AiOutlinePlus, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';
import StyledInput from './StyledInput';

interface ModalProps {
  onClose?: () => void;
  show: boolean;
  data: number;
  modalRef: React.ForwardedRef<HTMLDivElement>;
}

interface ModalRowProps {
  playListName: string;
  locked: boolean;
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
const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f2f4f6;
  border-radius: 0.5rem;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
const Button = styled.button`
  white-space: nowrap;
  height: 3vh;
  border: none;
  padding: 0.5rem 2rem;
  background-color: #ffffff;
  &:hover {
    background-color: #f2f4f6;
    color: black;
    cursor: pointer;
    border-radius: 3rem;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1.6vh;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const Styeldselect = styled.select`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 0;
  text-align: left;
  width: 100%;
  border: none;
  border-bottom: 1px solid #6e6e6e;
  color: rgba(128, 128, 128);
  background: #ffffff;
  appearance: none;
  -webkit-appearance: none; // 크롬, 사파리 등 웹킷 기반 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 파이어폭스에서 기본 스타일 제거
`;

function StyledModal(props: ModalProps) {
  const { onClose = () => null, show, data, modalRef } = props;
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [playListName, setPlayListName] = useState<string>('');
  const [lock, setLock] = useState<number>(1);
  const [rows, setRows] = useState<ModalRowProps[]>([
    { playListName: '노동욱님의 맛집리스트', locked: false },
    { playListName: '선동운님의 맛집리스트', locked: true },
  ]);

  const setInputVisibleFalse = () => {
    setInputVisible(false);
  };

  const handleClose = () => {
    setInputVisibleFalse();
    onClose();
  };

  const handleSubmit = () => {
    if (playListName !== '') {
      if (lock === 1) {
        setRows((prevRows) => [...prevRows, { playListName, locked: false }]);
      } else {
        setRows((prevRows) => [...prevRows, { playListName, locked: true }]);
      }
      setPlayListName('');
      setInputVisible(false);
    }
  };

  const handlePlayListNameEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayListName(event.target.value);
  };

  const handleLockEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLock(Number(event.target.value));
  };

  const showInputBox = () => {
    return (
      <Div>
        <RowDiv>
          <div className={Styles.p1bold} style={{ width: '100%', textAlign: 'left' }}>
            이름
          </div>
          <StyledInput
            value={playListName}
            type="text"
            placeholder="맛플리 이름 입력"
            style={{ width: '100%' }}
            onChange={handlePlayListNameEvent}
            border="none"
            borderBottom="1px solid #6E6E6E"
            background="#FFFFFF"
            padding="0.2rem 0"
          />
        </RowDiv>
        <RowDiv>
          <div className={Styles.p1bold} style={{ width: '100%', textAlign: 'left' }}>
            공개 범위 설정
          </div>
          <Styeldselect className={Styles.p1bold} value={lock} onChange={handleLockEvent}>
            <option value={1}>공개</option>
            <option value={2}>비공개</option>
          </Styeldselect>
        </RowDiv>
        <ButtonBox>
          <Button type="button" onClick={handleSubmit}>
            만들기
          </Button>
        </ButtonBox>
      </Div>
    );
  };
  return (
    <ModalWrapper show={show} ref={modalRef}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <span className={Styles.h3}>그룹선택</span>
          <AiOutlineClose size="2.4rem" onClick={handleClose} />
        </ModalHeader>
        {rows.map((row) => (
          <ModalRow key={row.playListName}>
            <IconBox>
              {row.locked ? (
                <AiOutlineLock size="4rem" color="#6E6E6E" />
              ) : (
                <AiOutlineUnlock size="4rem" color="#6E6E6E" />
              )}
            </IconBox>
            <TextBox>
              <span className={Styles.p1bold} style={{ color: '#6E6E6E' }}>
                {row.playListName}
              </span>
            </TextBox>
          </ModalRow>
        ))}
        {inputVisible ? (
          showInputBox()
        ) : (
          <ModalRow onClick={() => setInputVisible(true)}>
            <IconBox>
              <AiOutlinePlus size="4rem" color="#6E6E6E" />
            </IconBox>
            <TextBox>
              <span className={Styles.p1bold} style={{ color: '#6E6E6E' }}>
                새폴더 생성
              </span>
            </TextBox>
          </ModalRow>
        )}
      </ModalContent>
    </ModalWrapper>
  );
}

StyledModal.defaultProps = {
  onClose: () => null,
};
export default StyledModal;
