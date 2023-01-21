import * as React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { formatBytes, ThemeContext, UserContext } from '../../utils';
import styles from './styles';
/** Image message component. Supports different
 * aspect ratios, renders blurred image as a background which is visible
 * if the image is narrow, renders image in form of a file if aspect
 * ratio is very small or very big. */
export const ImageMessage = ({ message, messageWidth }) => {
    var _a, _b;
    const theme = React.useContext(ThemeContext);
    const user = React.useContext(UserContext);
    const defaultHeight = (_a = message.height) !== null && _a !== void 0 ? _a : 0;
    const defaultWidth = (_b = message.width) !== null && _b !== void 0 ? _b : 0;
    const [size, setSize] = React.useState({
        height: defaultHeight,
        width: defaultWidth,
    });
    const aspectRatio = size.width / (size.height || 1);
    const isMinimized = aspectRatio < 0.1 || aspectRatio > 10;
    const { horizontalImage, minimizedImage, minimizedImageContainer, nameText, sizeText, textContainer, verticalImage, } = styles({
        aspectRatio,
        message,
        messageWidth,
        theme,
        user,
    });
    React.useEffect(() => {
        if (defaultHeight <= 0 || defaultWidth <= 0)
            Image.getSize(message.uri, (width, height) => setSize({ height, width }), () => setSize({ height: 0, width: 0 }));
    }, [defaultHeight, defaultWidth, message.uri]);
    const renderImage = () => {
        return (React.createElement(Image, { accessibilityRole: 'image', resizeMode: isMinimized ? 'cover' : 'contain', source: { uri: message.uri }, style: isMinimized
                ? minimizedImage
                : aspectRatio < 1
                    ? verticalImage
                    : horizontalImage }));
    };
    return isMinimized ? (React.createElement(View, { style: minimizedImageContainer },
        renderImage(),
        React.createElement(View, { style: textContainer },
            React.createElement(Text, { style: nameText }, message.name),
            React.createElement(Text, { style: sizeText }, formatBytes(message.size))))) : (React.createElement(ImageBackground, { blurRadius: 26, source: { uri: message.uri }, style: {} }, renderImage()));
};
//# sourceMappingURL=ImageMessage.js.map