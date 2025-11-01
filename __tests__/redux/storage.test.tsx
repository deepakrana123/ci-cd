// import { store } from '../../../src/redux/store';
// import authReducer, {
//   loginSuccess,
//   logout,
// } from '../../../src/redux/authSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// jest.mock('@react-native-async-storage/async-storage', () => ({
//   setItem: jest.fn(() => Promise.resolve(null)),
//   getItem: jest.fn(() => Promise.resolve(null)),
//   removeItem: jest.fn(() => Promise.resolve(null)),
// }));

// describe('Redux store', () => {
//   it('should initialize with correct default store', () => {
//     const state = store.getState();
//     expect(state).toHaveProperty('auth');
//   });
//   it('should update auth state when loginSuccess', () => {
//     const user = '2nfadngdsn<GNDMG';
//     store.dispatch(loginSuccess(user));
//     const state = store.getState();
//     expect(state.auth.userToken).toEqual(user);
//   });
//   it('should clear auth state when logout is disptached', () => {
//     store.dispatch(logout());
//     const state = store.getState();
//     expect(state.auth.userToken).toBeNull();
//   });
//   it('should use AsyncStorage for persistence', () => {
//     expect(AsyncStorage.setItem).toBeDefined();
//     expect(AsyncStorage.getItem).toBeDefined();
//     expect(AsyncStorage.removeItem).toBeDefined();
//   });
// });

import { store } from '../../src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, logout } from '../../src/redux/authSlice';
