import {View, StyleSheet, Image, TextInputBase} from 'react-native';
import React from 'react';
import AuthScreen from 'src/components/screen/AuthScreen';
import ImageLogo from 'src/assets/images/signupwelcom.png';
import Text from 'src/components/Text';
import Button from 'src/components/pressable/Button';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Link from 'src/components/Link';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function SingWelcome({navigation}) {
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    image: {
      width: 262,
      height: 265,
    },
    lowerdesign: {
      flex: 1,
      marginHorizontal: 30,
    },

    signin: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 1,
    },
    welcomeText: {
      fontSize: 32,
      lineHeight: 38.88,
      fontWeight: '600',
      color: colors.black,
      textAlign: 'center',
      marginBottom: 30,
    },
    link: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 14,
    },
    account: {
      fontWeight: '700',
    },
  });
  return (
    <AuthScreen
      onBackPressed={() => {
        navigation.goBack();
      }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={ImageLogo} />
      </View>
      <View style={styles.lowerdesign}>
        <Text style={styles.welcomeText}>Welcome to Bantuz Singles!</Text>

        <Button onPress={() => navigation.navigate('securityDisclaimer')}>
          Create Account
        </Button>

        <View style={styles.signin}>
          <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
            <Text style={styles.account}>
              Already have an account?
              <Text style={styles.link}>{' Sign in →'}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthScreen>
  );
}
