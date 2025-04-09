import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './source/nav/Navigation.js';
import './global.css';

export default function App() {
  return (
    <Navigation />
  );
}
