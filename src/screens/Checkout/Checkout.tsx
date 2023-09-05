import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Button, Alert, Text} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/mainNavigation';
interface PropTypes {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Checkout'>;
}

export const CheckoutScreen = ({navigation}: PropTypes) => {
  const [inAppBrowser, setInAppBrowser] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  // URL of the React web app
  const webAppUrl = 'http://localhost:3000/checkout';

  // Handle navigation events from the WebView
  const handleNavigation = (event: WebViewNavigation) => {
    setCurrentUrl(event.url);
    // Check if the WebView navigated to the success or failure page
    if (event.url.includes('diversedigital')) {
      // Display success message
      Alert.alert('Payment successful thanks!');
      setInAppBrowser(false);

      // Navigate back to the orders screen
      //   navigation.navigate('Orders');
    } else if (event.url.includes('youtube')) {
      // Display failure message
      Alert.alert('Payment failed!');
      setInAppBrowser(false);

      // Navigate back to the orders screen
      //   navigation.navigate('Orders');
    }
  };
  const handlePay = () => {
    // setInAppBrowser(true);

    // For storing key
    RNSecureKeyStore.set('key1', 'value1', {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    }).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );

    // For retrieving key
    RNSecureKeyStore.get('key1').then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );

    // For removing key
    RNSecureKeyStore.remove('key1').then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  };
  const handleScreenNavigation = () => {
    navigation.navigate({name: 'SelectLanguage', params: {}});
  };
  if (inAppBrowser) {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Text>{currentUrl}</Text>
        <Button title="Pay Rs. 1000" onPress={() => setInAppBrowser(true)} /> */}
        <WebView
          source={{uri: webAppUrl}}
          onNavigationStateChange={handleNavigation}
          style={styles.container}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <Text>{currentUrl}</Text>
      <Button title="Pay Rs. 1000" onPress={handlePay} />
      <Button title="Back" onPress={handleScreenNavigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
