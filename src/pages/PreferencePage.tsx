import React, { useState } from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';

const PreferencePageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.4rem;
  width: 100%;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white=space: nowrap;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  white=space: nowrap;
  color: rgba(128, 128, 128, 1);
`;
const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
  padding-bottom: 2.4rem;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
`;

const Group = styled.div`
  width: 32rem;
`;

const GroupTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
`;
const GroupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  font-weight: 600;
  background-color: white;
  padding: 2.4rem;
  box-shadow: 0.5rem 0.5rem 1.2rem rgba(0, 0, 0, 0.1);
`;

function PreferencePage() {
  return (
    <PreferencePageContainer>
      <Container>
        <div>
          <Title className={Styles.h1}>나에게 맞는 그룹을 선택해보세요!</Title>
          <SubTitle className={Styles.h3}>해당 그룹의 데이터를 바탕으로 음식점을 추천해 드립니다.</SubTitle>
        </div>
        <GroupContainer>
          <Group>
            <GroupTitle className={Styles.h2}>A</GroupTitle>
            <GroupContent>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
            </GroupContent>
          </Group>
          <Group>
            <GroupTitle className={Styles.h2}>B</GroupTitle>
            <GroupContent>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
            </GroupContent>
          </Group>
          <Group>
            <GroupTitle className={Styles.h2}>C</GroupTitle>
            <GroupContent>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
            </GroupContent>
          </Group>
          <Group>
            <GroupTitle className={Styles.h2}>D</GroupTitle>
            <GroupContent>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
              <div className={Styles.h3}>또래끼리</div>
              <div className={Styles.h3}>친구끼리</div>
              <div className={Styles.h3}>연인끼리</div>
              <div className={Styles.h3}>가족끼리</div>
            </GroupContent>
          </Group>
        </GroupContainer>
      </Container>
    </PreferencePageContainer>
  );
}

export default PreferencePage;
