import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Text from '../Text';

const OverLayLoader = ({isLoading}) => {
  const {colors} = useThemeStyles();
  if (!isLoading) return null;

  const styles = StyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.loaderBackground,
      zIndex: 100,
    },
  });

  return (
    <View style={styles.loading}>
      <AnimatedLottieView
        loop
        autoPlay
        style={{width: 200, height: 60}}
        source={require('src/assets/lottie/circleloadingprogressindicator.json')}
      />
      <Text>please wait ...</Text>
    </View>
  );
};

export default OverLayLoader;
