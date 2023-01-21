import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {L10nContext, ThemeContext} from '../../utils';
export const SendButton = ({onPress, touchableOpacityProps}) => {
  var _a, _b, _c;
  const l10n = React.useContext(L10nContext);
  const theme = React.useContext(ThemeContext);
  const handlePress = event => {
    var _a;
    onPress();
    (_a =
      touchableOpacityProps === null || touchableOpacityProps === void 0
        ? void 0
        : touchableOpacityProps.onPress) === null || _a === void 0
      ? void 0
      : _a.call(touchableOpacityProps, event);
  };
  return React.createElement(
    TouchableOpacity,
    {
      accessibilityLabel: l10n.sendButtonAccessibilityLabel,
      accessibilityRole: 'button',
      ...touchableOpacityProps,
      onPress: handlePress,
      style: styles.sendButton,
    },
    (_c =
      (_b =
        (_a = theme.icons) === null || _a === void 0
          ? void 0
          : _a.sendButtonIcon) === null || _b === void 0
        ? void 0
        : _b.call(_a)) !== null && _c !== void 0
      ? _c
      : React.createElement(Image, {
          source: require('src/assets/images/sendicon.png'),
          style: {width: 20, height: 20},
        }),
  );
};
const styles = StyleSheet.create({
  sendButton: {
    marginLeft: 16,
  },
});
//# sourceMappingURL=SendButton.js.map
