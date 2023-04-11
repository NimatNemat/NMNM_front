import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose, AiOutlinePlus, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

interface ModalRowProps {
  name: string;
  locked: boolean;
}

const ModalWrapper = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 25%;
  transform: translate(-50%, -50%);
  overflow: auto;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
`;
const ModalContent = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 4.8vh;
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
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`;
const Button = styled.button`
  white-space: nowrap;
  height: 3vh;
`;
const InputBox = styled.input`
  width: 100%;
  height: 3vh;
`;

function Modal(props: ModalProps) {
  const { onClose, show } = props;
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [rows, setRows] = useState<ModalRowProps[]>([
    { name: '노동욱님의 맛집리스트', locked: false },
    { name: '선동운님의 맛집리스트', locked: true },
  ]);

  const setInputVisibleFalse = () => {
    setInputVisible(false);
  };

  const handleClose = () => {
    setInputVisibleFalse();
    onClose();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    if (name !== '') {
      setRows((prevRows) => [...prevRows, { name, locked: false }]);
      setName('');
      setInputVisible(false);
    }
  };

  const showInputBox = () => {
    return (
      <ModalRow>
        <TextBox>
          <InputBox type="text" value={name} onChange={handleNameChange} placeholder="맛플리 이름 입력" />
        </TextBox>
        <ButtonBox>
          <Button type="button" onClick={handleSubmit}>
            확인
          </Button>
        </ButtonBox>
      </ModalRow>
    );
  };

  const toggleLock = (index: number) => {
    setRows((prevRows) => prevRows.map((row, i) => (i === index ? { ...row, locked: !row.locked } : row)));
  };
  return (
    <ModalWrapper show={show}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <span className={Styles.h3}>그룹선택</span>
          <AiOutlineClose size="2.4rem" onClick={handleClose} />
        </ModalHeader>
        {inputVisible ? (
          showInputBox()
        ) : (
          <ModalRow onClick={() => setInputVisible(true)}>
            <IconBox>
              <AiOutlinePlus size="4rem" color="#6E6E6E" />
            </IconBox>
            <TextBox>
              <span className={Styles.h3} style={{ color: '#6E6E6E' }}>
                새폴더 생성
              </span>
            </TextBox>
          </ModalRow>
        )}
        {rows.map((row, index) => (
          <ModalRow>
            <IconBox>
              {row.locked ? (
                <AiOutlineLock size="4rem" color="6E6E6E" onClick={() => toggleLock(index)} />
              ) : (
                <AiOutlineUnlock size="4rem" color="6E6E6E" onClick={() => toggleLock(index)} />
              )}
            </IconBox>
            <TextBox>
              <span className={Styles.h3} style={{ color: '#6E6E6E' }}>
                {row.name}
              </span>
            </TextBox>
          </ModalRow>
        ))}
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
