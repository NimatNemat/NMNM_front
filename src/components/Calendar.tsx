import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState<boolean>(false);

  const handleChange = (date: Date) => {
    if (!startDate) {
      setShowMonthPicker(true);
    } else {
      setShowMonthPicker(false);
    }
    setStartDate(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat={showMonthPicker ? 'MM/yyyy' : 'MM/dd/yyyy'}
      placeholderText="년도를 선택하세요."
    />
  );
}

export default CustomDatePicker;
