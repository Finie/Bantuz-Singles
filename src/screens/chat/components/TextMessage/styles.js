import {StyleSheet} from 'react-native';
import useThemeStyles from 'src/hooks/useThemeStyles';
import {getUserAvatarNameColor} from '../../utils';
const styles = ({message, theme, user}) => {
  const {colors} = useThemeStyles();

  return StyleSheet.create({
    descriptionText: {
      ...((user === null || user === void 0 ? void 0 : user.id) ===
      message.sender
        ? theme.fonts.sentMessageLinkDescriptionTextStyle
        : theme.fonts.receivedMessageLinkDescriptionTextStyle),
      marginTop: 4,
    },
    headerText: {
      ...theme.fonts.userNameTextStyle,
      color: getUserAvatarNameColor(
        message.author,
        theme.colors.userAvatarNameColors,
      ),
      marginBottom: 6,
    },
    titleText:
      (user === null || user === void 0 ? void 0 : user.id) === message.sender
        ? theme.fonts.sentMessageLinkTitleTextStyle
        : theme.fonts.receivedMessageLinkTitleTextStyle,
    text:
      (user === null || user === void 0 ? void 0 : user.id) === message.sender
        ? theme.fonts.sentMessageBodyTextStyle
        : theme.fonts.receivedMessageBodyTextStyle,
    textContainer: {
      marginHorizontal: theme.insets.messageInsetsHorizontal,
      marginVertical: theme.insets.messageInsetsVertical,
      flexDirection: 'row',
    },
    timetext:
      (user === null || user === void 0 ? void 0 : user.id) === message.sender
        ? {
            marginRight: 12,
            marginLeft: 15,
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.56,
            color: colors.white,
          }
        : {
            marginRight: 12,
            marginLeft: 15,
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.56,
            color: colors.silver,
          },

    timecontainer: {
      marginRight: 10,
      marginLeft: 16,
      marginTop: 3,
    },
  });
};
export default styles;
//# sourceMappingURL=styles.js.map
