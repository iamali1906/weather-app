import React from 'react';
import { WeatherDataProps } from '../interfaces/weather.interface';

const Card: React.FC<WeatherDataProps> = ({ weather }) => {
  const now = new Date();
  const day = now.toLocaleString('default', { month: 'long' });
  const date = now.getDate();
  const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });

  const status = weather?.weather?.[0]?.main?.toLowerCase();

  const weatherStatusHandler = () => {
    if (weather?.cod === '404') return 'error';
    if (status === 'clear') return 'clear';
    if (status === 'sunny') return 'sunny';
    if (status === 'clouds') return 'cloudy';
    if (status === 'rain') return 'rain';
  };

  return (
    <div className="card-list">
      <li className={' card-container ' + weatherStatusHandler()}>
        <div className="weather-card">
          <div className="day">
            {' '}
            {day}, <span>{date}</span> <br /> {dayOfWeek}
          </div>
          <h2>
            {weather?.name ? weather?.name : weather?.city} {}
          </h2>
          <div className="features">
            <div className="high">
              Temprature :{' '}
              <span>
                {weather?.main?.temp
                  ? `${weather?.main?.temp_min}/${weather?.main?.temp_max}`
                  : ' N/A'}
              </span>
            </div>
            <div className="high">
              Humidity: <span>{weather?.main?.humidity ?? 'N/A'}</span>
            </div>
            <div className="high">
              Pressure: <span>{weather?.main?.pressure ?? 'N/A'}</span>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Card;
