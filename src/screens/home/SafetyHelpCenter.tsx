import {View, StyleSheet, Linking} from 'react-native';
import React, {useContext} from 'react';
import Screen from 'src/components/screen/Screen';
import SaftyHelpItemList from 'src/components/SaftyHelpItemList';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Text from 'src/components/Text';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BaseContextProvider from 'src/context/BaseContextProvider';
import EncryptionStore from 'src/data/EncryptionStore';

export default function SafetyHelpCenter({navigation}) {
  const {colors} = useThemeStyles();

  const {setuserData} = useContext(BaseContextProvider);
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      paddingTop: 2.5,
    },
    itemHolder: {
      marginHorizontal: 10,
      marginVertical: 7.5,
      backgroundColor: colors.white,
      borderRadius: 10,
      overflow: 'hidden',
    },
    headertext: {
      marginHorizontal: 20,
      marginTop: 20,
      fontSize: 16,
      lineHeight: 19,
      fontWeight: '600',
      color: colors.black,
    },
    logout: {
      color: colors.danger,
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
      textAlign: 'center',
    },
    logoutbutton: {
      backgroundColor: colors.white,
      paddingVertical: 20,
      marginVertical: 30,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: colors.danger,
      marginHorizontal: 10,
    },
  });

  const handleClick = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  return (
    <Screen
      isheaderVisible
      title={'Safety & Help Center'}
      onBackPress={() => navigation.goBack()}
    >
      <View style={styles.container}>
        {/* start of items */}
        <View style={styles.itemHolder}>
          <Text style={styles.headertext}>Contact Us</Text>
          <SaftyHelpItemList
            title={'Help & Support'}
            onPress={function(): void {}}
          />
        </View>

        {/* end item of items */}

        {/* start of items */}
        <View style={styles.itemHolder}>
          <Text style={styles.headertext}>Community</Text>
          <SaftyHelpItemList
            title={'Community Guidelines'}
            onPress={function(): void {}}
          />
          <SaftyHelpItemList
            title={'Safety Tips'}
            onPress={function(): void {}}
          />
        </View>

        {/* end item of items */}

        {/* start of items */}
        <View style={styles.itemHolder}>
          <Text style={styles.headertext}>Legal</Text>
          <SaftyHelpItemList
            title={'Privacy Policy'}
            onPress={function(): void {
              handleClick('https://bantuzsingles.com/privacy-policy/');
            }}
          />
          <SaftyHelpItemList
            title={'Terms of Service'}
            onPress={function(): void {
              handleClick('https://bantuzsingles.com/privacy-policy/');
            }}
          />
        </View>

        {/* end item of items */}

        <TouchableOpacity
          style={styles.logoutbutton}
          onPress={() => {
            setuserData({});
            EncryptionStore.destroyUser();
          }}
        >
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
