import { TouchableOpacityProps } from 'react-native';
export interface AttachmentButtonAdditionalProps {
    touchableOpacityProps?: TouchableOpacityProps;
}
export interface AttachmentButtonProps extends AttachmentButtonAdditionalProps {
    /** Callback for attachment button tap event */
    onPress?: () => void;
}
export declare const AttachmentButton: ({ onPress, touchableOpacityProps, }: AttachmentButtonProps) => JSX.Element;
