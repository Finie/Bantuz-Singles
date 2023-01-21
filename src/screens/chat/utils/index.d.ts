import * as React from 'react';
import { ColorValue } from 'react-native';
import { MessageType, PreviewImage, Theme, User } from '../types';
export declare const L10nContext: React.Context<{
    attachmentButtonAccessibilityLabel: string;
    emptyChatPlaceholder: string;
    fileButtonAccessibilityLabel: string;
    inputPlaceholder: string;
    sendButtonAccessibilityLabel: string;
} | {
    attachmentButtonAccessibilityLabel: string;
    emptyChatPlaceholder: string;
    fileButtonAccessibilityLabel: string;
    inputPlaceholder: string;
    sendButtonAccessibilityLabel: string;
} | {
    attachmentButtonAccessibilityLabel: string;
    emptyChatPlaceholder: string;
    fileButtonAccessibilityLabel: string;
    inputPlaceholder: string;
    sendButtonAccessibilityLabel: string;
} | {
    attachmentButtonAccessibilityLabel: string;
    emptyChatPlaceholder: string;
    fileButtonAccessibilityLabel: string;
    inputPlaceholder: string;
    sendButtonAccessibilityLabel: string;
} | {
    attachmentButtonAccessibilityLabel: string;
    emptyChatPlaceholder: string;
    fileButtonAccessibilityLabel: string;
    inputPlaceholder: string;
    sendButtonAccessibilityLabel: string;
} | {
    attachmentButtonAccessibilityLabel: string;
    emptyChatPlaceholder: string;
    fileButtonAccessibilityLabel: string;
    inputPlaceholder: string;
    sendButtonAccessibilityLabel: string;
} | {
    attachmentButtonAccessibilityLabel: string;
    emptyChatPlaceholder: string;
    fileButtonAccessibilityLabel: string;
    inputPlaceholder: string;
    sendButtonAccessibilityLabel: string;
} | {
    attachmentButtonAccessibilityLabel: string;
    emptyChatPlaceholder: string;
    fileButtonAccessibilityLabel: string;
    inputPlaceholder: string;
    sendButtonAccessibilityLabel: string;
}>;
export declare const ThemeContext: React.Context<Theme>;
export declare const UserContext: React.Context<User | undefined>;
/** Returns text representation of a provided bytes value (e.g. 1kB, 1GB) */
export declare const formatBytes: (size: number, fractionDigits?: number) => string;
/** Returns size in bytes of the provided text */
export declare const getTextSizeInBytes: (text: string) => number;
/** Returns user avatar and name color based on the ID */
export declare const getUserAvatarNameColor: (user: User, colors: ColorValue[]) => ColorValue;
/** Returns user initials (can have only first letter of firstName/lastName or both) */
export declare const getUserInitials: ({ firstName, lastName }: User) => string;
/** Returns user name as joined firstName and lastName */
export declare const getUserName: ({ firstName, lastName }: User) => string;
/** Returns hash code of the provided text */
export declare const hashCode: (text?: string) => number;
/** Inits dayjs locale */
export declare const initLocale: (locale?: "en" | "es" | "ko" | "pl" | "pt" | "ru" | "tr" | "uk" | undefined) => void;
/** Returns either prop or empty object if null or undefined */
export declare const unwrap: <T>(prop: T) => {};
/** Parses provided messages to chat messages (with headers) and returns them with a gallery */
export declare const calculateChatMessages: (messages: MessageType.Any[], user: User, { customDateHeaderText, dateFormat, showUserNames, timeFormat, }: {
    customDateHeaderText?: ((dateTime: number) => string) | undefined;
    dateFormat?: string | undefined;
    showUserNames: boolean;
    timeFormat?: string | undefined;
}) => {
    chatMessages: MessageType.DerivedAny[];
    gallery: PreviewImage[];
};
/** Removes all derived message props from the derived message */
export declare const excludeDerivedMessageProps: (message: MessageType.DerivedMessage) => MessageType.Any;
