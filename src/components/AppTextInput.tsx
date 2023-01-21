import {
  TextInput,
  View,
  StyleSheet,
  Animated,
  Text,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Text from './Text';
import useThemeStyles from 'src/hooks/useThemeStyles';
import EyeClose from 'src/assets/icons/invisibleeye.svg';

type Props = {
  placeholder: string;
  onChangeText: (text: string) => void;
  icon: boolean;
};

const AppTextInput: React.FC<Props> = props => {
  const {colors} = useThemeStyles();

  const [isFocused, setIsfocused] = useState(false);
  const [animatedIsFocused, setanimatedIsFocused] = useState(
    new Animated.Value(0),
  );

  const {onChangeText, placeholder, ...otherProps} = props;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: animatedIsFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused]);

  const handleFocused = () => {
    setIsfocused(true);
  };

  const handleBlur = () => {
    setIsfocused(false);
  };

  const labelStyle = {
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 14],
    }),
    lineHeight: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14.58, 17],
    }),
    color: colors.silver,
    position: 'absolute',
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30],
    }),
    left: 0,
  };

  const textinput = {
    height: 56,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 14,
    lineHeight: 17,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 6,
  };

  const styles = StyleSheet.create({
    pressable: {
      backgroundColor: 'red',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });

  return (
    <View>
      <Animated.Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 14],
          }),
          lineHeight: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [14.58, 17],
          }),
          color: colors.silver,
          position: 'absolute',
          top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 30],
          }),
          left: 0,
        }}>{`${placeholder} - ${isFocused}`}</Animated.Text>
      <TextInput
        style={textinput}
        onChangeText={onChangeText}
        {...otherProps}
        onFocus={handleFocused}
        onBlur={handleBlur}
      />

      <Pressable style={styles.pressable}>
        <EyeClose />
      </Pressable>
    </View>
  );
};

export default AppTextInput;
