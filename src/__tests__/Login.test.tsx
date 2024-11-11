// Login.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

const mockSetUserName = jest.fn();
const mockSetError = jest.fn();

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component', () => {
    render(
      <Login
        error=""
        setUserName={mockSetUserName}
        userName=""
        setError={mockSetError}
      />
    );

    expect(screen.getByPlaceholderText('Enter username')).toBeTruthy();
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy();
  });

  test('handles input change', () => {
    render(
      <Login
        error=""
        setUserName={mockSetUserName}
        userName=""
        setError={mockSetError}
      />
    );
    const input = screen.getByPlaceholderText('Enter username');
    fireEvent.change(input, { target: { value: 'new username' } });
    expect(mockSetUserName).toHaveBeenCalledWith('new username');
  });

  test('displays error message when username is empty', () => {
    render(
      <Login
        error="username required"
        setUserName={mockSetUserName}
        userName=""
        setError={mockSetError}
      />
    );
    expect(screen.getByText('username required')).toBeTruthy();
  });

  test('clears username and stores it in localStorage on login', () => {
    const mockSetItem = jest.fn();
    Storage.prototype.setItem = mockSetItem;

    render(
      <Login
        error=""
        setUserName={mockSetUserName}
        userName="testuser"
        setError={mockSetError}
      />
    );

    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);

    expect(mockSetUserName).toHaveBeenCalledWith('');
    expect(mockSetItem).toHaveBeenCalledWith('user', 'testuser');
  });

  test('does not set error if username is provided', () => {
    render(
      <Login
        error=""
        setUserName={mockSetUserName}
        userName="validuser"
        setError={mockSetError}
      />
    );
    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);
    expect(mockSetError).not.toHaveBeenCalled();
  });
});
