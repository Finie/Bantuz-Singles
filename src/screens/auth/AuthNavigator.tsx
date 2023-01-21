import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BasicInfoland from './BasicInfoland';
import BirthdateScreen from './BirthdateScreen';
import Bodytype from './Bodytype';
import EmailScreen from './EmailScreen';
import Ethnicity from './Ethnicity';
import FinishOnboard from './FinishOnboard';
import GenderScreen from './GenderScreen';
import InterestsScreen from './InterestsScreen';
import LocationTrack from './LocationTrack';
import NameScreen from './NameScreen';
import Onboarding from './Onboarding';
import Personalityphotos from './Personalityphotos';
import Securitydisclaimer from './Securitydisclaimer';
import SignIn from './SignIn';
import SingWelcome from './SingWelcome';
import StartIntro from './StartIntro';
import WelcomeScreen from './WelcomeScreen';
import HomeNavigator from '../home/nav/HomeNavigator';
import AuthContextProvider from 'src/context/AuthContextProvider';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordReset from './ForgotPasswordReset';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [accountRequest, setAccountRequest] = useState();

  return (
    <AuthContextProvider.Provider
      value={{
        accountRequest,
        setAccountRequest,
      }}
    >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="onBoarding" component={Onboarding} />
        <Stack.Screen name={'welcomeScreen'} component={WelcomeScreen} />
        <Stack.Screen name="signIn" component={SignIn} />
        <Stack.Screen name={'forgotPassword'} component={ForgotPassword} />
        <Stack.Screen
          name={'forgotpassverify'}
          component={ForgotPasswordReset}
        />
        <Stack.Screen name="signinWelcome" component={SingWelcome} />
        <Stack.Screen
          name="securityDisclaimer"
          component={Securitydisclaimer}
        />
        <Stack.Screen name="nameScreen" component={NameScreen} />
        <Stack.Screen name="emailScreen" component={EmailScreen} />
        <Stack.Screen name="ethnicity" component={Ethnicity} />
        <Stack.Screen name="birthdayScreen" component={BirthdateScreen} />
        <Stack.Screen name="basicInfoLand" component={BasicInfoland} />
        <Stack.Screen name="genderScreen" component={GenderScreen} />
        <Stack.Screen name="bodyTypes" component={Bodytype} />

        <Stack.Screen name="locationTrack" component={LocationTrack} />
        <Stack.Screen name="startIntro" component={StartIntro} />
        <Stack.Screen name="personalityPhoto" component={Personalityphotos} />
        <Stack.Screen name="interestScreen" component={InterestsScreen} />
        <Stack.Screen name="finisOnboard" component={FinishOnboard} />
        <Stack.Screen name="mainScreen" component={HomeNavigator} />
      </Stack.Navigator>
    </AuthContextProvider.Provider>
  );
};

export default AuthNavigator;
