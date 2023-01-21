import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, } from 'react-native';
import { L10nContext, ThemeContext } from '../../utils';
export const AttachmentButton = ({ onPress, touchableOpacityProps, }) => {
    var _a, _b, _c;
    const l10n = React.useContext(L10nContext);
    const theme = React.useContext(ThemeContext);
    const handlePress = (event) => {
        var _a;
        onPress === null || onPress === void 0 ? void 0 : onPress();
        (_a = touchableOpacityProps === null || touchableOpacityProps === void 0 ? void 0 : touchableOpacityProps.onPress) === null || _a === void 0 ? void 0 : _a.call(touchableOpacityProps, event);
    };
    return (React.createElement(TouchableOpacity, { accessibilityLabel: l10n.attachmentButtonAccessibilityLabel, accessibilityRole: 'button', ...touchableOpacityProps, onPress: handlePress }, (_c = (_b = (_a = theme.icons) === null || _a === void 0 ? void 0 : _a.attachmentButtonIcon) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : (React.createElement(Image, { source: require('../../assets/icon-attachment.png'), style: [styles.image, { tintColor: theme.colors.inputText }] }))));
};
const styles = StyleSheet.create({
    image: {
        marginRight: 16,
    },
});
//# sourceMappingURL=AttachmentButton.js.map