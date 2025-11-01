import reducer, {
  loginSuccess,
  loginState,
  loginFailure,
  logutFailure,
  logout,
} from '../../../src/redux/authSlice';

describe('authSlice', () => {
  const intialState = {
    userToken: null,
    isLoggedIn: false,
    loading: false,
  };

  it('should return the intial state when passed an empty', () => {
    const nextState = reducer(undefined, { type: '' });
    expect(nextState).toEqual(intialState);
  });

  it('should handle login state ,(start loading)', () => {
    const nextState = reducer(intialState, loginState());
    expect(nextState.isLoggedIn).toBe(false);
    expect(nextState.loading).toBe(false);
    expect(nextState.userToken).toBeNull();
  });
  it('should handle loginSuccess ,(start loading)', () => {
    const token = 'sample_token';
    const nextState = reducer(intialState, loginSuccess(token));
    expect(nextState.isLoggedIn).toBe(true);
    expect(nextState.loading).toBe(true);
    expect(nextState.userToken).toBe(token);
  });
  it('should handle loginFailure ', () => {
    const preState = { ...intialState, loading: false };
    const nextState = reducer(preState, loginFailure());
    expect(nextState.isLoggedIn).toBe(false);
    expect(nextState.loading).toBe(false);
    expect(nextState.userToken).toBeNull();
  });
  it('should handle logoutFailure ,(typo action)', () => {
    const preState = { isLoggedIn: true, userToken: 'abc', loading: true };
    const nextState = reducer(preState, logutFailure());
    expect(nextState.isLoggedIn).toBe(false);
    expect(nextState.loading).toBe(false);
    expect(nextState.userToken).toBeNull();
  });
  it('should handle logout ', () => {
    const preState = { isLoggedIn: true, userToken: 'abc', loading: true };
    const nextState = reducer(preState, logutFailure());
    expect(nextState).toEqual(preState);
  });
});
