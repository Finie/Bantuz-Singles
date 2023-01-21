import * as React from 'react';
import {TextInput, View, Keyboard} from 'react-native';
import useThemeStyles from 'src/hooks/useThemeStyles';
import {L10nContext, ThemeContext, unwrap, UserContext} from '../../utils';
import {AttachmentButton} from '../AttachmentButton';
import {CircularActivityIndicator} from '../CircularActivityIndicator';
import {SendButton} from '../SendButton';
import styles from './styles';
/** Bottom bar input component with a text input, attachment and
 * send buttons inside. By default hides send button when text input is empty. */
export const Input = ({
  attachmentButtonProps,
  attachmentCircularActivityIndicatorProps,
  isAttachmentUploading,
  onAttachmentPress,
  onSendPress,
  sendButtonVisibilityMode,
  onKeyboardStateChange,
  textInputProps,
}) => {
  var _a, _b;
  const l10n = React.useContext(L10nContext);
  const theme = React.useContext(ThemeContext);
  const user = React.useContext(UserContext);
  const {container, input, marginRight} = styles({theme});

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        onKeyboardStateChange(true); //opened
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        onKeyboardStateChange(false); // closed
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const {colors} = useThemeStyles();
  // Use `defaultValue` if provided
  const [text, setText] = React.useState(
    (_a =
      textInputProps === null || textInputProps === void 0
        ? void 0
        : textInputProps.defaultValue) !== null && _a !== void 0
      ? _a
      : '',
  );
  const value =
    (_b =
      textInputProps === null || textInputProps === void 0
        ? void 0
        : textInputProps.value) !== null && _b !== void 0
      ? _b
      : text;
  const handleChangeText = newText => {
    var _a;
    // Track local state in case `onChangeText` is provided and `value` is not
    setText(newText);
    (_a =
      textInputProps === null || textInputProps === void 0
        ? void 0
        : textInputProps.onChangeText) === null || _a === void 0
      ? void 0
      : _a.call(textInputProps, newText);
  };
  const handleSend = () => {
    const trimmedValue = value.trim();
    // Impossible to test since button is not visible when value is empty.
    // Additional check for the keyboard input.
    /* istanbul ignore next */
    if (trimmedValue) {
      onSendPress({text: trimmedValue, type: 'text'});
      setText('');
    }
  };

  return React.createElement(
    View,
    {style: container},
    user &&
      (isAttachmentUploading
        ? React.createElement(CircularActivityIndicator, {
            ...{
              ...attachmentCircularActivityIndicatorProps,
              color: theme.colors.inputText,
              style: marginRight,
            },
          })
        : !!onAttachmentPress &&
          React.createElement(AttachmentButton, {
            ...unwrap(attachmentButtonProps),
            onPress: onAttachmentPress,
          })),
    React.createElement(TextInput, {
      multiline: true,
      placeholder: 'Message...',
      placeholderTextColor: colors.silver,
      underlineColorAndroid: 'transparent',
      ...textInputProps,
      // Keep our implementation but allow user to use these `TextInputProps`
      style: [
        input,
        textInputProps === null || textInputProps === void 0
          ? void 0
          : textInputProps.style,
      ],
      onChangeText: handleChangeText,
      value: value,
    }),
    sendButtonVisibilityMode === 'always' ||
      (sendButtonVisibilityMode === 'editing' && user && value.trim())
      ? React.createElement(SendButton, {onPress: handleSend})
      : null,
  );
};
//# sourceMappingURL=Input.js.map
