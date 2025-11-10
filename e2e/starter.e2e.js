describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      // waitForIdleTimeout: 0,
      waitForAppLaunch: true,
    });
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should have logo image', async () => {
    console.log('react right');
    await waitFor(element(by.id('splash-debug-text'))).toBeVisible();
    await waitFor(element(by.id('logo-image'))).toBeVisible();
    await waitFor(element(by.id('loading-indicator'))).toBeVisible();
  });

  it('should navigate to Onboarding Screen', async () => {
    await waitFor(element(by.id('OnboardingScreen')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id('OnboardingScreen'))).toBeVisible();
  });

  afterAll(async () => {
    try {
      await device.terminateApp();
    } catch (e) {}
  });
});
