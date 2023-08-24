import React from 'react';
import {Platform} from 'react-native';
import {Checkout} from './src/screens/Checkout/Checkout';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
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
function App(): JSX.Element {
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
  return <Checkout />;
}

export default App;
