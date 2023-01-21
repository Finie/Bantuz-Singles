import {View} from 'react-native';
import React from 'react';
import Screen from 'src/components/screen/Screen';
import Text from 'src/components/Text';

const PaymentMethods = () => {
  return (
    <Screen isheaderVisible onBackPress={() => console.log('')}>
      <View>
        <Text>Pick a payment method</Text>
      </View>
    </Screen>
  );
};

export default PaymentMethods;
