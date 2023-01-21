import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CircularActivityIndicator } from '../CircularActivityIndicator';
export const StatusIcon = React.memo(({ currentUserIsAuthor, showStatus, status, theme, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    let statusIcon = null;
    if (showStatus) {
        switch (status) {
            case 'delivered':
            case 'sent':
                statusIcon = (_c = (_b = (_a = theme.icons) === null || _a === void 0 ? void 0 : _a.deliveredIcon) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : (React.createElement(Image, { source: require('../../assets/icon-delivered.png'), style: { tintColor: theme.colors.primary }, testID: 'DeliveredIcon' }));
                break;
            case 'error':
                statusIcon = (_f = (_e = (_d = theme.icons) === null || _d === void 0 ? void 0 : _d.errorIcon) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : (React.createElement(Image, { source: require('../../assets/icon-error.png'), style: { tintColor: theme.colors.error }, testID: 'ErrorIcon' }));
                break;
            case 'seen':
                statusIcon = (_j = (_h = (_g = theme.icons) === null || _g === void 0 ? void 0 : _g.seenIcon) === null || _h === void 0 ? void 0 : _h.call(_g)) !== null && _j !== void 0 ? _j : (React.createElement(Image, { source: require('../../assets/icon-seen.png'), style: { tintColor: theme.colors.primary }, testID: 'SeenIcon' }));
                break;
            case 'sending':
                statusIcon = (_m = (_l = (_k = theme.icons) === null || _k === void 0 ? void 0 : _k.sendingIcon) === null || _l === void 0 ? void 0 : _l.call(_k)) !== null && _m !== void 0 ? _m : (React.createElement(CircularActivityIndicator, { color: theme.colors.primary, size: 10 }));
                break;
            default:
                break;
        }
    }
    return currentUserIsAuthor ? (React.createElement(View, { style: styles.container, testID: 'StatusIconContainer' }, statusIcon)) : null;
});
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 16,
        justifyContent: 'center',
        paddingHorizontal: 4,
        width: 16,
    },
});
//# sourceMappingURL=StatusIcon.js.map