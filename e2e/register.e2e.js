import { by } from 'detox';
describe('Regisiter Process', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
    await waitFor(element(by.id('LoginScreen'))).toBeVisible();
    //   .withTimeout(5000);

    await element(by.text('Next')).tap();
    await element(by.text('Next')).tap();
    await element(by.text('Login')).tap();
    await element(by.id('first_name')).typeText('devendra');
    await element(by.id('last_name')).typeText('rana');

    await element(by.id('email')).typeText('devendra@gmail.com');
    await element(by.id('password')).typeText('123456789');
    await device.pressBack();
  });

  it('should fill email and password and naviagte to home screen', async () => {
    await expect(element(by.id('Register'))).toBeVisible();
    await element(by.id('Register')).tap();
    await expect(element(by.text('Registerion Complete'))).toBeVisible();
  });

  afterAll(async () => {
    try {
      await device.terminateApp();
    } catch (e) {}
  });
});
