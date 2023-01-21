import {View, StyleSheet} from 'react-native';
import React from 'react';
import Screen from 'src/components/screen/Screen';
import useThemeStyles from 'src/hooks/useThemeStyles';

import Dolla from 'src/assets/icons/dollabrown.svg';
import Text from 'src/components/Text';
import SwitchSelection from 'src/components/SwitchSelection';

import Next from 'src/assets/icons/keyboardarrowright.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function PreferenceScreen({navigation}) {
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.snow,
    },
    iconcontainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accent,
      padding: 20,
      margin: 10,
      borderRadius: 10,
    },
    centertext: {
      flex: 1,
      marginHorizontal: 16,
    },
    sometextcolor: {
      color: colors.black,
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 14,
    },
    upgrade: {
      color: colors.secondary,
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 14,
    },

    switchesview: {
      backgroundColor: colors.white,
      padding: 16,
      margin: 15,
      borderRadius: 10,
    },

    valuetop: {
      borderWidth: 1,
      padding: 6,
      borderColor: colors.snow,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },

    value: {
      borderWidth: 1,
      padding: 6,
      borderColor: colors.snow,
    },

    valuebottom: {
      borderWidth: 1,
      padding: 6,
      borderColor: colors.snow,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

    valuesignly: {
      borderWidth: 1,
      padding: 6,
      borderColor: colors.snow,
      borderRadius: 10,
    },
    swicthbetween: {
      fontSize: 12,
      marginVertical: 10,
    },
    units: {
      color: colors.black,
    },
    switchesviewlast: {
      backgroundColor: colors.white,
      padding: 16,
      margin: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 70,
    },
    sentensetext: {
      fontSize: 12,
      lineHeight: 14,
    },
    blockcontact: {
      fontSize: 16,
      lineHeight: 19,
      color: colors.black,
      marginBottom: 6,
    },
  });
  return (
    <Screen
      isheaderVisible
      onBackPress={() => navigation.goBack()}
      title={'Preferences'}>
      <View style={styles.container}>
        <View style={styles.iconcontainer}>
          <View>
            <Dolla />
          </View>
          <View style={styles.centertext}>
            <Text style={styles.sometextcolor}>
              Some options are available with a premium subscription.
            </Text>
          </View>

          <View>
            <Text style={styles.upgrade}>Upgrade →</Text>
          </View>
        </View>

        <View style={styles.switchesview}>
          <View style={styles.valuetop}>
            <SwitchSelection
              title={'Show your last name on your public profile'}
            />
          </View>
          <View style={styles.value}>
            <SwitchSelection
              title={'Hide your last seen on your chats'}
              isMonyrequired
            />
          </View>
          <View style={styles.valuebottom}>
            <SwitchSelection
              title={'Hide read receipts on your chats'}
              isMonyrequired
            />
          </View>
        </View>

        <View style={styles.switchesview}>
          <View>
            <Text style={styles.units}>Units</Text>
            <Text style={styles.swicthbetween}>
              Switch between the imperial and metric measurement system
            </Text>
          </View>
          <View style={styles.valuesignly}>
            <SwitchSelection title={'Use kilometres instead of miles'} />
          </View>
        </View>

        <View style={styles.switchesview}>
          <View>
            <Text style={styles.units}>Notifications</Text>
            <Text style={styles.swicthbetween}>
              We’ll send you important alerts about your account’s security, and
              new updates you can look forward to.
            </Text>
          </View>

          <View style={styles.valuetop}>
            <SwitchSelection title={'Email notifications'} />
          </View>
          <View style={styles.value}>
            <SwitchSelection title={'Push notifications'} />
          </View>
          <View style={styles.valuebottom}>
            <SwitchSelection title={'Insider news to Team Bantu Singles'} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.switchesviewlast}
          onPress={() => navigation.navigate('blockedContacts')}>
          <View>
            <Text style={styles.blockcontact}>Blocked contacts</Text>
            <Text style={styles.sentensetext}>
              Select people fron your contact list you don’t want to see or be
              seen by on Bantuz Singles.
            </Text>
          </View>
          <View>
            <Next />
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
