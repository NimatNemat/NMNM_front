import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StyledInput from '../components/Input';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';
import IdFindComponent from '../components/IdFindComponent';
import PwFindComponent from '../components/PwFindComponent';

const IdSearchPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justfiy-content: center;
  align-items: flex-start;
  width: 60rem;
  gap: 2.4rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  border: 0.2rem solid #b4b4b4;
  width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NavItem = styled.div<{ active?: boolean }>`
  color: ${({ active }) => (active ? 'black' : 'white')};
  background: ${({ active }) => (active ? '#FFFDF5' : 'rgba(0, 0, 0, 0.6)')};
  width: 30rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function IdsearchPage() {
  const [selected, setSelected] = useState('id');

  return (
    <IdSearchPageContainer className="IdsearchPage">
      <Container>
        <span className={Styles.h3}>아이디/비밀번호 찾기</span>
        <Div>
          <Nav>
            <NavItem className={Styles.h3} active={selected === 'id'} onClick={() => setSelected('id')}>
              아이디 찾기
            </NavItem>
            <NavItem className={Styles.h3} active={selected === 'pw'} onClick={() => setSelected('pw')}>
              비밀번호 찾기
            </NavItem>
          </Nav>
          {selected === 'id' ? <IdFindComponent /> : <PwFindComponent />}
        </Div>
      </Container>
    </IdSearchPageContainer>
  );
}

export default IdsearchPage;
