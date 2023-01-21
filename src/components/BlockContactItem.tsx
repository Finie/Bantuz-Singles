import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import Text from './Text';
import Imagesa from 'src/assets/images/sliderone.png';
import {colors} from '@react-spring/shared';
import useThemeStyles from 'src/hooks/useThemeStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BlockContactItem = () => {
  const {colors} = useThemeStyles();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 40,
    },
    centertext: {
      flex: 1,
      marginLeft: 16,
    },
    name: {
      fontSize: 16,
      lineHeight: 19,
      fontWeight: '600',
      color: colors.black,
    },
    unblock: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '700',
      color: colors.primary,
    },
  });
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Image style={styles.image} source={Imagesa} />
      </View>
      <View style={styles.centertext}>
        <Text style={styles.name}>Irene Wambui</Text>
      </View>
      <View>
        <Text style={styles.unblock}>Unblock →</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BlockContactItem;
