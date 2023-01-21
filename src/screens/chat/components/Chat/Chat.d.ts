import * as React from 'react';
import { FlatListProps } from 'react-native';
import { l10n } from '../../l10n';
import { MessageType, Theme, User } from '../../types';
import { InputAdditionalProps, InputTopLevelProps } from '../Input';
import { MessageTopLevelProps } from '../Message';
export declare type ChatTopLevelProps = InputTopLevelProps & MessageTopLevelProps;
export interface ChatProps extends ChatTopLevelProps {
    /** Allows you to replace the default Input widget e.g. if you want to create a channel view. */
    customBottomComponent?: () => React.ReactNode;
    /** If {@link ChatProps.dateFormat} and/or {@link ChatProps.timeFormat} is not enough to
     * customize date headers in your case, use this to return an arbitrary
     * string based on a `dateTime` of a particular message. Can be helpful to
     * return "Today" if `dateTime` is today. IMPORTANT: this will replace
     * all default date headers, so you must handle all cases yourself, like
     * for example today, yesterday and before. Or you can just return the same
     * date header for any message. */
    customDateHeaderText?: (dateTime: number) => string;
    /** Allows you to customize the date format. IMPORTANT: only for the date,
     * do not return time here. @see {@link ChatProps.timeFormat} to customize the time format.
     * @see {@link ChatProps.customDateHeaderText} for more customization. */
    dateFormat?: string;
    /** Disable automatic image preview on tap. */
    disableImageGallery?: boolean;
    /** Allows you to change what the user sees when there are no messages.
     * `emptyChatPlaceholder` and `emptyChatPlaceholderTextStyle` are ignored
     * in this case. */
    emptyState?: () => React.ReactNode;
    /** Use this to enable `LayoutAnimation`. Experimental on Android (same as React Native). */
    enableAnimation?: boolean;
    flatListProps?: Partial<FlatListProps<MessageType.DerivedAny[]>>;
    inputProps?: InputAdditionalProps;
    /** Used for pagination (infinite scroll) together with {@link ChatProps.onEndReached}.
     * When true, indicates that there are no more pages to load and
     * pagination will not be triggered. */
    isLastPage?: boolean;
    /** Override the default localized copy. */
    l10nOverride?: Partial<Record<keyof typeof l10n[keyof typeof l10n], string>>;
    locale?: keyof typeof l10n;
    messages: MessageType.Any[];
    /** Used for pagination (infinite scroll). Called when user scrolls
     * to the very end of the list (minus `onEndReachedThreshold`).
     * See {@link ChatProps.flatListProps} to set it up. */
    onEndReached?: () => Promise<void>;
    /** Show user names for received messages. Useful for a group chat. Will be
     * shown only on text messages. */
    showUserNames?: boolean;
    /** Chat theme. Implement {@link Theme} to create your own theme or use
     * existing one, like the {@link defaultTheme}. */
    theme?: Theme;
    /**
     * Allows you to customize the time format. IMPORTANT: only for the time,
     * do not return date here. @see {@link ChatProps.dateFormat} to customize the date format.
     * @see {@link ChatProps.customDateHeaderText} for more customization.
     */
    timeFormat?: string;
    user: User;
}
/** Entry component, represents the complete chat */
export declare const Chat: ({ customBottomComponent, customDateHeaderText, dateFormat, disableImageGallery, emptyState, enableAnimation, flatListProps, inputProps, isAttachmentUploading, isLastPage, l10nOverride, locale, messages, onAttachmentPress, onEndReached, onMessageLongPress, onMessagePress, onPreviewDataFetched, onSendPress, renderBubble, renderCustomMessage, renderFileMessage, renderImageMessage, renderTextMessage, sendButtonVisibilityMode, showUserAvatars, showUserNames, textInputProps, theme, timeFormat, usePreviewData, user, }: ChatProps) => JSX.Element;
