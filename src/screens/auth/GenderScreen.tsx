import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import AppForm from 'src/components/forms/AppForm'; 
import useThemeStyles from 'src/hooks/useThemeStyles'; 
import ReadioChecked from 'src/assets/icons/radiochecked.svg'; //radioempty.svg
import UncheckedRadio from 'src/assets/icons/radioempty.svg'; //
import FloatingButton from 'src/components/FloatingButton';
import {UserProfile} from 'src/utils/shared.types';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
});

export default function GenderScreen({navigation, route}) {
  const {colors} = useThemeStyles();
  const [gender, setgender] = useState('Male');

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
        gender: gender.toUpperCase(),
      },
    };

    navigation.navigate('bodyTypes', {data: request});
  };

  const handleMale = () => setgender('Male');

  const handleFemale = () => setgender('Female');

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
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    holder: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderRadius: 6,
      marginVertical: 40,
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
  });
  return (
    <AuthScreen
      onBackPressed={function (): void {
        navigation.goBack();
      }}>
      <AppForm
        initialValues={{
          firstName: '',
          lastName: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSumbit}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>What’s your gender?</Text>

          <View style={styles.holder}>
            <TouchableOpacity onPress={handleMale} style={styles.gender}>
              {gender === 'Male' ? <ReadioChecked /> : <UncheckedRadio />}
              <Text style={styles.genderitem}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFemale} style={styles.gender2}>
              {gender === 'Female' ? <ReadioChecked /> : <UncheckedRadio />}

              <Text style={styles.genderitem}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <FloatingButton onPress={handleSumbit} />
        </View>
      </AppForm>
    </AuthScreen>
  );
}
