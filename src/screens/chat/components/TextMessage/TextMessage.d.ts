import { PreviewData } from '@flyerhq/react-native-link-preview';
import { MessageType } from '../../types';
export interface TextMessageTopLevelProps {
    /** @see {@link LinkPreviewProps.onPreviewDataFetched} */
    onPreviewDataFetched?: ({ message, previewData, }: {
        message: MessageType.Text;
        previewData: PreviewData;
    }) => void;
    /** Enables link (URL) preview */
    usePreviewData?: boolean;
}
export interface TextMessageProps extends TextMessageTopLevelProps {
    enableAnimation?: boolean;
    message: MessageType.DerivedText;
    messageWidth: number;
    showName: boolean;
}
export declare const TextMessage: ({ enableAnimation, message, messageWidth, onPreviewDataFetched, showName, usePreviewData, }: TextMessageProps) => JSX.Element;
