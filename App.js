import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './source/nav/Navigation.js';
import { Provider } from 'react-redux';
import store from './source/redux/store.js';
import './global.css';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>

  );
}
