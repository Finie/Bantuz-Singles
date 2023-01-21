import {
  Pressable,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Text from '../Text';
import useThemeStyles from 'src/hooks/useThemeStyles';

type Props = {
  type?: 'primary' | 'secondary' | 'textButton' | 'disabled';
  style?: StyleProp<ViewStyle>;
  textSize?: number;
  onPress?: () => void;
  icon?: JSX.Element | null;
  children: React.ReactNode;
};

const Button: React.FC<Props> = props => {
  const {type, style, textSize, onPress, icon, children} = props;

  const {colors} = useThemeStyles();

  const styles = StyleSheet.create({
    touchableopacity: {
      height: 56,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 28,
      marginVertical: 8,
    },
    teext: {
      fontSize: textSize ? textSize : 14,
      color: colors.white,
      fontWeight: '700',
      lineHeight: 17,
    },

    touchableopacitydisabled: {
      height: 56,
      backgroundColor: colors.snow,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 28,
      marginVertical: 8,
    },
    teextdisabled: {
      fontSize: textSize ? textSize : 14,
      color: colors.silver,
      fontWeight: '700',
      lineHeight: 17,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={type === 'disabled' ? true : false}
      style={
        type === 'disabled'
          ? styles.touchableopacitydisabled
          : styles.touchableopacity
      }>
      <Text style={type === 'disabled' ? styles.teextdisabled : styles.teext}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
