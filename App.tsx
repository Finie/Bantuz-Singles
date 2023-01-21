import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ModalPortal} from 'react-native-modals';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import {StripeProvider} from '@stripe/stripe-react-native';

import HomeNavigator from 'src/screens/home/nav/HomeNavigator';
import AuthNavigator from 'src/screens/auth/AuthNavigator';
import ProfileScreen from 'src/screens/home/ProfileScreen';
import ParalaxScreen from 'src/screens/home/ParalaxScreen';
import PreferenceScreen from 'src/screens/home/PreferenceScreen';
import BlockedContacts from 'src/screens/home/BlockedContacts';
import PriceQuotation from 'src/screens/home/PriceQuotation';
import Onboarding from 'src/screens/auth/Onboarding';
import InterestsScreen from 'src/screens/auth/InterestsScreen';
import BaseContextProvider from 'src/context/BaseContextProvider';
import Helpers from 'src/Helpers';
import EncryptionStore from 'src/data/EncryptionStore';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Close from 'src/assets/icons/close.svg';

const App = () => {
  const [userData, setuserData] = useState({});

  const {colors} = useThemeStyles();

  const toastConfigs = {
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    success: ({...props}) => (
      <BaseToast
        {...props}
        text1Style={styles.toastSuccesstext1style2}
        text2Style={styles.toasett2styles}
        style={styles.errorstyle2}
        renderTrailingIcon={() => (
          <TouchableOpacity style={styles.tailing} onPress={() => Toast.hide()}>
            <Close />
          </TouchableOpacity>
        )}
      />
    ),
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
    error: ({...props}) => (
      <ErrorToast
        {...props}
        text1Style={styles.toastSuccesstext1style}
        text2Style={styles.toasett2styles}
        text2NumberOfLines={2}
        style={styles.errorstyle}
        renderTrailingIcon={() => (
          <TouchableOpacity style={styles.tailing} onPress={() => Toast.hide()}>
            <Close />
          </TouchableOpacity>
        )}
      />
    ),
  };

  const restoreUser = async () => {
    const result = await EncryptionStore.retrieveBantuUser();

    // console.log('====================Userdata================');
    // console.log(result);
    // console.log('====================================');

    if (!Helpers.isEmpty(result)) {
      console.log('====================Userdata================');
      console.log(result);
      console.log(!Helpers.isEmpty(result));
      console.log('====================================');
      setuserData(result);
    }
    SplashScreen.hide();
  };
  useEffect(() => {
    restoreUser();
  }, []);

  const styles = StyleSheet.create({
    toastSuccesstext1style: {
      fontSize: 15,
      fontWeight: '400',
      color: colors.danger,
    },
    toastSuccesstext1style2: {
      fontSize: 18,
      fontWeight: '400',
      color: colors.warning,
    },
    toasett2styles: {
      fontWeight: '600',
      fontSize: 14,
      color: colors.black,
    },
    tailing: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    errorstyle: {
      backgroundColor: colors.white,
      borderLeftColor: colors.danger,
      color: 'red',
    },
    errorstyle2: {
      backgroundColor: colors.white,
      borderLeftColor: colors.warning,
    },
  });

  return (
    <StripeProvider
      publishableKey={
        'pk_live_51KGVjiC6r0UrWGk65zncl4ZIB94DmTUwb8XJ7NIfYWGMGHWuiaFrdNinNUlF4HB9hSL6cQhkRSr1VYTWyNQB1dwN00F76aTRsW'
      }
      merchantIdentifier="merchant.com.{{gikuyusingles}}" // required for Apple Pay
    >
      <BaseContextProvider.Provider value={{userData, setuserData}}>
        <NavigationContainer>
          {Helpers.isEmpty(userData) ? <AuthNavigator /> : <HomeNavigator />}
          <ModalPortal />
          <Toast config={toastConfigs} />
        </NavigationContainer>
      </BaseContextProvider.Provider>
    </StripeProvider>
  );
};

export default App;
