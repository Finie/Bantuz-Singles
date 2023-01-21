import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getUserAvatarNameColor, getUserInitials } from '../../utils';
export const Avatar = React.memo(({ author, currentUserIsAuthor, showAvatar, showUserAvatars, theme, }) => {
    const renderAvatar = () => {
        const color = getUserAvatarNameColor(author, theme.colors.userAvatarNameColors);
        const initials = getUserInitials(author);
        if (author.imageUrl) {
            return (React.createElement(Image, { accessibilityRole: 'image', resizeMode: 'cover', source: { uri: author.imageUrl }, style: [
                    styles.image,
                    { backgroundColor: theme.colors.userAvatarImageBackground },
                ] }));
        }
        return (React.createElement(View, { style: [styles.avatarBackground, { backgroundColor: color }] },
            React.createElement(Text, { style: theme.fonts.userAvatarTextStyle }, initials)));
    };
    return !currentUserIsAuthor && showUserAvatars ? (React.createElement(View, { testID: 'AvatarContainer' }, showAvatar ? renderAvatar() : React.createElement(View, { style: styles.placeholder }))) : null;
});
const styles = StyleSheet.create({
    avatarBackground: {
        alignItems: 'center',
        borderRadius: 16,
        height: 32,
        justifyContent: 'center',
        marginRight: 8,
        width: 32,
    },
    image: {
        alignItems: 'center',
        borderRadius: 16,
        height: 32,
        justifyContent: 'center',
        marginRight: 8,
        width: 32,
    },
    placeholder: {
        width: 40,
    },
});
//# sourceMappingURL=Avatar.js.map