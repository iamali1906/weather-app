import React, { useCallback, useState } from 'react';
import { AutoComplete, Button } from 'antd';
import { Select, Space } from 'antd';
import { weatherSearchApiHandler } from '../services/weatherapi';
import { countries } from '../utils/countries';
import Slider from './Slider';

import { OptionType } from '../interfaces/weather.interface';

const Dropdown: React.FC = () => {
  const [options, setOptions] = useState<OptionType[]>(
    Object.keys(countries).map((c) => ({ label: c, value: c }))
  );
  const [cities, setCities] = useState<OptionType[]>([]);
  const [search, setSearch] = useState<string[]>([]);
  const [weather, setWeather] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const userName = localStorage.getItem('user') || 'Guest';

  const handleSearch = useCallback((value: string) => {
    const pattern = new RegExp(value, 'i');
    setOptions((prevOptions) =>
      prevOptions.filter((option) => pattern.test(option.label))
    );
  }, []);

  const selectCountry = useCallback((value: string) => {
    setCities(
      countries[value as keyof typeof countries].map((city) => ({
        label: city,
        value: city,
      }))
    );
  }, []);

  const handleChange = (value: string[]) => {
    setSearch(value);
  };

  const searchButtonHandler = async () => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        search.map((city) => weatherSearchApiHandler(city))
      );
      setWeather(responses);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dropdown-container">
        <h3>Welcome {userName}</h3>
        <Space style={{ width: '100%' }} direction="vertical">
          <AutoComplete
            data-testid="country-search"
            onSelect={selectCountry}
            style={{ width: '80%' }}
            onSearch={handleSearch}
            placeholder="Search country"
            options={options}
          />
        </Space>
        <Space style={{ width: '100%' }} direction="vertical">
          <Select
            mode="multiple"
            allowClear
            style={{ minWidth: '80%', maxWidth: '80%' }}
            placeholder="Select City"
            onChange={handleChange}
            options={cities}
          />
        </Space>

        <Button
          type="primary"
          loading={loading}
          onClick={searchButtonHandler}
          style={{ padding: '0 50px' }}
        >
          Search
        </Button>

        <Slider weather={weather} />
      </div>
    </>
  );
};

export default Dropdown;
