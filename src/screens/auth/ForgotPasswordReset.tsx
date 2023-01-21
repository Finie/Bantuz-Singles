import {TouchableOpacity, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import * as Yup from 'yup';
import {Modal, ModalContent} from 'react-native-modals';
import AnimatedLottieView from 'lottie-react-native';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import AppForm from 'src/components/forms/AppForm';
import FormInput from 'src/components/forms/FormInput';
import SubmitForm from 'src/components/forms/SubmitForm';
import useThemeStyles from 'src/hooks/useThemeStyles';
import authRouter from 'src/api/routers/authRouter';
import BaseContextProvider from 'src/context/BaseContextProvider';

const validationSchema = Yup.object().shape({
  token: Yup.string()
    .required()
    .label('Token'),
  password: Yup.string().required('Password is required'),
  confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match',
  ),
});

export default function ForgotPasswordReset({navigation}) {
  const {colors} = useThemeStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responsemessage, setresponsemessage] = useState('');
  const [isError, setisError] = useState(false);

  const {userData} = useContext(BaseContextProvider);
  const handleSubmit = async (data: {
    token: string;
    password: string;
    confirm: string;
  }) => {
    const request = {
      userId: 0,
      resetToken: data.token,
      password: data.password,
    };

    setisError(false);
    setIsLoading(true);
    const response = await authRouter.createNewPassword(request);
    setIsLoading(false);

    console.log('====================================');
    console.log(response.data.details);
    console.log('====================================');

    if (response.ok) {
      setresponsemessage(response.data.data);
      setIsModalVisible(true);
      setisError(false);
      return;
    }

    setresponsemessage(response.data.message);
    setIsModalVisible(true);
    setisError(true);
    console.log('====================================');
    console.log(response.data);
    console.log('====================================');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    resettext: {
      textAlign: 'center',
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
      marginVertical: 20,
      fontWeight: '600',
    },
    description: {
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 14.58,
      color: colors.black,
      fontWeight: '400',
      marginVertical: 20,
    },
    buttoncontainer: {
      marginVertical: 20,
    },

    forgotpas: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    forgottext: {
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
    },
    signup: {
      color: colors.primary,
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
    },
  });

  return (
    <AuthScreen
      isLoading={isLoading}
      onBackPressed={function(): void {
        navigation.goBack();
      }}
    >
      <View style={styles.container}>
        <AppForm
          initialValues={{
            token: '',
            password: '',
            confirm: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Text style={styles.resettext}>Update Your Password</Text>

          <FormInput
            name={'token'}
            placeholder={'Token *'}
            autoCapitalize="characters"
          />
          <FormInput
            name={'password'}
            placeholder={'New password *'}
            ispassword
          />
          <FormInput
            name={'confirm'}
            placeholder={'Confirm password *'}
            ispassword
          />
          <View style={styles.buttoncontainer}>
            <SubmitForm title="Update New Password" />
          </View>
        </AppForm>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('signinWelcome');
          }}
          style={styles.forgotpas}
        >
          <Text style={styles.forgottext}>
            Don’t have an account?
            <Text style={styles.signup}>{`  Sign up →`}</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        swipeThreshold={200} // default 100
        width={300}
        onTouchOutside={() => {
          setIsModalVisible(false);
        }}
      >
        <ModalContent
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AnimatedLottieView
              autoPlay={true}
              loop={false}
              style={{width: 100, height: 100}}
              source={
                isError
                  ? require('src/assets/lottie/67782-error.json')
                  : require('src/assets/lottie/successful.json')
              }
            />

            <Text
              style={{
                fontSize: 20,
                lineHeight: 26,
                textAlign: 'center',
                marginTop: 16,
                color: colors.black,
              }}
            >
              {responsemessage}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              borderWidth: 1,
              padding: 8,
              width: '50%',
              borderRadius: 16,
              borderColor: colors.silver,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 26,
                color: colors.silver,
              }}
            >
              close
            </Text>
          </TouchableOpacity>
        </ModalContent>
      </Modal>
    </AuthScreen>
  );
}
