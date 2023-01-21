import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import LottieView from 'lottie-react-native';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import AppForm from 'src/components/forms/AppForm';
import FabSubmit from 'src/components/forms/FabSubmit';
import useThemeStyles from 'src/hooks/useThemeStyles';
import {Picker} from '@davidgovea/react-native-wheel-datepicker';
import Accordion from 'src/components/view/Accordion';
import FloatingButton from 'src/components/FloatingButton';
import authRouter from 'src/api/routers/authRouter';
import {UserProfile} from 'src/utils/shared.types';
import Helpers from 'src/Helpers';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
});

export default function Ethnicity({navigation, route}) {
  const {colors} = useThemeStyles();
  const [ischecked, setisChecked] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tribe, setTribe] = useState('');
  const [isError, setIsError] = useState(false);

  const UserInfo: UserProfile = route.params.data;

  const handleSumbit = () => {
    if (Helpers.isEmpty(tribe)) {
      setIsError(true);
      return;
    }

    setIsError(false);

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
        ethnicity: tribe,
      },
    };
    navigation.navigate('locationTrack', {data: request});
  };

  const handleSwitch = () => setisChecked(!ischecked);

  const fetchEthnicGroups = async () => {
    setIsLoading(true);
    const response = await authRouter.getEthnicGroups();
    setIsLoading(false);

    if (response.ok) {
      setData(response.data.data);
      console.log('====================================');
      console.log(JSON.stringify(response.data.data));
      console.log('====================================');
      return;
    }

    console.log('====================================');
    console.log(JSON.stringify(response));
    console.log('====================================');
  };

  useEffect(() => {
    fetchEthnicGroups();
  }, []);

  const handleOnTribeSelected = (tribeName: string) => {
    setIsError(false);
    setTribe(tribeName);
  };

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
      bottom: 10,
      right: 0,
      position: 'absolute',
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
    cantchange: {
      fontSize: 12,
      lineHeight: 15,
    },
    accordion: {flex: 1, marginTop: 40},
    lottieholder: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottie: {
      height: 60,
      width: '100%',
    },
    pleaseselect: {
      color: colors.danger,
      marginVertical: 16,
    },
  });

  return (
    <>
      <AuthScreen
        onBackPressed={function(): void {
          navigation.goBack();
        }}
      >
        <AppForm
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSumbit}
        >
          <View style={styles.container}>
            <Text style={styles.howtwxt}>What’s your ethnic origin?</Text>

            {isLoading ? (
              <View style={styles.lottieholder}>
                <LottieView
                  autoPlay={true}
                  loop={true}
                  source={require('src/assets/lottie/circleloadingprogressindicator.json')}
                  style={styles.lottie}
                />

                <Text>Loading ...</Text>
              </View>
            ) : (
              <View style={styles.accordion}>
                {isError && (
                  <Text style={styles.pleaseselect}>
                    Please select an option
                  </Text>
                )}
                <Accordion
                  data={data}
                  onTribeSelection={handleOnTribeSelected}
                />
              </View>
            )}
          </View>
        </AppForm>
      </AuthScreen>
      <View style={styles.bottomcontainer}>
        <FloatingButton onPress={handleSumbit} />
      </View>
    </>
  );
}
