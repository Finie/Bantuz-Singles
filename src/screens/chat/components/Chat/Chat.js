import {
  KeyboardAccessoryView,
  useComponentSize,
} from '@flyerhq/react-native-keyboard-accessory-view';
import {oneOf} from '@flyerhq/react-native-link-preview';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as React from 'react';
import {
  FlatList,
  InteractionManager,
  LayoutAnimation,
  StatusBar,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePrevious} from '../../hooks';
import {l10n} from '../../l10n';
import {defaultTheme} from '../../theme';
import {
  calculateChatMessages,
  initLocale,
  L10nContext,
  ThemeContext,
  unwrap,
  UserContext,
} from '../../utils';
import {CircularActivityIndicator} from '../CircularActivityIndicator';
import {Input} from '../Input';
import {Message} from '../Message';
import ImageView from './ImageView';
import styles from './styles';
// Untestable
/* istanbul ignore next */
const animate = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};
// eslint-disable-next-line jest/require-hook
dayjs.extend(calendar);
/** Entry component, represents the complete chat */
export const Chat = ({
  customBottomComponent,
  customDateHeaderText,
  dateFormat,
  disableImageGallery,
  emptyState,
  enableAnimation,
  flatListProps,
  inputProps,
  isAttachmentUploading,
  isLastPage,
  l10nOverride,
  locale = 'en',
  messages,
  onAttachmentPress,
  onEndReached,
  onMessageLongPress,
  onMessagePress,
  onPreviewDataFetched,
  onSendPress,
  renderBubble,
  renderCustomMessage,
  renderFileMessage,
  renderImageMessage,
  renderTextMessage,
  sendButtonVisibilityMode = 'editing',
  showUserAvatars = false,
  showUserNames = false,
  textInputProps,
  theme = defaultTheme,
  timeFormat,
  usePreviewData = true,
  user,
}) => {
  const {
    container,
    feagmentcontainer,
    emptyComponentContainer,
    emptyComponentTitle,
    flatList,
    activeKeyboardflatList,
    flatListContentContainer,
    footer,
    footerLoadingPage,
    header,
    keyboardAccessoryView,
  } = styles({theme});
  const {onLayout, size} = useComponentSize();
  const animationRef = React.useRef(false);
  const list = React.useRef(null);
  const insets = useSafeAreaInsets();
  const [isImageViewVisible, setIsImageViewVisible] = React.useState(false);
  const [isNextPageLoading, setNextPageLoading] = React.useState(false);
  const [imageViewIndex, setImageViewIndex] = React.useState(0);
  const [stackEntry, setStackEntry] = React.useState({});
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const l10nValue = React.useMemo(
    () => ({...l10n[locale], ...unwrap(l10nOverride)}),
    [l10nOverride, locale],
  );
  const {chatMessages, gallery} = calculateChatMessages(messages, user, {
    customDateHeaderText,
    dateFormat,
    showUserNames,
    timeFormat,
  });
  const previousChatMessages = usePrevious(chatMessages);
  React.useEffect(() => {
    var _a, _b, _c, _d, _e, _f;
    if (
      ((_a = chatMessages[0]) === null || _a === void 0 ? void 0 : _a.type) !==
        'dateHeader' &&
      ((_b = chatMessages[0]) === null || _b === void 0 ? void 0 : _b.id) !==
        ((_c =
          previousChatMessages === null || previousChatMessages === void 0
            ? void 0
            : previousChatMessages[0]) === null || _c === void 0
          ? void 0
          : _c.id) &&
      ((_e =
        (_d = chatMessages[0]) === null || _d === void 0
          ? void 0
          : _d.author) === null || _e === void 0
        ? void 0
        : _e.id) === user.id
    ) {
      (_f = list.current) === null || _f === void 0
        ? void 0
        : _f.scrollToOffset({
            animated: true,
            offset: 0,
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages]);
  React.useEffect(() => {
    initLocale(locale);
  }, [locale]);
  // Untestable
  /* istanbul ignore next */
  if (animationRef.current && enableAnimation) {
    InteractionManager.runAfterInteractions(animate);
  }
  React.useEffect(() => {
    // Untestable
    /* istanbul ignore next */
    if (animationRef.current && enableAnimation) {
      InteractionManager.runAfterInteractions(animate);
    } else {
      animationRef.current = true;
    }
  }, [enableAnimation, messages]);
  const handleEndReached = React.useCallback(
    // Ignoring because `scroll` event for some reason doesn't trigger even basic
    // `onEndReached`, impossible to test.
    // TODO: Verify again later
    /* istanbul ignore next */
    async ({distanceFromEnd}) => {
      if (
        !onEndReached ||
        isLastPage ||
        distanceFromEnd <= 0 ||
        messages.length === 0 ||
        isNextPageLoading
      ) {
        return;
      }
      setNextPageLoading(true);
      await (onEndReached === null || onEndReached === void 0
        ? void 0
        : onEndReached());
      setNextPageLoading(false);
    },
    [isLastPage, isNextPageLoading, messages.length, onEndReached],
  );
  const handleImagePress = React.useCallback(
    message => {
      setImageViewIndex(
        gallery.findIndex(
          image => image.id === message.id && image.uri === message.uri,
        ),
      );
      setIsImageViewVisible(true);
      setStackEntry(
        StatusBar.pushStackEntry({
          barStyle: 'light-content',
          animated: true,
        }),
      );
    },
    [gallery],
  );
  const handleMessagePress = React.useCallback(
    message => {
      if (message.type === 'image' && !disableImageGallery) {
        handleImagePress(message);
      }
      onMessagePress === null || onMessagePress === void 0
        ? void 0
        : onMessagePress(message);
    },
    [disableImageGallery, handleImagePress, onMessagePress],
  );

  const onKeyboardStateChange = status => {
    setKeyboardVisible(status);
  };
  // TODO: Tapping on a close button results in the next warning:
  // `An update to ImageViewing inside a test was not wrapped in act(...).`
  /* istanbul ignore next */
  const handleRequestClose = () => {
    setIsImageViewVisible(false);
    StatusBar.popStackEntry(stackEntry);
  };
  const keyExtractor = React.useCallback(({id}) => id, []);
  const renderItem = React.useCallback(
    ({item: message}) => {
      const messageWidth =
        showUserAvatars &&
        message.type !== 'dateHeader' &&
        message.sender !== user.id
          ? Math.floor(Math.min(size.width * 0.72, 440))
          : Math.floor(Math.min(size.width * 0.77, 440));
      const roundBorder =
        message.type !== 'dateHeader' && message.nextMessageInGroup;
      const showAvatar =
        message.type !== 'dateHeader' && !message.nextMessageInGroup;
      const showName = message.type !== 'dateHeader' && message.showName;
      const showStatus = message.type !== 'dateHeader' && message.showStatus;
      return React.createElement(Message, {
        ...{
          enableAnimation,
          message,
          messageWidth,
          onMessageLongPress,
          onMessagePress: handleMessagePress,
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
        },
      });
    },
    [
      enableAnimation,
      handleMessagePress,
      onMessageLongPress,
      onPreviewDataFetched,
      renderBubble,
      renderCustomMessage,
      renderFileMessage,
      renderImageMessage,
      renderTextMessage,
      showUserAvatars,
      size.width,
      usePreviewData,
      user.id,
    ],
  );
  const renderListEmptyComponent = React.useCallback(
    () =>
      React.createElement(
        View,
        {style: emptyComponentContainer},
        oneOf(
          emptyState,
          React.createElement(
            Text,
            {style: emptyComponentTitle},
            l10nValue.emptyChatPlaceholder,
          ),
        )(),
      ),
    [emptyComponentContainer, emptyComponentTitle, emptyState, l10nValue],
  );
  const renderListFooterComponent = React.useCallback(
    () =>
      // Impossible to test, see `handleEndReached` function
      /* istanbul ignore next */
      isNextPageLoading
        ? React.createElement(
            View,
            {style: footerLoadingPage},
            React.createElement(CircularActivityIndicator, {
              color: theme.colors.primary,
              size: 16,
            }),
          )
        : React.createElement(View, {style: footer}),
    [footer, footerLoadingPage, isNextPageLoading, theme.colors.primary],
  );
  const renderScrollable = React.useCallback(
    panHandlers =>
      React.createElement(FlatList, {
        automaticallyAdjustContentInsets: false,
        contentContainerStyle: [
          flatListContentContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            justifyContent: chatMessages.length !== 0 ? undefined : 'center',
            paddingTop: insets.bottom,
          },
        ],
        initialNumToRender: 10,
        ListEmptyComponent: renderListEmptyComponent,
        ListFooterComponent: renderListFooterComponent,
        ListHeaderComponent: React.createElement(View, null),
        ListHeaderComponentStyle: header,
        maxToRenderPerBatch: 6,
        onEndReachedThreshold: 0.75,
        style: isKeyboardVisible ? flatList : activeKeyboardflatList,
        // style: flatList,
        showsVerticalScrollIndicator: false,
        ...unwrap(flatListProps),
        data: chatMessages,
        inverted: true,
        keyboardDismissMode: 'interactive',
        keyExtractor: keyExtractor,
        onEndReached: handleEndReached,
        ref: list,
        renderItem: renderItem,
        ...panHandlers,
      }),
    [
      chatMessages,
      flatList,
      flatListContentContainer,
      flatListProps,
      handleEndReached,
      header,
      insets.bottom,
      keyExtractor,
      renderItem,
      renderListEmptyComponent,
      renderListFooterComponent,
    ],
  );
  return React.createElement(
    UserContext.Provider,
    {value: user},
    React.createElement(
      ThemeContext.Provider,
      {value: theme},
      React.createElement(
        L10nContext.Provider,
        {value: l10nValue},
        React.createElement(
          KeyboardAvoidingView,
          {
            behavior: Platform.OS === 'ios' ? 'padding' : 'height',
            style: {
              flexGrow: 1,
            },
          },
          React.createElement(
            View,
            {style: container, onLayout: onLayout},
            customBottomComponent
              ? React.createElement(
                  React.Fragment,
                  {style: feagmentcontainer},
                  React.createElement(
                    React.Fragment,
                    null,
                    renderScrollable({}),
                  ),
                  React.createElement(
                    React.Fragment,
                    null,
                    customBottomComponent(),
                  ),
                )
              : React.createElement(
                  KeyboardAccessoryView,
                  {
                    ...{
                      renderScrollable,
                      style: keyboardAccessoryView,
                    },
                  },
                  React.createElement(Input, {
                    ...{
                      ...unwrap(inputProps),
                      isAttachmentUploading,
                      onAttachmentPress,
                      onSendPress,
                      renderScrollable,
                      sendButtonVisibilityMode,
                      onKeyboardStateChange,
                      textInputProps,
                    },
                  }),
                ),
            React.createElement(ImageView, {
              imageIndex: imageViewIndex,
              images: gallery,
              onRequestClose: handleRequestClose,
              visible: isImageViewVisible,
            }),
          ),
        ),
      ),
    ),
  );
};
//# sourceMappingURL=Chat.js.map
