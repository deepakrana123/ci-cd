import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomHeading from '../../../src/components/global/CustomHeading';
import { goBack } from '../../../src/utils/NavigationUtil';

jest.mock('../../../src/utils/NavigationUtil', () => ({
  goBack: jest.fn(),
}));
describe('Heading Component', () => {
  test('Should renders the title correctly', () => {
    const test = 'Test title';
    const { getByText } = render(<CustomHeading title={test} />);
    expect(getByText(test)).toBeTruthy();
  });
  test('matches snapshot', () => {
    const { toJSON } = render(<CustomHeading title="Login Header" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call goback when back button is present', () => {
    const { getByTestId } = render(<CustomHeading title="Test" />);
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);
    expect(goBack).toHaveBeenCalled();
  });
});
