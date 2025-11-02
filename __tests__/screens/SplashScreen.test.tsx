import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import SplashScreen from '../../src/screens/SplashScreen';
import {
  prepareNavigation,
  resetAndNavigate,
} from '../../src/utils/NavigationUtil';

// 🧠 Mock navigation utils
jest.mock('../../src/utils/NavigationUtil', () => ({
  prepareNavigation: jest.fn(),
  resetAndNavigate: jest.fn(),
}));

// 🧠 Mock image asset (RN packs require a valid module)
jest.mock('../../src/assets/images/logo.png', () => 'mocked-logo');

// 🧠 Use fake timers so we can fast-forward setTimeout
jest.useFakeTimers();

describe('SplashScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo and loading indicator correctly', () => {
    const { getByTestId } = render(<SplashScreen />);

    expect(getByTestId('logo-image')).toBeTruthy();
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('calls prepareNavigation on mount', () => {
    render(<SplashScreen />);
    expect(prepareNavigation).toHaveBeenCalledTimes(1);
  });

  it('navigates to OnBoardingScreen after 3 seconds', async () => {
    render(<SplashScreen />);

    // Fast-forward 3 seconds
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(resetAndNavigate).toHaveBeenCalledWith('OnBoardingScreen');
    });
  });

  it('does not navigate immediately', () => {
    render(<SplashScreen />);
    // Verify before timers run
    expect(resetAndNavigate).not.toHaveBeenCalled();
  });
});
