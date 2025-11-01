import { render } from '@testing-library/react-native';
import App from '../App';
test('SnapShot', () => {
  const { toJSON } = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});
