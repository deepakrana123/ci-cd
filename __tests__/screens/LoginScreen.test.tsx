import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store, persistor } from '../../src/redux/store';
import { navigate } from '../../src/utils/NavigationUtil';
import LoginScreen from '../../src/screens/LoginScreen';

// 🧠 Mock Navigation
jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

// 🧠 Mock redux-persist so we can reset persistor safely
jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockReturnValue({
    purge: jest.fn(),
    flush: jest.fn(),
  }),
}));

const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe('LoginScreen', () => {
  beforeEach(() => {
    persistor.purge();
    jest.clearAllMocks();
  });

  it('renders all fields correctly', () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <LoginScreen />,
    );
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
  });

  it('handles text input correctly', () => {
    const { getByPlaceholderText } = renderWithProvider(<LoginScreen />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('shows validation errors when inputs are empty', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = renderWithProvider(
      <LoginScreen />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), '');
    fireEvent.changeText(getByPlaceholderText('Password'), '');
    fireEvent.press(getByTestId('Login'));

    await waitFor(() => {
      expect(getByText('Please enter your email')).toBeTruthy();
      expect(getByText('Enter your password')).toBeTruthy();
    });
  });

  it('sets loading to true when login is valid', async () => {
    const { getByPlaceholderText, getByTestId } = renderWithProvider(
      <LoginScreen />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByTestId('Login'));

    await waitFor(() => {
      // We can check that the button goes into a loading state
      const button = getByTestId('Login');
      expect(button.props.loading).toBe(true);
    });
  });

  it('navigates to RegisterScreen when footer link is pressed', () => {
    const { getByText } = renderWithProvider(<LoginScreen />);
    fireEvent.press(getByText("Don't have an account? Sign Up"));
    expect(navigate).toHaveBeenCalledWith('RegisterScreen');
  });
});
