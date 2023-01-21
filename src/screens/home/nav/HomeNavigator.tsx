import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';

import {firebase} from '@react-native-firebase/messaging';

import MainNavigation from '../MainNavigation';
import ChatRoom from '../chat/ChatRoom';
import UserDescription from '../UserDescription';
import AboutScreen from '../AboutScreen';
import PreferenceScreen from '../PreferenceScreen';
import PriceQuotation from '../PriceQuotation';
import BlockedContacts from '../BlockedContacts';
import SafetyHelpCenter from '../SafetyHelpCenter';
import SecurityScreen from '../SecurityScreen';
import BaseContextProvider from 'src/context/BaseContextProvider';
import authRouter from 'src/api/routers/authRouter';
import PaymentModeSelection from '../PaymentModeSelection';
import PaymentScreen from '../PaymentScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const {tickenSent, setTokenSent} = useContext(BaseContextProvider);

  const messaging = firebase.messaging();

  const _getPermission = async () => {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        _checkPermission();
      })
      .catch(error => {
        // User has rejected permissions
      });
  };

  const _checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      const token = await firebase.messaging().getToken();

      const request = {
        token: token,
      };

      const response = await authRouter.notificationTokenPost(request);

      console.log('====================================');
      console.log(response.data);
      console.log(response.status);
      console.log('====================================');
    } else _getPermission();
  };

  useEffect(() => {
    _checkPermission();
    const unsubscribe = messaging.onMessage(
      async (remoteMessage: {data?: any; notification?: any}) => {
        const {notification} = remoteMessage;

        const {body, title} = notification;

        PushNotification.createChannel(
          {
            channelId: 'specialid', // (required)
            channelName: 'Special messasge', // (required)
            channelDescription: 'Notification for special message', // (optional) default: undefined.
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          created => {
            PushNotification.localNotification({
              channelId: 'specialid',
              title: title,
              message: body,
              playSound: true,
              soundName: 'default',
              importance: 'high',
              vibrate: true,
            });

            console.log(`createChannel returned '${created}'`); // (optional) callback returns whether the channel was created, false means it already existed.
          },
        );
      },
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**
     * ----------------------------------------
     * Open notification while in the foregroud
     * ----------------------------------------
     */
    messaging.onNotificationOpenedApp(async (remoteMessage: {data: any}) => {
      if (remoteMessage) {
        const {data: resData} = remoteMessage;
        const datum = resData;

        console.log('====================================');
        console.log(datum);
        console.log('====================================');
      }
    });

    // Check whether an initial notification is available
    /**
     * ----------------------------------------------
     * Open initial notification while from backgroud
     * ----------------------------------------------
     */
    messaging
      .getInitialNotification()
      .then(async (remoteMessage: {data: any}) => {
        if (remoteMessage) {
          const {data: resData} = remoteMessage;

          const datum = resData;

          console.log('====================================');
          console.log(remoteMessage);
          console.log('====================================');

          console.log(
            '================from deep sleep====================\n\n\n',
          );
          console.log('id Data: ', datum);
          console.log('id type Data: ', typeof datum);
          console.log('\n\n\n====================================');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messaging]);

  useEffect(() => {
    const initiateMessageRequest = async () => {
      await messaging.requestPermission();
    };
    initiateMessageRequest();
  }, [messaging]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={MainNavigation} />
      <Stack.Screen name="messageUi" component={ChatRoom} />
      <Stack.Screen name="userdetails" component={UserDescription} />
      <Stack.Screen name="aboutScreen" component={AboutScreen} />
      <Stack.Screen name="preference" component={PreferenceScreen} />
      <Stack.Screen name="pricestack" component={PriceQuotation} />
      <Stack.Screen name="blockedContacts" component={BlockedContacts} />
      <Stack.Screen name="safetyandhelp" component={SafetyHelpCenter} />
      <Stack.Screen name="securityscreen" component={SecurityScreen} />
      <Stack.Screen
        name="paymentSelectionMode"
        component={PaymentModeSelection}
      />
      <Stack.Screen name="paymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
