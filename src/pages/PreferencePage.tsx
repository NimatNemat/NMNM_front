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
  align-items: center;
  gap: 2.4rem;
  width: 120rem;
`;
const Title = styled.div`
  align-items: center;
  justify-content: center;
  white=space: nowrap;
  width: 36rem;
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white=space: nowrap;
  color: rgba(128, 128, 128, 1);
  width: 36rem;
`;
const GroupContainer = styled.div`
  display: flex;
  width: 36rem;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
  overflow-x: auto;
  white-space: nowrap;
  background-color: white;
  box-shadow: 0.5rem 0.5rem 1.2rem rgba(0, 0, 0, 0.1);
`;

const Group = styled.div`
  width: 36rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
`;

const GroupTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.4rem;
`;
const GroupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0, 2.4rem;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  width: 36rem;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36rem;
  height: 6rem;
`;

function PreferencePage() {
  return (
    <PreferencePageContainer>
      <Container>
        <Title className={Styles.h3}>나에게 맞는 그룹을 선택해보세요!</Title>
        <SubTitle className={Styles.h4}>해당 그룹의 데이터를 바탕으로 음식점을 추천해 드립니다.</SubTitle>
        <GroupContainer>
          <Group>
            <GroupTitle className={Styles.h3}>A</GroupTitle>
            <GroupContent>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
            </GroupContent>
          </Group>
          <Group>
            <GroupTitle className={Styles.h3}>B</GroupTitle>
            <GroupContent>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
            </GroupContent>
          </Group>
          <Group>
            <GroupTitle className={Styles.h3}>C</GroupTitle>
            <GroupContent>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
            </GroupContent>
          </Group>
          <Group>
            <GroupTitle className={Styles.h3}>D</GroupTitle>
            <GroupContent>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
              <div className={Styles.p1bold}>또래끼리</div>
              <div className={Styles.p1bold}>친구끼리</div>
              <div className={Styles.p1bold}>연인끼리</div>
              <div className={Styles.p1bold}>가족끼리</div>
            </GroupContent>
          </Group>
        </GroupContainer>
        <BtnContainer>
          <StyledButton
            onClick={() => {
              console.log('click');
            }}
          >
            <div className={Styles.p1bold}>다음</div>
          </StyledButton>
        </BtnContainer>
      </Container>
    </PreferencePageContainer>
  );
}

export default PreferencePage;
