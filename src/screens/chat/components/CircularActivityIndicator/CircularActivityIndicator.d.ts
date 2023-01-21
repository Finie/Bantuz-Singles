import { ColorValue, StyleProp, ViewStyle } from 'react-native';
export interface CircularActivityIndicatorProps {
    color: ColorValue;
    size?: number;
    style?: StyleProp<ViewStyle>;
}
export declare const CircularActivityIndicator: ({ color, size, style, }: CircularActivityIndicatorProps) => JSX.Element;
