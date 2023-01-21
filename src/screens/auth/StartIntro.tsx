import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AuthScreen from 'src/components/screen/AuthScreen';
import Security from 'src/assets/icons/start.svg';
import Text from 'src/components/Text';
import ArrowIcon from 'src/assets/icons/arrow.svg';
import useThemeStyles from 'src/hooks/useThemeStyles';

export default function StartIntro({navigation, route}) {
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    centercontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottombutton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
    bottomview: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    first: {
      fontSize: 24,
      lineHeight: 30,
      color: colors.black,
      padding: 60,
      textAlign: 'center',
      fontWeight: '600',
    },
    firs: {
      fontSize: 24,
      lineHeight: 30,
      color: colors.primary,
      fontWeight: '600',
    },
  });
  return (
    <AuthScreen
      onBackPressed={function (): void {
        navigation.goBack();
      }}>
      <View style={styles.centercontainer}>
        <Security />
        <Text style={styles.first}>
          Let’s show your interesting{' '}
          <Text style={styles.firs}>personality</Text> & get you better matches.
        </Text>
      </View>

      <View style={styles.bottomview}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('personalityPhoto', {data: route.params.data})
          }
          style={styles.bottombutton}>
          <ArrowIcon />
        </TouchableOpacity>
      </View>
    </AuthScreen>
  );
}
