// Example of Localization in React Native Multi Language App
// https://aboutreact.com/localization-in-react-native/

import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import {LocalizedText} from '../../assets/locales/LocalizedStrings';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/mainNavigation';
import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '../../providers/ThemeProvider';
import {getStyles} from './Styles';

interface PropTypes {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SelectLanguage'>;
}
export const SelectLanguageScreen = ({navigation}: PropTypes) => {
  const [lanState, setLangState] = useState<string>('en');
  const themeContext = useContext(ThemeContext);
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const lang = [
    {id: 'lang1', shortForm: 'hi', longForm: 'Hindi'},
    {id: 'lang2', shortForm: 'ma', longForm: 'Marathi'},
    {id: 'lang3', shortForm: 'en', longForm: 'English'},
    {id: 'lang4', shortForm: 'ur', longForm: 'Urdu'},
  ];

  const setText = (value: string) => {
    LocalizedText.setLanguage(value);
    setLangState(value);
  };
  const handleNavigation = () => {
    navigation.navigate({name: 'Checkout', params: {}});
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.headingStyle}>
          Please Select Preferred Language
        </Text>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/language.png',
          }}
          style={styles.imageStyle}
        />
        <ScrollView style={{marginTop: 30, width: '80%'}}>
          {lang.map(item => (
            <View style={styles.elementContainer} key={item.id}>
              <Text
                onPress={() => setText(item.shortForm)}
                style={[
                  styles.textStyle,
                  {
                    color:
                      lanState === item.shortForm
                        ? colors.primary
                        : styles.textStyle.color,
                  },
                ]}>
                {item.longForm}
              </Text>
              <View style={styles.separatorStyle} />
            </View>
          ))}
        </ScrollView>
        <Text>{LocalizedText.greetings}</Text>
        <Button title="Pay" onPress={handleNavigation} />
        <Text
          style={styles.themeText}
          onPress={() => {
            themeContext?.toggleTheme();
          }}>
          {themeContext?.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </View>
    </SafeAreaView>
  );
};
