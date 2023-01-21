import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import AppForm from 'src/components/forms/AppForm';
import useThemeStyles from 'src/hooks/useThemeStyles';
import FloatingButton from 'src/components/FloatingButton';
import ReadioChecked from 'src/assets/icons/radiochecked.svg'; //radioempty.svg
import UncheckedRadio from 'src/assets/icons/radioempty.svg'; //
import {UserProfile} from 'src/utils/shared.types';
import Helpers from 'src/Helpers';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

export default function Bodytype({navigation, route}) {
  const {colors} = useThemeStyles();
  const [ischecked, setisChecked] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(3);
  const [bodyframe, setBodyframe] = useState('SLENDER');
  const [bodyHeight, setBodyHeight] = useState('');
  const [isheightError, setIsheightError] = useState(false);

  const UserInfo: UserProfile = route.params.data;

  const windowWidth = Dimensions.get('window').width;

  let heights = [
    {value: '4`0   (122cm)', label: '4`0    (122cm)'},
    {value: '4`1   (124cm)', label: '4`1    (124cm)'},
    {value: '4`2   (127cm)', label: '4`2    (127cm)'},
    {value: '4`3   (129cm)', label: '4`3    (129cm)'},
    {value: '4`4   (132cm)', label: '4`4    (132cm)'},
    {value: '4`5   (134cm)', label: '4`5    (134cm)'},
    {value: '4`6   (137cm)', label: '4`6    (137cm)'},
    {value: '5`4   (166cm)', label: '5`4    (166cm)'},
    {value: '5`5   (167cm)', label: '5`5    (167cm)'},
    {value: '5`6   (168cm)', label: '5`6    (168cm)'},
    {value: '5`7   (169cm)', label: '5`7    (169cm)'},
    {value: '5`8   (170cm)', label: '5`8    (170cm)'},
    {value: '5`9   (171cm)', label: '5`9    (171cm)'},
    {value: '6`0   (171cm)', label: '6`0    (183cm)'},
    {value: '6`1   (171cm)', label: '6`1    (185cm)'},
    {value: '6`2   (171cm)', label: '6`2    (188cm)'},
    {value: '6`3   (171cm)', label: '6`3    (190cm)'},
    {value: '6`4   (193cm)', label: '6`4    (193cm)'},
    {value: '6`5   (195cm)', label: '6`5    (195cm)'},
  ];

  const updateSelectedItem = ({index, item}) => {
    setBodyHeight(item.value);
    setIsheightError(false);
    setselectedIndex(index);
  };

  const handleSumbit = () => {
    if (Helpers.isEmpty(bodyHeight)) {
      setIsheightError(true);
      return;
    }

    setIsheightError(false);
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
        height: bodyHeight,
        physical_frame: bodyframe,
      },
    };

    navigation.navigate('ethnicity', {data: request});
  };

  const handleSwitch = () => setisChecked(!ischecked);

  const handleRadioSwitch = (selection: string) => {
    setBodyframe(selection);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    height: {
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 29,
      color: colors.black,
      paddingHorizontal: 30,
      marginTop: 40,
      zIndex: 10,
    },

    howtwxt: {
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
      paddingHorizontal: 30,
      marginTop: 30,
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
      position: 'absolute',
      bottom: 16,
      right: 4,
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
    selector: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
      overflow: 'hidden',
      marginTop: -56,
    },
    frameheader: {
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 29,
      color: colors.black,
      paddingHorizontal: 30,
    },
    holder: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderRadius: 6,
      marginBottom: 40,
      marginTop: 20,
      marginHorizontal: 20,
    },
    gender: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: 20,
    },
    gender2: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: colors.snow,
    },
    genderitem: {
      marginLeft: 16,
    },
    heighterror: {
      color: colors.danger,
      marginHorizontal: 30,
      marginVertical: 16,
    },
  });
  return (
    <>
      <AuthScreen
        onBackPressed={function (): void {
          navigation.goBack();
        }}>
        <AppForm
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSumbit}>
          <View style={styles.container}>
            <Text style={styles.howtwxt}>What’s your body’s build like?</Text>

            <Text style={styles.height}>Height</Text>

            <View style={styles.selector}>
              <DynamicallySelectedPicker
                items={heights}
                onScroll={updateSelectedItem}
                height={300}
                width={windowWidth}
                fontFamily={'SourceSansPro-Regular'}
                initialSelectedIndex={9}
                fontSize={16}
                selectedItemBorderColor={colors.snow}
              />
            </View>

            <View style={{marginTop: -40}}>
              {isheightError && (
                <Text style={styles.heighterror}>
                  Please select yout height
                </Text>
              )}
              <Text style={styles.frameheader}>Physical frame</Text>

              <View style={styles.holder}>
                <TouchableOpacity
                  onPress={() => handleRadioSwitch('SLENDER')}
                  style={styles.gender}>
                  {bodyframe === 'SLENDER' ? (
                    <ReadioChecked />
                  ) : (
                    <UncheckedRadio />
                  )}
                  <Text style={styles.genderitem}>Slender</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRadioSwitch('AVERAGE')}
                  style={styles.gender2}>
                  {bodyframe === 'AVERAGE' ? (
                    <ReadioChecked />
                  ) : (
                    <UncheckedRadio />
                  )}

                  <Text style={styles.genderitem}>Average frame</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRadioSwitch('HEAVY')}
                  style={styles.gender2}>
                  {bodyframe === 'HEAVY' ? (
                    <ReadioChecked />
                  ) : (
                    <UncheckedRadio />
                  )}

                  <Text style={styles.genderitem}>Heavyset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AppForm>
      </AuthScreen>
      <View style={styles.bottomcontainer}>
        <View style={styles.fabcontainer}>
          <FloatingButton onPress={handleSumbit} />
        </View>
      </View>
    </>
  );
}
