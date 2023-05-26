import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FacebookShareButton, TwitterShareButton, InstapaperShareButton } from 'react-share';
import styled from 'styled-components';

interface ShareProps {
  shareUrl: string;
  title: string;
}

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

const StyledDiv = styled.div`
  width: 100%;
  border: 1px solid #dfdfdf;
  background: #fffdf5;
  ::placeholder {
    font-size: 1.4rem;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
`;
function ShareComponent(props: ShareProps) {
  const { shareUrl, title } = props;
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert('링크가 복사되었습니다.');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        gap: '1.6rem',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', width: '100%' }}>
        <StyledDiv>
          <div style={{ padding: '1.6rem 1.6rem', width: '100%' }}>{shareUrl}</div>
        </StyledDiv>
      </div>
      <div style={{ display: 'flex', gap: '1.6rem', justifyContent: 'center', alignItems: 'center' }}>
        <Btn>
          <FacebookShareButton url={shareUrl} quote={title} className="share-button">
            <span>Facebook</span>
          </FacebookShareButton>
        </Btn>
        <Btn>
          <TwitterShareButton url={shareUrl} title={title} className="share-button">
            <span>Twitter</span>
          </TwitterShareButton>
        </Btn>
        <Btn
          onClick={() => {
            copyToClipboard();
          }}
        >
          복사하기
        </Btn>
      </div>
    </div>
  );
}

export default ShareComponent;
