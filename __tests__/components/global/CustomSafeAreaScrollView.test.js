import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import CustomSafeAreaScrollView from '../../../src/components/global/CustomSafeAreaScrollView';
describe('CustomSafeAreaScrollView', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <CustomSafeAreaScrollView>
        <Text>Test Child</Text>
      </CustomSafeAreaScrollView>,
    );

    expect(getByText('Test Child')).toBeTruthy();
  });
});
