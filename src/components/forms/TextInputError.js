import {View, StyleSheet, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Text from '../Text';
import ErrorInfo from 'src/assets/icons/errorinfo.svg';

const TextInputError = props => {
  const {colors} = useThemeStyles();

  const {style, error, visible} = props;

  if (!visible || !error) return null;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FF22220F',
      padding: 3,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    text: {
      fontSize: 12,
      color: colors.danger,
      marginLeft: 6,
    },
  });
  return (
    <View style={styles.container}>
      <ErrorInfo />
      <Text style={[styles.text, style]}>{error}</Text>
    </View>
  );
};

export default TextInputError;
