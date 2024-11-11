import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SliderProps } from '../interfaces/weather.interface';

import Card from './Card';
const Slider: React.FC<SliderProps> = ({ weather }) => {
  return (
    <div style={{ width: '100%' }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        modules={[Pagination, Navigation]}
        navigation={true}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {weather.map((data, index) => (
          <SwiperSlide key={index}>
            <Card weather={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
