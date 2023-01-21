import {LinkPreview, REGEX_LINK} from '@flyerhq/react-native-link-preview';
import moment from 'moment';
import * as React from 'react';
import {Linking, Text, View} from 'react-native';
import ParsedText from 'react-native-parsed-text';

import {
  excludeDerivedMessageProps,
  getUserName,
  ThemeContext,
  UserContext,
} from '../../utils';
import styles from './styles';
export const TextMessage = ({
  enableAnimation,
  message,
  messageWidth,
  onPreviewDataFetched,
  showName,
  usePreviewData,
}) => {
  const theme = React.useContext(ThemeContext);
  const user = React.useContext(UserContext);
  const [previewData, setPreviewData] = React.useState(message.previewData);
  const {
    descriptionText,
    headerText,
    titleText,
    text,
    timetext,
    textContainer,
  } = styles({
    message,
    theme,
    user,
  });
  const hanleEmailPress = email => {
    try {
      Linking.openURL(`mailto:${email}`);
    } catch (_a) {}
  };
  const handlePreviewDataFetched = data => {
    setPreviewData(data);
    onPreviewDataFetched === null || onPreviewDataFetched === void 0
      ? void 0
      : onPreviewDataFetched({
          // It's okay to cast here since we know it is a text message
          // type-coverage:ignore-next-line
          message: excludeDerivedMessageProps(message),
          previewData: data,
        });
  };
  const handleUrlPress = url => {
    const uri = url.toLowerCase().startsWith('http') ? url : `https://${url}`;
    Linking.openURL(uri);
  };
  const renderPreviewDescription = description => {
    return React.createElement(
      Text,
      {numberOfLines: 3, style: descriptionText},
      description,
    );
  };
  const renderPreviewHeader = header => {
    return React.createElement(
      Text,
      {numberOfLines: 1, style: headerText},
      header,
    );
  };
  const renderPreviewText = previewText => {
    return React.createElement(
      ParsedText,
      {
        accessibilityRole: 'link',
        parse: [
          {
            onPress: hanleEmailPress,
            style: [text, {textDecorationLine: 'underline'}],
            type: 'email',
          },
          {
            onPress: handleUrlPress,
            pattern: REGEX_LINK,
            style: [text, {textDecorationLine: 'underline'}],
          },
        ],
        style: text,
      },
      previewText,
    );
  };
  const renderPreviewTitle = title => {
    return React.createElement(
      Text,
      {numberOfLines: 2, style: titleText},
      title,
    );
  };
  return usePreviewData &&
    !!onPreviewDataFetched &&
    REGEX_LINK.test(message.text.toLowerCase()) ? (
    React.createElement(LinkPreview, {
      containerStyle: {
        width: (previewData === null || previewData === void 0
        ? void 0
        : previewData.image)
          ? messageWidth
          : undefined,
      },
      enableAnimation: enableAnimation,
      header: showName ? getUserName(message.sender) : undefined,
      onPreviewDataFetched: handlePreviewDataFetched,
      previewData: previewData,
      renderDescription: renderPreviewDescription,
      renderHeader: renderPreviewHeader,
      renderText: renderPreviewText,
      renderTitle: renderPreviewTitle,
      text: message.content,
      textContainerStyle: textContainer,
      touchableWithoutFeedbackProps: {
        accessibilityRole: undefined,
        accessible: false,
        disabled: true,
      },
    })
  ) : (
    <View style={textContainer}>
      <Text style={text}>
        {message.content}
        {'       '}
        <Text style={timetext}>
          {moment(message.created_on).format('HH:mm a')}
        </Text>
      </Text>
    </View>
  );
};
//# sourceMappingURL=TextMessage.js.map
