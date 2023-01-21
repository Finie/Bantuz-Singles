import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { formatBytes, L10nContext, ThemeContext, UserContext, } from '../../utils';
import styles from './styles';
export const FileMessage = ({ message }) => {
    var _a, _b, _c;
    const l10n = React.useContext(L10nContext);
    const theme = React.useContext(ThemeContext);
    const user = React.useContext(UserContext);
    const { container, icon, iconContainer, name, size, textContainer } = styles({
        message,
        theme,
        user,
    });
    return (React.createElement(View, { accessibilityLabel: l10n.fileButtonAccessibilityLabel, style: container },
        React.createElement(View, { style: iconContainer }, (_c = (_b = (_a = theme.icons) === null || _a === void 0 ? void 0 : _a.documentIcon) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : (React.createElement(Image, { source: require('../../assets/icon-document.png'), style: icon }))),
        React.createElement(View, { style: textContainer },
            React.createElement(Text, { style: name }, message.name),
            React.createElement(Text, { style: size }, formatBytes(message.size)))));
};
//# sourceMappingURL=FileMessage.js.map