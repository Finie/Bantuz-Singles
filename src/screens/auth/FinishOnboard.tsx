import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import Logo from 'src/assets/images/finallogo.png';
import useThemeStyles from 'src/hooks/useThemeStyles';
import BackButton from 'src/assets/images/whiteback.svg';
import Text from 'src/components/Text';

export default function FinishOnboard({navigation}) {
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    continer: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flexGrow: 1,
      backgroundColor: colors.primary,
    },
    image: {
      width: 35,
      height: 35,
      marginHorizontal: 8,
    },
    appbar: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    apptouchable: {
      padding: 8,
    },
    scrol: {
      flexGrow: 1,
    },
    starttext: {
      color: colors.white,
      fontSize: 14,
      lineHeight: 17,
    },
    maincontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottom: {
      justifyContent: 'center',
    },
    buttonC: {
      borderWidth: 1,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      borderColor: colors.white,
      margin: 30,
    },
    header: {
      fontSize: 24,
      lineHeight: 29,
      textAlign: 'center',
      marginHorizontal: 60,
      marginTop: 50,
      color: colors.white,
      fontWeight: '600',
    },
    centertext: {
      textAlign: 'center',
      marginVertical: 20,
      fontSize: 12,
      lineHeight: 14,
      color: colors.white,
      marginHorizontal: 60,
      fontWeight: '400',
    },
    centertextgo: {
      textAlign: 'center',
      marginVertical: 20,
      fontSize: 14,
      lineHeight: 17,
      color: colors.white,
      marginHorizontal: 60,
      fontWeight: '700',
    },
  });
  return (
    <SafeAreaView style={styles.continer}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <View style={styles.appbar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.apptouchable}>
          <BackButton />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrol}>
        <View style={styles.maincontainer}>
          <Image style={{width: 90, height: 75}} source={Logo} />

          <Text style={styles.header}>
            You’re now ready to get out there and meet your perfect match!
          </Text>

          <Text style={styles.centertext}>
            To help us show you better picks based on your profile, you can
            update your profile with more information about yourself.
          </Text>

          <TouchableOpacity>
            <Text style={styles.centertextgo}>Go to Your Profile →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => navigation.navigate('mainScreen')}
            style={styles.buttonC}>
            <Text style={styles.starttext}>Start Matching!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
