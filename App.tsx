import React from 'react';
import {Platform} from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {MainNavigator} from './src/navigation/mainNavigation';
import {ThemeProvider} from './src/providers/ThemeProvider';

async function onAppBootstrap() {
  if (Platform.OS === 'ios') {
    return;
  }
  // Register the device with FCM
  try {
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();
    console.log(token);
  } catch (error) {
    console.log('ERROR onAppBootstrap');
    console.log(error);
  }
  // Save the token
  // await postToApi('/users/1234/tokens', { token });
}
function App(): React.JSX.Element {
  onAppBootstrap();
  async function onMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage,
  ) {
    try {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    } catch (error) {
      console.log(error);
    }

    notifee.displayNotification({
      title: message?.data?.title,
      body: message?.data?.body,
      android: {
        channelId: 'default',
      },
    });
  }
  if (Platform.OS === 'android') {
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }

  return (
    <ThemeProvider>
      <MainNavigator />
    </ThemeProvider>
  );
}

export default App;
