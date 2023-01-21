import {View, StyleSheet} from 'react-native';
import React from 'react';
import Text from '../Text';
import useThemeStyles from 'src/hooks/useThemeStyles';


type Props = {
  message: string;
  time: string;
};

const OtherUserFirstBubble: React.FC<Props> = ({message, time}) => {
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.snow,
      maxWidth: 280,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      padding: 12,
      marginHorizontal: 30,
      margin: 2,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    textcontaine: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      flex: 2,
    },
    timeContainer: {
      justifyContent: 'flex-end',
      flex: 0.5,
      alignItems: 'flex-end',
    },
    message: {color: colors.black, fontSize: 14},
    time: {
      color: colors.black,
      fontSize: 12,
      fontWeight: '400',
      marginLeft: 12,
      lineHeight: 15,
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textcontaine}>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default OtherUserFirstBubble;
