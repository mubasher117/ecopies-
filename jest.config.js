module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    'react-native-webview': '<rootDir>/__mocks__/react-native-webview.js',
    '@notifee/react-native': '<rootDir>/__mocks__/react-native-webview.js',
    '@react-native-firebase/messaging':
      '<rootDir>/__mocks__/react-native-firebase-messaging.js',
  },
};
