import React, { useState } from 'react';
import Input from '../components/Input';

function LoginPage() {
  const [value, setValue] = useState('');
  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className="LoginPage">
      <Input value={value} type="text" onChange={handleEvent} />
    </div>
  );
}

export default LoginPage;
