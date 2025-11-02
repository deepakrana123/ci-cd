import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnBoardingScreen from '../../src/screens/OnBoardingScreen';
import { navigate } from '../../src/utils/NavigationUtil';

// 🧠 Mock navigation util
jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

// 🧠 Mock react-native-swiper (simplify rendering)
jest.mock('react-native-swiper', () => {
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

// 🧠 Mock OnboardItem (focus on props, not UI)
jest.mock('../../src/components/global/OnboardItem', () => {
  const React = require('react');
  const { Text, TouchableOpacity, View } = require('react-native');
  return ({
    title,
    subtitle,
    onPressFirst,
    onPressSecond,
    buttonTitleFirst,
    buttonTitleSecond,
  }: any) => (
    <View>
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
      {buttonTitleFirst && (
        <TouchableOpacity
          testID={`btn-${buttonTitleFirst}`}
          onPress={onPressFirst}
        >
          <Text>{buttonTitleFirst}</Text>
        </TouchableOpacity>
      )}
      {buttonTitleSecond && (
        <TouchableOpacity
          testID={`btn-${buttonTitleSecond}`}
          onPress={onPressSecond}
        >
          <Text>{buttonTitleSecond}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

describe('OnBoardingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all slides with correct titles and subtitles', () => {
    const { getByText } = render(<OnBoardingScreen />);

    // Slide 1 content
    expect(getByText('Grab all events now only in your hands')).toBeTruthy();
    expect(
      getByText('Easy to find nearby events based on your interests.'),
    ).toBeTruthy();

    // Slide 2 content
    expect(getByText('Easy payment & fast event ticket')).toBeTruthy();
    expect(
      getByText('Get amazing offers and discounts on your event tickets.'),
    ).toBeTruthy();

    // Slide 3 content
    expect(getByText("Let's go to your favourite event now")).toBeTruthy();
    expect(
      getByText(
        'Create your account and explore the community of events & organizers.',
      ),
    ).toBeTruthy();
  });

  it('calls navigate("LoginScreen") when Login button is pressed', () => {
    const { getByTestId } = render(<OnBoardingScreen />);
    const loginButton = getByTestId('btn-Login');
    fireEvent.press(loginButton);
    expect(navigate).toHaveBeenCalledWith('LoginScreen');
  });

  it('calls navigate("RegisterScreen") when Sign up button is pressed', () => {
    const { getByTestId } = render(<OnBoardingScreen />);
    const signUpButton = getByTestId('btn-Sign up');
    fireEvent.press(signUpButton);
    expect(navigate).toHaveBeenCalledWith('RegisterScreen');
  });

  it('moves to next slide when Next button is pressed (mocked scrollBy)', () => {
    // Mock scrollBy behavior
    const scrollByMock = jest.fn();
    jest
      .spyOn(React, 'useRef')
      .mockReturnValueOnce({ current: { scrollBy: scrollByMock } });

    const { getAllByText } = render(<OnBoardingScreen />);
    const nextButtons = getAllByText('Next');
    fireEvent.press(nextButtons[0]);
    expect(scrollByMock).toHaveBeenCalledWith(1);
  });
});
