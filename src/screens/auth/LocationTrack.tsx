import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Location from 'src/assets/icons/location.svg';
import FloatingButton from 'src/components/FloatingButton';
import {NavigationContainer} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import {UserProfile} from 'src/utils/shared.types';
import Modal, {ModalContent} from 'react-native-modals';
import AnimatedLottieView from 'lottie-react-native';

export default function LocationTrack({navigation, route}) {
  const {colors} = useThemeStyles();
  const [locationIsGranted, setLocationIsGranted] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [locationStatus, setLocationStatus] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const UserInfo: UserProfile = route.params.data;

  const handleSumbit = () => {
    const request = {
      first_name: UserInfo.first_name,
      email: UserInfo.email,
      last_name: UserInfo.last_name,
      password: UserInfo.password,
      middle_name: UserInfo.middle_name,
      phone: UserInfo.phone,
      username: UserInfo.username,
      profile: {
        birth_date: UserInfo.profile.birth_date,
        gender: UserInfo.profile.gender,
        height: UserInfo.profile.height,
        physical_frame: UserInfo.profile.physical_frame,
        ethnicity: UserInfo.profile.ethnicity,
        location: {
          google_place_id: 'string',
          name: 'string',
          longitude: currentLongitude,
          latitude: currentLatitude,
        },
      },
    };

    console.log('====================================');
    console.log(request);
    console.log('====================================');

    navigation.navigate('startIntro', {data: request});
  };
  const getLocationAndPermission = async () => {
    if (Platform.OS === 'ios') {
      const res = await Geolocation.requestAuthorization('whenInUse');
      if (res === 'granted') {
        getCurrentLocation();
      } else if (res === 'denied') {
        setIsModalVisible(true);
        return;
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device current location permission',
            message: 'Allow app to get your current location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setIsModalVisible(true);
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.requestAuthorization('whenInUse');
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
      },
      error => {
        console.log('map error: ', error);
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  const styles = StyleSheet.create({
    main: {
      flexGrow: 1,
    },
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

    discalimertext: {
      fontSize: 12,
      lineHeight: 14,
      marginVertical: 16,
    },
    fabcontainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    fabcontainer2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    accordion: {flex: 1, marginTop: 40},
    locationButton: {
      height: 60,
      borderWidth: 1,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 24,
      borderRadius: 30,
      borderColor: colors.primary,
      flex: 3,
    },
    texts: {
      marginLeft: 24,
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
      color: colors.primary,
    },
    mainb: {flexDirection: 'row'},
    helperview: {flex: 1},
  });

  return (
    <AuthScreen
      onBackPressed={function(): void {
        navigation.goBack();
      }}
    >
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>Meet people nearby & far away</Text>
          <View style={styles.accordion}>
            <View style={styles.mainb}>
              <TouchableOpacity
                onPress={getLocationAndPermission}
                //
                style={styles.locationButton}
              >
                <Location />
                <Text style={styles.texts}>Enable Location Tracking</Text>
              </TouchableOpacity>
              <View style={styles.helperview}></View>
            </View>

            <Text style={styles.discalimertext}>
              Your location will be used to show potential matches near you, and
              show subscription plans available in your region. This is optional
            </Text>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.fabcontainer}>
            <View style={styles.fabcontainer2}>
              <FloatingButton onPress={handleSumbit} />
              <Text>Skip</Text>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        swipeThreshold={200} // default 100
        width={300}
        onTouchOutside={() => {
          setIsModalVisible(false);
        }}
      >
        <ModalContent style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <AnimatedLottieView
              autoPlay={true}
              loop={true}
              style={{width: 100, height: 100}}
              source={require('src/assets/lottie/location_editor.json')}
            />

            <Text
              style={{
                fontSize: 14,
                lineHeight: 26,
                textAlign: 'center',
                marginTop: 16,
                color: colors.black,
              }}
            >
              {`Hello ${UserInfo?.username}, would you like to enable location permission?`}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
              Linking.openSettings();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              borderWidth: 2,
              padding: 8,
              width: '50%',
              borderRadius: 6,
              borderColor: colors.silver,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                lineHeight: 20,
                color: colors.primary,
              }}
            >
              Open settings
            </Text>
          </TouchableOpacity>
        </ModalContent>
      </Modal>
    </AuthScreen>
  );
}
