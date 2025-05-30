import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavigationApp from './src/navigation/NavigationApp.js';
import TabNavigator from "./src/navigation/TabNavigator";
import LoginNavigation from "./src/navigation/LoginNavigation";
export default function App() {
  return (
    <NavigationContainer>
      <LoginNavigation r/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
