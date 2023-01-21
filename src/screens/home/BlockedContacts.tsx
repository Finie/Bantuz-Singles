import {View, StyleSheet} from 'react-native';
import React from 'react';
import Screen from 'src/components/screen/Screen';
import FloatingLabelInput from 'src/components/FloatingLabelInput';
import BlockContactItem from 'src/components/BlockContactItem';
import useThemeStyles from 'src/hooks/useThemeStyles';

const BlockedContacts = ({navigation}) => {
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    search: {
      marginHorizontal: 30,
    },
    listcontainer: {
      marginHorizontal: 30,
      marginTop: 30,
      paddingBottom: 100,
    },
    separator: {
      height: 1,
      backgroundColor: colors.snow,
    },
  });
  return (
    <Screen
      isheaderVisible
      title="Blocked Contacts"
      onBackPress={() => navigation.goBack()}
    >
      <View style={styles.search}>
        <FloatingLabelInput
          onChangeText={() => console.log('')}
          search
          label="Search"
        />
      </View>

      <View style={styles.listcontainer}>
        {/* <BlockContactItem /> */}

        {/* <View style={styles.separator} /> */}
      </View>
    </Screen>
  );
};

export default BlockedContacts;
