import { TextInputProps } from 'react-native';
import { MessageType } from '../../types';
import { AttachmentButtonAdditionalProps } from '../AttachmentButton';
import { CircularActivityIndicatorProps } from '../CircularActivityIndicator';
export interface InputTopLevelProps {
    /** Whether attachment is uploading. Will replace attachment button with a
     * {@link CircularActivityIndicator}. Since we don't have libraries for
     * managing media in dependencies we have no way of knowing if
     * something is uploading so you need to set this manually. */
    isAttachmentUploading?: boolean;
    /** @see {@link AttachmentButtonProps.onPress} */
    onAttachmentPress?: () => void;
    /** Will be called on {@link SendButton} tap. Has {@link MessageType.PartialText} which can
     * be transformed to {@link MessageType.Text} and added to the messages list. */
    onSendPress: (message: MessageType.PartialText) => void;
    /** Controls the visibility behavior of the {@link SendButton} based on the
     * `TextInput` state. Defaults to `editing`. */
    sendButtonVisibilityMode?: 'always' | 'editing';
    textInputProps?: TextInputProps;
}
export interface InputAdditionalProps {
    attachmentButtonProps?: AttachmentButtonAdditionalProps;
    attachmentCircularActivityIndicatorProps?: CircularActivityIndicatorProps;
}
export declare type InputProps = InputTopLevelProps & InputAdditionalProps;
/** Bottom bar input component with a text input, attachment and
 * send buttons inside. By default hides send button when text input is empty. */
export declare const Input: ({ attachmentButtonProps, attachmentCircularActivityIndicatorProps, isAttachmentUploading, onAttachmentPress, onSendPress, sendButtonVisibilityMode, textInputProps, }: InputProps) => JSX.Element;
