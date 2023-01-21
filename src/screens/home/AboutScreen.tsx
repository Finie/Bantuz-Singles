import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Screen from 'src/components/screen/Screen';
import Text from 'src/components/Text';
import useThemeStyles from 'src/hooks/useThemeStyles';
import EditAboutMe from 'src/components/EditAboutMe';
import ParalaxScreen from './ParalaxScreen';

export default function AboutScreen({navigation}) {
  const {colors} = useThemeStyles();

  const [isEdit, setIsedit] = useState(true);
  const styles = StyleSheet.create({
    switchcontainer: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: colors.snow,
    },
    toucha: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    edit: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
      color: colors.primary,
    },
    preview: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
    },
  });
  return (
    <Screen
      isheaderVisible
      title="About Me"
      onBackPress={() => navigation.goBack()}>
      <View style={styles.switchcontainer}>
        <TouchableOpacity onPress={() => setIsedit(true)} style={styles.toucha}>
          <Text style={isEdit ? styles.edit : styles.preview}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsedit(false)}
          style={styles.toucha}>
          <Text style={!isEdit ? styles.edit : styles.preview}>Preview</Text>
        </TouchableOpacity>
      </View>
      {isEdit ? <EditAboutMe /> : <ParalaxScreen />}
    </Screen>
  );
}
