import * as React from 'react';
import { MessageType, Theme } from '../../types';
export declare const StatusIcon: React.MemoExoticComponent<({ currentUserIsAuthor, showStatus, status, theme, }: {
    currentUserIsAuthor: boolean;
    showStatus: boolean;
    status?: MessageType.Any['status'];
    theme: Theme;
}) => JSX.Element | null>;
