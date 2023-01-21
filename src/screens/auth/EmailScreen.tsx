import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import AppForm from 'src/components/forms/AppForm';
import FabSubmit from 'src/components/forms/FabSubmit';
import useThemeStyles from 'src/hooks/useThemeStyles';
import FormInput from 'src/components/forms/FormInput';

import ChechBox from 'src/assets/icons/checkboxcheck.svg';
import AuthContextProvider from 'src/context/AuthContextProvider';
import {UserProfile} from 'src/utils/shared.types';
import authRouter from 'src/api/routers/authRouter';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
  password: Yup.string().required('Password is required'),
  confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match',
  ),
});

export default function EmailScreen({navigation, route}) {
  const {colors} = useThemeStyles();
  const [ischecked, setisChecked] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  const {data} = route.params;
  const Usernames: UserProfile = data;

  const handleSumbit = async (data: {email: string; password: string}) => {
    const request = {
      first_name: Usernames.first_name,
      email: data.email,
      password: data.password,
      last_name: Usernames.last_name,
      middle_name: Usernames.middle_name,
      phone: Usernames.phone,
      username: Usernames.username,
    };

    setIsloading(true);
    const response = await authRouter.checkEmailAvailability(data.email);
    setIsloading(false);

    if (response.ok) {
      if (response.data) {
        navigation.navigate('birthdayScreen', {data: request});
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Request failed',
        text2: 'Email is already in use',
        position: 'bottom',
      });
    }
  };

  const handleSwitch = () => setisChecked(!ischecked);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },

    howtwxt: {
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
    },
    sharetext: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 15,
    },
    bottomcontainer: {
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    emptychecjbox: {
      borderWidth: 2,
      borderColor: colors.silver,
      width: 20,
      height: 21,
      borderRadius: 4,
    },
    disclaimer: {
      flexDirection: 'row',
      flex: 2,
      alignItems: 'center',
    },
    discalimertext: {
      marginLeft: 15,
      fontSize: 12,
      lineHeight: 14,
    },
    fabcontainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  });
  return (
    <AuthScreen
      isLoading={isLoading}
      onBackPressed={function(): void {
        navigation.goBack();
      }}
    >
      <AppForm
        initialValues={{
          email: '',
          password: '',
          confirm: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSumbit}
      >
        <View style={styles.container}>
          <Text style={styles.howtwxt}>What’s your email?</Text>

          <FormInput
            name={'email'}
            placeholder={'Email'}
            keyboardType={'email-address'}
          />

          <FormInput name={'password'} placeholder={'Password'} ispassword />

          <FormInput
            name={'confirm'}
            placeholder={'Confirm password'}
            ispassword
          />
        </View>
        <View style={styles.bottomcontainer}>
          <TouchableOpacity style={styles.disclaimer} onPress={handleSwitch}>
            {ischecked ? <ChechBox /> : <View style={styles.emptychecjbox} />}
            <Text style={styles.discalimertext}>
              If you do not wish to get marketing communications about our
              products and services, check this box
            </Text>
          </TouchableOpacity>

          <View style={styles.fabcontainer}>
            <FabSubmit />
          </View>
        </View>
      </AppForm>
    </AuthScreen>
  );
}
