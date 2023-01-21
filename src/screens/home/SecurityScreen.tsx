import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import * as Yup from 'yup';

import Screen from 'src/components/screen/Screen';
import AppForm from 'src/components/forms/AppForm';
import FormInput from 'src/components/forms/FormInput';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Text from 'src/components/Text';
import SubmitForm from 'src/components/forms/SubmitForm';
import {color} from 'react-native-reanimated';
import BaseContextProvider from 'src/context/BaseContextProvider';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().label('Email'),
  phoneNumber: Yup.string().min(10).label('Phone Number'),
  oldpassword: Yup.string().min(4).label('Old Password'),
  newpassword: Yup.string().min(4).label('New Password'),
});

export default function SecurityScreen({navigation}) {
  const {colors} = useThemeStyles();

  const {userData} = useContext(BaseContextProvider);

  const handleSubmit = () => {};
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 30,
      flex: 1,
    },
    verifycontainer: {
      paddingVertical: 15,
      alignItems: 'flex-end',
    },
    updatebutton: {
      marginVertical: 30,
    },
    verificationnumber: {
      color: colors.secondary,
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
    },
    bottomlayout: {
      backgroundColor: colors.background,
      justifyContent: 'center',
      // alignItems: 'center',
      flex: 7,
    },
    diactivate: {
      paddingVertical: 20,
      height: 56,
      marginHorizontal: 30,
      marginVertical: 20,
    },
    diactivatetext: {
      textAlign: 'center',
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
      color: colors.danger,
    },
    delete: {
      paddingVertical: 20,
      backgroundColor: colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      borderRadius: 30,
      marginHorizontal: 30,
    },
    deletetext: {
      fontSize: 14,
      lineHeight: 17,
      color: colors.white,
      fontWeight: '700',
    },
  });
  return (
    <Screen
      isheaderVisible
      title={'Security'}
      onBackPress={() => navigation.goBack()}>
      <View style={styles.container}>
        <AppForm
          initialValues={{
            email: '',
            phoneNumber: '',
            oldpassword: '',
            newpassword: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <FormInput
            name={'email'}
            placeholder={'Your email address'}
            isVerified
          />

          <FormInput
            name={'phoneNumber'}
            placeholder={'Your phone number'}
            isPending={true}
          />

          <TouchableOpacity style={styles.verifycontainer}>
            <Text style={styles.verificationnumber}>
              Verify your phone number →
            </Text>
          </TouchableOpacity>

          <FormInput
            name={'oldpassword'}
            placeholder={'Your Current Password'}
            ispassword
          />

          <FormInput
            name={'newpassword'}
            placeholder={'Your New Password'}
            ispassword
          />

          <View style={styles.updatebutton}>
            <SubmitForm title="Update" />
          </View>
        </AppForm>
      </View>
      <View style={styles.bottomlayout}>
        <TouchableOpacity style={styles.diactivate}>
          <Text style={styles.diactivatetext}>
            Deactivate My Account Temporarily →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.delete}>
          <Text style={styles.deletetext}>Delete My Account Forever</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
