/**
 * Default style file
 * this file enatails the global colors and spacing font sizes used
 * all across the application
 *
 */

import {ThemeStyles} from './themes.type';
import {Theme} from 'src/utils/shared.types';
import {textVariants} from './typography';

const lightTheme: ThemeStyles = {
  colors: {
    primary: '#A04D31',
    secondary: '#F85706',
    accent: '#E4D1B8',
    black: '#212121',
    silver: '#8492A6',
    snow: '#F5F5F7',
    white: '#FFFFFF',
    danger: '#FF4949',
    warning: '#FFC82C',
    background: '#E5E5E5',
    loaderBackground: 'rgba(255, 255, 255,0.8)',
  },
  spacing: {
    horizontal: 30,
    vertical: 20,
  },
};

/**
 * TODO addition of dark theme for the app */

function themeStyles(theme: Theme) {
  const {colors, spacing} = theme === 'light' ? lightTheme : lightTheme; //else darktheme for now light

  return {
    colors,
    spacing,
    text: textVariants(colors),
  };
}

export {themeStyles};
