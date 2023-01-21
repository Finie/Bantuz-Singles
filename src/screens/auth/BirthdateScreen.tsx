import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import moment from 'moment';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import AppForm from 'src/components/forms/AppForm'; 
import useThemeStyles from 'src/hooks/useThemeStyles'; 
 
import GikuyuDate from 'src/components/GikuyuDate'; 
import FloatingButton from 'src/components/FloatingButton';
import {UserProfile} from 'src/utils/shared.types';
import Helpers from 'src/Helpers';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

export default function BirthdateScreen({navigation, route}) {
  const {colors} = useThemeStyles();
  const [ischecked, setisChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${moment(Helpers.getTheMinimumSelectableYear()).format('yyyy-MM-DD')}`,
  );
  const [age, setAge] = useState(18);
  const [errorMessage, setErrorMessage] = useState('You are too young');
  const [isError, setIsError] = useState(false);

  const {data} = route.params;

  const UserInfo: UserProfile = data;

  const handleSumbit = () => {
    if (Helpers.isEmpty(selectedDate)) {
      setIsError(true);
      setErrorMessage('Please select date of birth');
      return;
    }

    const request = {
      first_name: UserInfo.first_name,
      email: UserInfo.email,
      last_name: UserInfo.last_name,
      password: UserInfo.password,
      middle_name: UserInfo.middle_name,
      phone: UserInfo.phone,
      username: UserInfo.username,
      profile: {
        birth_date: selectedDate,
      },
    };

    navigation.navigate('basicInfoLand', {data: request});
  };

  const handleDateSelection = (date: moment.MomentInput) => {
    const end = moment(new Date());
    const start = moment(date);
    var duration = moment.duration(end.diff(start));
    var years = duration.asYears();
    setAge(Math.floor(years));

    if (Math.floor(years) < 18) {
      if (Math.floor(years) < 0) {
        setAge(0);
        setErrorMessage('Invalid age');
      }
      setIsError(true);
      setErrorMessage('You are too young');
      return;
    }

    setIsError(false);
    setSelectedDate(`${moment(date).format('yyyy-MM-DD')}`);
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
    error: {
      color: colors.danger,
      marginVertical: 16,
    },
  });
  return (
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
          <Text style={styles.howtwxt}>What’s your date of birth?</Text>

          <GikuyuDate onDateChange={handleDateSelection} />

          {isError && <Text style={styles.error}>{errorMessage}</Text>}

          <View>
            <View style={{flexDirection: 'row'}}>
              <Text>You are: </Text>
              <Text>{age}</Text>
            </View>
            <Text style={styles.cantchange}>This can’t be changed later.</Text>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.fabcontainer}>
            <FloatingButton onPress={handleSumbit} />
          </View>
        </View>
      </AppForm>
    </AuthScreen>
  );
}
