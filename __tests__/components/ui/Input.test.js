import { act, fireEvent, render, screen } from '@testing-library/react-native';
import Input from '../../../src/components/ui/Input';

describe('Input', () => {
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  it('should render correctly', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        testID="inputComponent"
      />,
    );
    expect(getByTestId('inputComponent')).toBeTruthy();
  });

  it('should handle multiple focus and blur events', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
    );
  });
});
