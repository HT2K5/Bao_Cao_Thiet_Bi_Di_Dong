import { initializeApp } from 'firebase/app';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBpEgOMK3tKDT2cm5cnbxo8Q8zJdsZBWZg',
  authDomain: 'farmdirect-a7eb1.firebaseapp.com',
  projectId: 'farmdirect-a7eb1',
  storageBucket: 'farmdirect-a7eb1.firebasestorage.app',
  messagingSenderId: '521796642472',
  appId: '1:521796642472:web:8153abaa8a2e8cb293449d',
  measurementId: 'G-G1X9W0NF3M',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
