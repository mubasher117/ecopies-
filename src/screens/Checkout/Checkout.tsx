import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Button, Alert, Text} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';

export const Checkout = () => {
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
      <Button title="Pay Rs. 1000" onPress={() => setInAppBrowser(true)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
