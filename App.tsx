import React from 'react';
import {Checkout} from './src/screens/Checkout/Checkout';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
async function onAppBootstrap() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();
  console.log(token);

  // Save the token
  // await postToApi('/users/1234/tokens', { token });
}
function App(): JSX.Element {
  onAppBootstrap();
  async function onMessageReceived(message) {
    console.log(message.data);
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'hollow',
    });

    notifee.displayNotification({
      title: message.data.title,
      body: message.data.body,
      android: {
        channelId: 'default',
      },
    });
    // notifee.displayNotification(JSON.parse(message.data.notifee));
  }

  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);

  return <Checkout />;
}

export default App;
