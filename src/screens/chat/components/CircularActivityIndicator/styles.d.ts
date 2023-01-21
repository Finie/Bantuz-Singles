import { ColorValue } from 'react-native';
declare const styles: ({ color, size }: {
    color: ColorValue;
    size: number;
}) => {
    circle: {
        backgroundColor: string;
        borderBottomColor: string;
        borderLeftColor: ColorValue;
        borderRadius: number;
        borderRightColor: ColorValue;
        borderTopColor: ColorValue;
        borderWidth: number;
        height: number;
        width: number;
    };
};
export default styles;
