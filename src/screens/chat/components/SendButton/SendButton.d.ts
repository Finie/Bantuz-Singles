import { TouchableOpacityProps } from 'react-native';
export interface SendButtonPropsAdditionalProps {
    touchableOpacityProps?: TouchableOpacityProps;
}
export interface SendButtonProps extends SendButtonPropsAdditionalProps {
    /** Callback for send button tap event */
    onPress: () => void;
}
export declare const SendButton: ({ onPress, touchableOpacityProps, }: SendButtonProps) => JSX.Element;
