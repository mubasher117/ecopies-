import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SelectLanguageScreen} from '../screens/SelectLanguage/SelectLanguage';
import {CheckoutScreen} from '../screens/Checkout/Checkout';
import {ThemeContext} from '../providers/ThemeProvider';
import {DarkTheme, DefaultTheme} from '../styles/Themes';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: {};
  SelectLanguage: {};
  Checkout: {};
};
const screenOptions = {
  headerShown: false, // Hide header for all screens
};
export const MainNavigator = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <NavigationContainer
      theme={themeContext?.theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="SelectLanguage" component={SelectLanguageScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
