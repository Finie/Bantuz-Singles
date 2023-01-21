import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import useThemeStyles from 'src/hooks/useThemeStyles';

import BackButton from 'src/assets/icons/backbutton.svg';
import ChatOptions from 'src/assets/icons/chatoptions.svg';
import Text from '../Text';

type Props = {
  title?: string;
  image: URL;
  isheaderVisible?: boolean;
  onBackPress?: () => void;
  onOptionClick?: () => void;
  children: JSX.Element;
};

const ChatScreen: React.FC<Props> = props => {
  const {title, isheaderVisible, image, onBackPress, onOptionClick, children} =
    props;
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: colors.white,
      flexGrow: 1,
    },
    appbar: {
      flexDirection: 'row',
      marginHorizontal: 15,
      backgroundColor: colors.white,
    },
    bartitle: {
      flex: 2,
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 16,
    },
    backpress: {
      paddingVertical: 8,
    },
    end: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 20,
      lineHeight: 23.4,
      fontWeight: '600',
      color: colors.black,
    },
    scroll: {
      flexGrow: 1,
    },
    profile: {
      width: 30,
      height: 30,
      borderRadius: 30,
    },
    lastseen: {
      fontSize: 12,
      lineHeight: 15,
    },
    barname: {
      marginHorizontal: 16,
    },
    underline: {
      height: 0.5,
      backgroundColor: colors.white,
      marginTop: 8,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {isheaderVisible && (
        <View style={styles.appbar}>
          <TouchableOpacity onPress={onBackPress} style={styles.backpress}>
            <BackButton />
          </TouchableOpacity>
          <View style={styles.bartitle}>
            <Image style={styles.profile} source={image} />
            <View style={styles.barname}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text numberOfLines={1} style={styles.lastseen}>
                Last online 3 min ago
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.end} onPress={onOptionClick}>
            <ChatOptions />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.underline}></View>
      <View style={styles.scroll}>{children}</View>
    </SafeAreaView>
  );
};

export default ChatScreen;
