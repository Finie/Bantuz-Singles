import {View, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Text from './Text';

import Dolla from 'src/assets/icons/dollainactive.svg';

const SwitchSelection = ({isMonyrequired = false, title}) => {
  const {colors} = useThemeStyles();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    text: {
      marginLeft: 16,
      fontSize: 14,
      lineHeight: 17,
      color: colors.black,
    },
    sty: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    center: {
      flex: 1,
    },
  });
  return (
    <View style={[styles.container, isMonyrequired && styles.sty]}>
      <View>
        <Switch
          trackColor={{false: colors.snow, true: colors.snow}}
          thumbColor={isEnabled ? colors.primary : colors.silver}
          ios_backgroundColor={colors.snow}
          onValueChange={toggleSwitch}
          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
          value={isEnabled}
        />
      </View>

      <View style={styles.center}>
        <Text style={styles.text}>{title}</Text>
      </View>

      <View>{isMonyrequired && <Dolla />}</View>
    </View>
  );
};

export default SwitchSelection;
