import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getMonth, getYear } from 'date-fns';
import styled from 'styled-components';
import { range } from 'lodash';
import Styles from '../config/globalFontStyle.module.css';

const StyledDatePicker = styled(DatePicker)`
  background-color: transparent;
  text-align: center;
  padding: 0.8rem;
  background-color: rgba(255, 137, 35, 0.6);
  border: 1px solid #dfdfdf;
  border-radius: 2rem;
  color: white;
  &::placeholder {
    color: white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: 4.8rem;
`;

interface CustomDatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

function CustomDatePicker(props: CustomDatePickerProps) {
  const { date, setDate } = props;

  const years = range(1900, getYear(new Date()) + 1);
  // 연도 선택 select box에 보여질 데이터 : range(시작 연도, 끝 연도, 연도 간격)
  // 월 선택 select box에 보여질 데이터
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  return (
    <Wrapper>
      <StyledDatePicker
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <div className="custom-react-datepicker__select-item">
              {/* 연도 선택 select box */}
              <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
                {years.map((option: number) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span>년</span>
            </div>
            <div className="custom-react-datepicker__select-item">
              {/* 월 선택 select box */}
              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span>월</span>
            </div>
          </div>
        )}
        renderDayContents={(day) => {
          return <span className={Styles.p2bold}>{day}</span>;
        }}
        className={Styles.p1regular}
        locale={ko}
        selected={date}
        dateFormat="yyyy-MM-dd"
        onChange={(date: Date) => setDate(date)}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText="날짜를 선택해주세요."
      />
    </Wrapper>
  );
}

export default CustomDatePicker;
