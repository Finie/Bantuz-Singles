import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Screen from 'src/components/screen/Screen';

import Warning from 'src/assets/icons/warninggray.svg';
import AppTextInput from 'src/components/AppTextInput';
import {
  CardField,
  useConfirmPayment,
  usePaymentSheet,
} from '@stripe/stripe-react-native';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Button from 'src/components/pressable/Button';
import FloatingLabelInput from 'src/components/FloatingLabelInput';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function PaymentScreen() {
  const {confirmPayment, loading} = useConfirmPayment();
  const [accountName, setAccountName] = useState('');

  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading: paymentLoading,
  } = usePaymentSheet();

  const handlePayPress = async () => {
    // const {error} = await presentPaymentSheet();
    // this is new text
    const {error, paymentIntent} = await confirmPayment(
      'pk_live_51KGVjiC6r0UrWGk65zncl4ZIB94DmTUwb8XJ7NIfYWGMGHWuiaFrdNinNUlF4HB9hSL6cQhkRSr1VYTWyNQB1dwN00F76aTRsW',
      {
        paymentMethodType: 'Card',
      },
    );

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Payment failed',
        text2: error.message,
        position: 'bottom',
      });

      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Payment Successful',
      text2: 'paymentIntent.status',
      position: 'bottom',
    });
  };

  const {colors} = useThemeStyles();

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
      marginHorizontal: 30,
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
    },
    cont: {
      flex: 1,
      marginTop: 50,
    },
  });
  return (
    <Screen
      title="Checkout"
      isheaderVisible
      isLoading={loading}
      onBackPress={() => console.log('back')}>
      <View style={styles.cont}>
        <Text style={styles.pleasepay}>Checkout form</Text>
        {/* <Text style={styles.yourepreffered}>
        Your preferred payment method will be saved to use for future purchases.{' '}
      </Text> */}

        <View style={styles.warningHolder}>
          <Warning />
          <Text style={styles.wedonttext}>
            We do not save your personal payment details when you make a
            purchase. This keeps your payment details secure.
          </Text>
        </View>

        <View style={styles.formview}>
          <FloatingLabelInput
            label={'Account name'}
            onBlur={() => console.log()}
            onChangeText={(text: string) => {
              setAccountName(text);
            }}
            icon={false}
          />

          <CardField
            style={styles.paymentcard}
            cardStyle={styles.cardStyle}
            postalCodeEnabled={false}
          />

          <View style={styles.submit}>
            <Button
              type={loading ? 'disabled' : 'primary'}
              onPress={handlePayPress}>
              {'Pay'}
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  );
}
