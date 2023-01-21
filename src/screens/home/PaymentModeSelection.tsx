import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Screen from 'src/components/screen/Screen';

import Warning from 'src/assets/icons/warninggray.svg';
import AppTextInput from 'src/components/AppTextInput';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Button from 'src/components/pressable/Button';

import ReadioChecked from 'src/assets/icons/radiochecked.svg'; //radioempty.svg
import UncheckedRadio from 'src/assets/icons/radioempty.svg'; //.svg
import Mpesa from 'src/assets/icons/mpesa.svg'; //
import Paypal from 'src/assets/icons/paypal.svg'; //
import CreditCard from 'src/assets/icons/credit_card.svg'; //
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function PaymentModeSelection({navigation, route}) {
  const {confirmPayment, loading} = useConfirmPayment();
  const [accountName, setAccountName] = useState('');
  const [paymentMode, setPaymentMode] = useState('CARD');

  const {colors} = useThemeStyles();

  const handleRadioSwitch = (selection: string) => {
    setPaymentMode(selection);
  };

  const handleToCheckoutNavigation = () => {
    switch (paymentMode) {
      case 'CARD':
        navigation.navigate('paymentScreen', {
          data: route.params.data,
        });
        break;
      case 'MPESA':
        Toast.show({
          type: 'error',
          text1: 'Coming soon',
          text2: 'Payment method not availabble',
          position: 'bottom',
        });
        break;
      case 'PAYPAL':
        Toast.show({
          type: 'error',
          text1: 'Coming soon',
          text2: 'Payment method not availabble',
          position: 'bottom',
        });
        break;
      default:
    }
  };

  const styles = StyleSheet.create({
    pleasepay: {
      fontSize: 24,
      lineHeight: 29,
      marginHorizontal: 30,
      marginVertical: 8,
      fontWeight: '400',
      color: colors.black,
    },
    yourepreffered: {
      fontSize: 14,
      lineHeight: 17,
      marginHorizontal: 30,
      marginVertical: 8,
    },
    warningHolder: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#8492A60F',
      padding: 12,
      marginHorizontal: 30,
      borderRadius: 10,
      marginVertical: 8,
    },
    wedonttext: {
      fontSize: 12,
      lineHeight: 15,
      marginHorizontal: 8,
    },
    formview: {
      marginHorizontal: 10,
      flex: 1,
    },
    cardStyle: {
      borderWidth: 2,
      borderColor: colors.snow,
      overflow: 'hidden',
      borderRadius: 10,
    },
    paymentcard: {
      width: '100%',
      height: 60,
      marginVertical: 8,
      paddingHorizontal: 6,
    },
    submit: {
      flex: 1,
      justifyContent: 'flex-end',
      marginHorizontal: 30,
    },
    cont: {
      flex: 1,
      marginTop: 50,
    },
    frameheader: {
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 29,
      color: colors.black,
      paddingHorizontal: 30,
    },
    holder: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderRadius: 6,
      marginBottom: 40,
      marginTop: 20,
      marginHorizontal: 20,
    },
    gender: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
      paddingHorizontal: 20,
    },
    gender2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: colors.snow,
    },
    genderitem: {
      marginLeft: 16,
    },
    radioView: {
      flexDirection: 'row',
    },
  });
  return (
    <Screen
      title=""
      isheaderVisible
      isLoading={loading}
      onBackPress={() => console.log('back')}>
      <View style={styles.cont}>
        <Text style={styles.pleasepay}>Pick a payment method</Text>
        <Text style={styles.yourepreffered}>
          Your preferred payment method will be saved to use for future
          purchases.{' '}
        </Text>

        <View style={styles.warningHolder}>
          <Warning />
          <Text style={styles.wedonttext}>
            We do not save your personal payment details when you make a
            purchase. This keeps your payment details secure.
          </Text>
        </View>

        <View style={styles.formview}>
          <View style={styles.holder}>
            <TouchableOpacity
              onPress={() => handleRadioSwitch('CARD')}
              style={styles.gender}>
              <View style={styles.radioView}>
                {paymentMode === 'CARD' ? (
                  <ReadioChecked />
                ) : (
                  <UncheckedRadio />
                )}
                <Text style={styles.genderitem}>Card</Text>
              </View>

              <CreditCard />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleRadioSwitch('MPESA')}
              style={styles.gender2}>
              <View style={styles.radioView}>
                {paymentMode === 'MPESA' ? (
                  <ReadioChecked />
                ) : (
                  <UncheckedRadio />
                )}

                <Text style={styles.genderitem}>M-pesa</Text>
              </View>

              <Mpesa />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleRadioSwitch('PAYPAL')}
              style={styles.gender2}>
              <View style={styles.radioView}>
                {paymentMode === 'PAYPAL' ? (
                  <ReadioChecked />
                ) : (
                  <UncheckedRadio />
                )}

                <Text style={styles.genderitem}>Paypal</Text>
              </View>

              <Paypal />
            </TouchableOpacity>
          </View>

          <View style={styles.submit}>
            <Button onPress={handleToCheckoutNavigation}>
              {'Add Payment Details'}
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  );
}
