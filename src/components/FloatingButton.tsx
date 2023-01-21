import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import useThemeStyles from 'src/hooks/useThemeStyles';

import ArrowIcon from 'src/assets/icons/arrow.svg';

type Props = {
  onPress: () => void;
};

const FloatingButton: React.FC<Props> = props => {
  const {onPress} = props;
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    bottombutton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
  });

  return (
    <TouchableOpacity style={styles.bottombutton} onPress={onPress}>
      <ArrowIcon />
    </TouchableOpacity>
  );
};

export default FloatingButton;
