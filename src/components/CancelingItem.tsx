import {View, StyleSheet} from 'react-native';
import React from 'react';
import Text from './Text';
import useThemeStyles from 'src/hooks/useThemeStyles';

type Props = {
  title: string;
  icon: JSX.Element;
};

const CancelingItem: React.FC<Props> = ({title, icon}) => {
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 7.5,
    },
    text: {
      fontSize: 16,
      lineHeight: 19,
      color: colors.black,
      marginLeft: 10,
    },
  });
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default CancelingItem;
