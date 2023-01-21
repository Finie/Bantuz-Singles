import { StyleSheet } from 'react-native';
const styles = ({ message, theme, user, }) => StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: theme.insets.messageInsetsVertical,
        paddingRight: theme.insets.messageInsetsHorizontal,
    },
    icon: {
        tintColor: (user === null || user === void 0 ? void 0 : user.id) === message.author.id
            ? theme.colors.sentMessageDocumentIcon
            : theme.colors.receivedMessageDocumentIcon,
    },
    iconContainer: {
        alignItems: 'center',
        backgroundColor: (user === null || user === void 0 ? void 0 : user.id) === message.author.id
            ? `${String(theme.colors.sentMessageDocumentIcon)}33`
            : `${String(theme.colors.receivedMessageDocumentIcon)}33`,
        borderRadius: 21,
        height: 42,
        justifyContent: 'center',
        width: 42,
    },
    name: (user === null || user === void 0 ? void 0 : user.id) === message.author.id
        ? theme.fonts.sentMessageBodyTextStyle
        : theme.fonts.receivedMessageBodyTextStyle,
    size: {
        ...((user === null || user === void 0 ? void 0 : user.id) === message.author.id
            ? theme.fonts.sentMessageCaptionTextStyle
            : theme.fonts.receivedMessageCaptionTextStyle),
        marginTop: 4,
    },
    textContainer: {
        flexShrink: 1,
        marginLeft: 16,
    },
});
export default styles;
//# sourceMappingURL=styles.js.map