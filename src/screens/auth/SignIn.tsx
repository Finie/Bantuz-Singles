import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import useThemeStyles from 'src/hooks/useThemeStyles';
import AppForm from 'src/components/forms/AppForm';
import FormInput from 'src/components/forms/FormInput';
import SubmitForm from 'src/components/forms/SubmitForm';
import ChechBox from 'src/assets/icons/checkboxcheck.svg';
import Link from 'src/components/Link';
import authRouter from 'src/api/routers/authRouter';
import OverLayLoader from 'src/components/view/OverLayLoader';
import EncryptionStore from 'src/data/EncryptionStore';
import BaseContextProvider from 'src/context/BaseContextProvider';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().trim().label('Username'),
  password: Yup.string().required().label('Password'),
});

export default function SignIn({navigation}) {
  const {colors, text} = useThemeStyles();

  const [rememberMe, setrememberMe] = useState(true);

  const [userInfo, setUserInfo] = useState({} as any);

  const [isLoading, setIsloading] = useState(false);

  const {setuserData} = useContext(BaseContextProvider);

  const handleRemember = () => setrememberMe(!rememberMe);

  const getInfoFromToken = (token: any) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setUserInfo(result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const handleSubmission = async (data: {
    username: string;
    password: string;
  }) => {
    setIsloading(true);
    const response = await authRouter.loginUser(data);
    setIsloading(false);

    console.log('================LOGIN====================');
    console.log(response);
    console.log(data);
    console.log('====================================');

    if (response.ok) {
      EncryptionStore.storeToken(response.data.data.token);
      EncryptionStore.storeBantuUser(response.data.data);
      setuserData(response.data.data);
      return;
    }

    Toast.show({
      type: 'error',
      text1: 'Request failed',
      text2: response.data.message,
      position: 'bottom',
    });
  };

  const styles = StyleSheet.create({
    textarea: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 1,
    },
    testsize: {
      fontWeight: '600',
      lineHeight: 38.88,
      fontSize: 32,
    },
    main: {
      flex: 3,
      marginHorizontal: 30,
    },
    bottomlayout: {
      flex: 1,
    },
    checkboxtouchable: {paddingVertical: 30, flexDirection: 'row'},
    emptychecjbox: {
      borderWidth: 2,
      borderColor: colors.silver,
      width: 20,
      height: 21,
      borderRadius: 4,
    },
    remember: {
      marginLeft: 16,
    },
    bottomlay: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    fogot: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 17.01,
      marginTop: 30,
    },
    donthav: {fontWeight: '700', fontSize: 16, lineHeight: 17.01},
    sign: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 17.01,
      marginTop: 2,
    },
  });
  return (
    <AuthScreen
      onBackPressed={() => {
        navigation.goBack();
      }}>
      <View style={styles.textarea}>
        <Text style={[text.heading, styles.testsize]}>
          {'Let’s Sign You In'}
        </Text>
      </View>
      <OverLayLoader isLoading={isLoading} />
      <View style={styles.main}>
        <AppForm
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={handleSubmission}
          validationSchema={validationSchema}>
          <FormInput name={'username'} placeholder={'Username or email *'} />
          <FormInput name={'password'} placeholder={'Password *'} ispassword />

          <View style={styles.bottomlayout}>
            <TouchableOpacity
              onPress={handleRemember}
              style={styles.checkboxtouchable}>
              {rememberMe ? (
                <ChechBox />
              ) : (
                <View style={styles.emptychecjbox} />
              )}
              <Text style={styles.remember}> Remember me</Text>
            </TouchableOpacity>
            <SubmitForm title="Sign in" />
            {/* 
            <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    const accessToken = data?.accessToken.toString();
                    getInfoFromToken(accessToken);
                  });
                }
              }}
              // onLogoutFinished={() => this.setState({userInfo: {}})}
            /> */}

            <View style={styles.bottomlay}>
              <TouchableOpacity
                onPress={() => navigation.navigate('forgotPassword')}>
                <Text style={styles.fogot}>Forgot Password</Text>
              </TouchableOpacity>
              <Text style={styles.donthav}>
                Don't have an account?{' '}
                <Link
                  onPress={() => navigation.navigate('signinWelcome')}
                  style={styles.sign}
                  title={` Sign up →`}
                />
              </Text>
            </View>
          </View>
        </AppForm>
      </View>
    </AuthScreen>
  );
}
