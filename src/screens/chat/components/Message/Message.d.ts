import * as React from 'react';
import { MessageType } from '../../types';
import { TextMessageTopLevelProps } from '../TextMessage';
export interface MessageTopLevelProps extends TextMessageTopLevelProps {
    /** Called when user makes a long press on any message */
    onMessageLongPress?: (message: MessageType.Any) => void;
    /** Called when user taps on any message */
    onMessagePress?: (message: MessageType.Any) => void;
    /** Customize the default bubble using this function. `child` is a content
     * you should render inside your bubble, `message` is a current message
     * (contains `author` inside) and `nextMessageInGroup` allows you to see
     * if the message is a part of a group (messages are grouped when written
     * in quick succession by the same author) */
    renderBubble?: (payload: {
        child: React.ReactNode;
        message: MessageType.Any;
        nextMessageInGroup: boolean;
    }) => React.ReactNode;
    /** Render a custom message inside predefined bubble */
    renderCustomMessage?: (message: MessageType.Custom, messageWidth: number) => React.ReactNode;
    /** Render a file message inside predefined bubble */
    renderFileMessage?: (message: MessageType.File, messageWidth: number) => React.ReactNode;
    /** Render an image message inside predefined bubble */
    renderImageMessage?: (message: MessageType.Image, messageWidth: number) => React.ReactNode;
    /** Render a text message inside predefined bubble */
    renderTextMessage?: (message: MessageType.Text, messageWidth: number, showName: boolean) => React.ReactNode;
    /** Show user avatars for received messages. Useful for a group chat. */
    showUserAvatars?: boolean;
}
export interface MessageProps extends MessageTopLevelProps {
    enableAnimation?: boolean;
    message: MessageType.DerivedAny;
    messageWidth: number;
    roundBorder: boolean;
    showAvatar: boolean;
    showName: boolean;
    showStatus: boolean;
}
/** Base component for all message types in the chat. Renders bubbles around
 * messages and status. Sets maximum width for a message for
 * a nice look on larger screens. */
export declare const Message: React.MemoExoticComponent<({ enableAnimation, message, messageWidth, onMessagePress, onMessageLongPress, onPreviewDataFetched, renderBubble, renderCustomMessage, renderFileMessage, renderImageMessage, renderTextMessage, roundBorder, showAvatar, showName, showStatus, showUserAvatars, usePreviewData, }: MessageProps) => JSX.Element>;
