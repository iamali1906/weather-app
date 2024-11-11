import { render, screen } from '@testing-library/react';
import React from 'react';
import Dropdown from '../components/DropDown';

jest.mock('../services/weatherapi');
jest.mock('../utils/countries', () => ({
  countries: {
    Usa: ['New York', 'Los Angeles'],
    Canada: ['Toronto', 'Vancouver'],
  },
}));
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div className="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div className="swiper-slide">{children}</div>
  ),
}));
jest.mock('swiper/modules', () => ({
  Pagination: () => {},
  Navigation: () => {},
}));
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));

describe('Dropdown Component', () => {
  test('renders correctly and displays welcome message', () => {
    render(<Dropdown />);
    expect(screen.getByText('Welcome Guest')).toBeTruthy();
  });
});
