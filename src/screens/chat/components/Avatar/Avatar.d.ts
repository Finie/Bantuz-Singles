import * as React from 'react';
import { MessageType, Theme } from '../../types';
export declare const Avatar: React.MemoExoticComponent<({ author, currentUserIsAuthor, showAvatar, showUserAvatars, theme, }: {
    author: MessageType.Any['author'];
    currentUserIsAuthor: boolean;
    showAvatar: boolean;
    showUserAvatars?: boolean | undefined;
    theme: Theme;
}) => JSX.Element | null>;
