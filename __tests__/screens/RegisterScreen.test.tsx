import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import RegisterScreen from '../../src/screens/RegisterScreen';
import { navigate } from '../../src/utils/NavigationUtil';

// 🧠 Mock Navigation
jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and button correctly', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    expect(getByPlaceholderText('First name')).toBeTruthy();
    expect(getByPlaceholderText('Last name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByTestId('Register')).toBeTruthy();
    expect(getByText('Already have an account? Login In')).toBeTruthy();
  });

  it('handles input changes correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    const firstNameInput = getByPlaceholderText('First name');
    const lastNameInput = getByPlaceholderText('Last name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(firstNameInput.props.value).toBe('John');
    expect(lastNameInput.props.value).toBe('Doe');
    expect(emailInput.props.value).toBe('john@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('shows validation errors for empty inputs', async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    fireEvent.press(getByTestId('Register'));

    await waitFor(() => {
      expect(getByText('Please enter your first name')).toBeTruthy();
      expect(getByText('Enter your last name')).toBeTruthy();
      expect(getByText('Please enter your email')).toBeTruthy();
      expect(getByText('Enter your password')).toBeTruthy();
    });
  });

  it('shows validation error for invalid email', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalidEmail');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    fireEvent.press(getByTestId('Register'));

    await waitFor(() => {
      expect(getByText('Please enter a valid email')).toBeTruthy();
    });
  });

  it('navigates to LoginScreen when footer link is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    fireEvent.press(getByText('Already have an account? Login In'));

    expect(navigate).toHaveBeenCalledWith('LoginScreen');
  });
});
