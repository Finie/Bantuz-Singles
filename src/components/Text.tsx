import React from 'react';
import {StyleProp, Text as ReactNativeText, TextStyle} from 'react-native';
import {useThemeContext} from 'src/context/ThemeContext';
import {themeStyles} from 'src/theme';

/**
 * This component overrides the default Text component from react-native.
 * It renders a text component with the correct styles. It accepts a type prop
 * to determine which styles to apply. You can also pass in your own styles.
 * */

type Props = {
  style?: StyleProp<TextStyle>;
  type?: 'heading' | 'normal' | 'subheading' | 'caption';
  children?: React.ReactNode;
};

const Text: React.FC<Props> = props => {
  const {theme} = useThemeContext();
  const {type = 'normal', style, ...rest} = props;
  const {text} = themeStyles(theme);

  const textStyles = () => {
    switch (type) {
      case 'heading':
        return text.heading;
      case 'subheading':
        return text.subheading;
      case 'caption':
        return text.caption;
      default:
        return text.body;
    }
  };

  return (
    <ReactNativeText {...rest} style={[textStyles(), style]}>
      {props.children}
    </ReactNativeText>
  );
};

export default Text;
