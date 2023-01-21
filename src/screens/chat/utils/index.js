import dayjs from 'dayjs';
import * as React from 'react';
import Blob from 'react-native/Libraries/Blob/Blob';
import {l10n} from '../l10n';
import {defaultTheme} from '../theme';
export const L10nContext = React.createContext(l10n.en);
export const ThemeContext = React.createContext(defaultTheme);
export const UserContext = React.createContext(undefined);
/** Returns text representation of a provided bytes value (e.g. 1kB, 1GB) */
export const formatBytes = (size, fractionDigits = 2) => {
  if (size <= 0) return '0 B';
  const multiple = Math.floor(Math.log(size) / Math.log(1024));
  return (
    parseFloat((size / Math.pow(1024, multiple)).toFixed(fractionDigits)) +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][multiple]
  );
};
/** Returns size in bytes of the provided text */
export const getTextSizeInBytes = text => new Blob([text]).size;
/** Returns user avatar and name color based on the ID */
export const getUserAvatarNameColor = (user, colors) => null;
// colors[hashCode(user.id) % colors.length];
/** Returns user initials (can have only first letter of firstName/lastName or both) */
export const getUserInitials = ({firstName, lastName}) => {
  var _a, _b;
  return `${
    (_a =
      firstName === null || firstName === void 0
        ? void 0
        : firstName.charAt(0)) !== null && _a !== void 0
      ? _a
      : ''
  }${
    (_b =
      lastName === null || lastName === void 0
        ? void 0
        : lastName.charAt(0)) !== null && _b !== void 0
      ? _b
      : ''
  }`
    .toUpperCase()
    .trim();
};
/** Returns user name as joined firstName and lastName */
export const getUserName = ({firstName, lastName}) =>
  `${firstName !== null && firstName !== void 0 ? firstName : ''} ${
    lastName !== null && lastName !== void 0 ? lastName : ''
  }`.trim();
/** Returns hash code of the provided text */
export const hashCode = (text = '') => {
  let i,
    chr,
    hash = 0;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
/** Inits dayjs locale */
export const initLocale = locale => {
  const locales = {
    en: require('dayjs/locale/en'),
    es: require('dayjs/locale/es'),
    ko: require('dayjs/locale/ko'),
    pl: require('dayjs/locale/pl'),
    pt: require('dayjs/locale/pt'),
    ru: require('dayjs/locale/ru'),
    tr: require('dayjs/locale/tr'),
    uk: require('dayjs/locale/uk'),
  };
  locale ? locales[locale] : locales.en;
  dayjs.locale(locale);
};
/** Returns either prop or empty object if null or undefined */
export const unwrap = prop => (prop !== null && prop !== void 0 ? prop : {});
/** Returns formatted date used as a divider between different days in the chat history */
const getVerboseDateTimeRepresentation = (
  dateTime,
  {dateFormat, timeFormat},
) => {
  const formattedDate = dateFormat
    ? dayjs(dateTime).format(dateFormat)
    : dayjs(dateTime).format('MMM D');
  const formattedTime = timeFormat
    ? dayjs(dateTime).format(timeFormat)
    : dayjs(dateTime).format('HH:mm');
  const localDateTime = dayjs(dateTime);
  const now = dayjs();
  if (
    localDateTime.isSame(now, 'day') &&
    localDateTime.isSame(now, 'month') &&
    localDateTime.isSame(now, 'year')
  ) {
    return formattedTime;
  }
  return `${formattedDate}, ${formattedTime}`;
};
/** Parses provided messages to chat messages (with headers) and returns them with a gallery */
export const calculateChatMessages = (
  messages,
  user,
  {customDateHeaderText, dateFormat, showUserNames, timeFormat},
) => {
  var _a, _b;
  let chatMessages = [];
  let gallery = [];
  let shouldShowName = false;
  for (let i = messages.length - 1; i >= 0; i--) {
    const isFirst = i === messages.length - 1;
    const isLast = i === 0;
    const message = messages[i];
    const messageHasCreatedAt = !!message.createdAt;
    const nextMessage = isLast ? undefined : messages[i - 1];
    const nextMessageHasCreatedAt = !!(nextMessage === null ||
    nextMessage === void 0
      ? void 0
      : nextMessage.createdAt);
    const nextMessageSameAuthor =
      message.sender ===
      (nextMessage === null || nextMessage === void 0
        ? void 0
        : message.sender);
    const notMyMessage = message.sender !== user.id;
    let nextMessageDateThreshold = false;
    let nextMessageDifferentDay = false;
    let nextMessageInGroup = false;
    let showName = false;
    if (showUserNames) {
      const previousMessage = isFirst ? undefined : messages[i + 1];
      const isFirstInGroup =
        notMyMessage &&
        (message.author.id !==
          (previousMessage === null || previousMessage === void 0
            ? void 0
            : previousMessage.author.id) ||
          (messageHasCreatedAt &&
            !!(previousMessage === null || previousMessage === void 0
              ? void 0
              : previousMessage.createdAt) &&
            message.createdAt - previousMessage.createdAt > 60000));
      if (isFirstInGroup) {
        shouldShowName = false;
        if (message.type === 'text') {
          showName = true;
        } else {
          shouldShowName = true;
        }
      }
      if (message.type === 'text' && shouldShowName) {
        showName = true;
        shouldShowName = false;
      }
    }
    if (messageHasCreatedAt && nextMessageHasCreatedAt) {
      nextMessageDateThreshold =
        nextMessage.createdAt - message.createdAt >= 900000;
      nextMessageDifferentDay = !dayjs(message.createdAt).isSame(
        nextMessage.createdAt,
        'day',
      );
      nextMessageInGroup =
        nextMessageSameAuthor &&
        nextMessage.createdAt - message.createdAt <= 60000;
    }
    if (isFirst && messageHasCreatedAt) {
      const text =
        (_a =
          customDateHeaderText === null || customDateHeaderText === void 0
            ? void 0
            : customDateHeaderText(message.createdAt)) !== null && _a !== void 0
          ? _a
          : getVerboseDateTimeRepresentation(message.createdAt, {
              dateFormat,
              timeFormat,
            });
      chatMessages = [{id: text, text, type: 'dateHeader'}, ...chatMessages];
    }
    chatMessages = [
      {
        ...message,
        nextMessageInGroup,
        // TODO: Check this
        offset: !nextMessageInGroup ? 12 : 0,
        showName:
          notMyMessage &&
          showUserNames &&
          showName &&
          !!getUserName(message.author),
        showStatus: true,
      },
      ...chatMessages,
    ];
    if (nextMessageDifferentDay || nextMessageDateThreshold) {
      const text =
        (_b =
          customDateHeaderText === null || customDateHeaderText === void 0
            ? void 0
            : customDateHeaderText(nextMessage.createdAt)) !== null &&
        _b !== void 0
          ? _b
          : getVerboseDateTimeRepresentation(nextMessage.createdAt, {
              dateFormat,
              timeFormat,
            });
      chatMessages = [
        {
          id: text,
          text,
          type: 'dateHeader',
        },
        ...chatMessages,
      ];
    }
    if (message.type === 'image') {
      gallery = [...gallery, {id: message.id, uri: message.uri}];
    }
  }
  return {
    chatMessages,
    gallery,
  };
};
/** Removes all derived message props from the derived message */
export const excludeDerivedMessageProps = message => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {nextMessageInGroup, offset, showName, showStatus, ...rest} = message;
  return {...rest};
};
//# sourceMappingURL=index.js.map
