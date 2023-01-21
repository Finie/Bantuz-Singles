import {oneOf} from '@flyerhq/react-native-link-preview';
import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  excludeDerivedMessageProps,
  ThemeContext,
  UserContext,
} from '../../utils';
import {Avatar} from '../Avatar';
import {FileMessage} from '../FileMessage';
import {ImageMessage} from '../ImageMessage';
import {StatusIcon} from '../StatusIcon';
import {TextMessage} from '../TextMessage';
import styles from './styles';
/** Base component for all message types in the chat. Renders bubbles around
 * messages and status. Sets maximum width for a message for
 * a nice look on larger screens. */
export const Message = React.memo(
  ({
    enableAnimation,
    message,
    messageWidth,
    onMessagePress,
    onMessageLongPress,
    onPreviewDataFetched,
    renderBubble,
    renderCustomMessage,
    renderFileMessage,
    renderImageMessage,
    renderTextMessage,
    roundBorder,
    showAvatar,
    showName,
    showStatus,
    showUserAvatars,
    usePreviewData,
  }) => {
    const theme = React.useContext(ThemeContext);
    const user = React.useContext(UserContext);
    const currentUserIsAuthor =
      message.type !== 'dateHeader' &&
      (user === null || user === void 0 ? void 0 : user.id) === message.sender;
    const {container, contentContainer, dateHeader, pressable} = styles({
      currentUserIsAuthor,
      message,
      messageWidth,
      roundBorder,
      theme,
    });
    if (message.type === 'dateHeader') {
      return React.createElement(
        View,
        {style: dateHeader},
        React.createElement(
          Text,
          {style: theme.fonts.dateDividerTextStyle},
          message.content,
        ),
      );
    }
    const renderBubbleContainer = () => {
      const child = renderMessage();
      return oneOf(
        renderBubble,
        React.createElement(
          View,
          {style: contentContainer, testID: 'ContentContainer'},
          child,
        ),
      )({
        child,
        message: excludeDerivedMessageProps(message),
        nextMessageInGroup: roundBorder,
      });
    };
    const renderMessage = () => {
      var _a;
      switch (message.type) {
        case 'custom':
          return (_a =
            renderCustomMessage === null || renderCustomMessage === void 0
              ? void 0
              : renderCustomMessage(
                  // It's okay to cast here since we checked message type above
                  // type-coverage:ignore-next-line
                  excludeDerivedMessageProps(message),
                  messageWidth,
                )) !== null && _a !== void 0
            ? _a
            : null;
        case 'file':
          return oneOf(
            renderFileMessage,
            React.createElement(FileMessage, {message: message}),
          )(
            // type-coverage:ignore-next-line
            excludeDerivedMessageProps(message),
            messageWidth,
          );
        case 'image':
          return oneOf(
            renderImageMessage,
            React.createElement(ImageMessage, {
              ...{
                message,
                messageWidth,
              },
            }),
          )(
            // type-coverage:ignore-next-line
            excludeDerivedMessageProps(message),
            messageWidth,
          );
        case 'text':
          return oneOf(
            renderTextMessage,
            React.createElement(TextMessage, {
              ...{
                enableAnimation,
                message,
                messageWidth,
                onPreviewDataFetched,
                showName,
                usePreviewData,
              },
            }),
          )(
            // type-coverage:ignore-next-line
            excludeDerivedMessageProps(message),
            messageWidth,
            showName,
          );
        default:
          return null;
      }
    };
    return React.createElement(
      View,
      {style: container},
      React.createElement(Avatar, {
        ...{
          author: message.author,
          currentUserIsAuthor,
          showAvatar,
          showUserAvatars,
          theme,
        },
      }),
      React.createElement(
        Pressable,
        {
          onLongPress: () =>
            onMessageLongPress === null || onMessageLongPress === void 0
              ? void 0
              : onMessageLongPress(excludeDerivedMessageProps(message)),
          onPress: () =>
            onMessagePress === null || onMessagePress === void 0
              ? void 0
              : onMessagePress(excludeDerivedMessageProps(message)),
          style: pressable,
        },
        renderBubbleContainer(),
      ),
      React.createElement(StatusIcon, {
        ...{
          currentUserIsAuthor,
          showStatus,
          status: message.status,
          theme,
        },
      }),
    );
  },
);
