import { useState } from 'react';
import Dropdown from '../components/DropDown';
import Login from '../components/Login';

function Weather() {
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<string>('');

  return (
    <div>
      {localStorage.getItem('user') ? (
        <Dropdown />
      ) : (
        <Login {...{ error, setUserName, userName, setError }} />
      )}
    </div>
  );
}

export default Weather;
