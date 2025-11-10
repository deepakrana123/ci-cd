import { by } from 'detox';
describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      // waitForAppLaunch: true,
    });
    await waitFor(element(by.id('OnboardingScreen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should display the first slide and naviagte to next slide', async () => {
    console.log('react right');
    await expect(
      element(by.text('Grab all events now only in your hands')),
    ).toBeVisible();
    await element(
      by.text('Grab all events now only in your hands'),
    ).takeScreenshot();
    await element(by.text('Next')).tap();
    await expect(
      element(by.text('Easy payment & fast event ticket')),
    ).toBeVisible();
    await element(by.text('Easy payment & fast event ticket')).takeScreenshot();
    await element(by.text('Next')).tap();
    await element(by.text('Login')).tap();
    await expect(element(by.id('LoginScreen'))).toBeVisible();
  });

  // it('should navigate to login screen on third slide', async () => {
  //   await element(by.id('OnboardingScreen')).takeScreenshot();
  //   // await element(by.text('Next')).tap();
  // });

  afterAll(async () => {
    try {
      await device.terminateApp();
    } catch (e) {}
  });
});
