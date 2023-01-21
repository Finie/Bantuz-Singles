import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import useThemeStyles from 'src/hooks/useThemeStyles';

import BackButton from 'src/assets/icons/backbutton.svg';
import Text from '../Text';
import OverLayLoader from '../view/OverLayLoader';

type Props = {
  title?: string;
  isheaderVisible?: boolean;
  onBackPress?: () => void;
  children: JSX.Element;
  isLoading?: boolean;
};

const Screen: React.FC<Props> = props => {
  const {
    title,
    isheaderVisible,
    onBackPress,
    children,
    isLoading = false,
  } = props;
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: colors.white,
      flexGrow: 1,
    },
    appbar: {
      flexDirection: 'row',
      marginHorizontal: 30,
    },
    bartitle: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backpress: {
      paddingVertical: 8,
    },
    end: {},
    title: {
      fontSize: 16,
      lineHeight: 19,
      fontWeight: '600',
      color: colors.black,
    },
    scroll: {
      flexGrow: 1,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <OverLayLoader isLoading={isLoading} />
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
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.end}>
            <Text>{` `}</Text>
          </View>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen;
