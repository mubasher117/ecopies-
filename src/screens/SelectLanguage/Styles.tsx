import {StyleSheet} from 'react-native';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    headingStyle: {
      color: '#191919',
      fontSize: 25,
      textAlign: 'center',
    },
    imageStyle: {
      width: 64,
      height: 64,
      marginTop: 30,
    },
    elementContainer: {
      width: '100%',
      marginTop: 30,
      alignItems: 'center',
    },
    textStyle: {
      color: '#191919',
      fontSize: 25,
    },
    separatorStyle: {
      height: 0.5,
      width: '60%',
      backgroundColor: '#C2C2C2',
      marginTop: 10,
    },
    themeText: {
      fontSize: 18,
      textAlign: 'center',
      color: colors.primary,
    },
  });
