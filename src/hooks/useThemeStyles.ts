import {useThemeContext} from 'src/context/ThemeContext';
import {themeStyles} from 'src/theme';

function useThemeStyles() {
  const {theme} = useThemeContext();
  const styles = themeStyles(theme);
  return styles;
}

export default useThemeStyles;
