import React from 'react';

import {Theme} from 'src/utils/shared.types';

type Context = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

const initialState = {
  theme: 'light' as Theme,
  toggleTheme: () => null,
};

/**
 * This context provides a theme to the entire application. Returns the current theme
 * (default - `light`) and also provides a function to toggle the theme. The toggleTheme function
 * is used to toggle the theme between `light` and `dark` or any other theme provided. All theme
 * are defined in the `src/themes/index.ts` file.
 */

const ThemeContext = React.createContext<Context>(initialState);

const ThemeContextProvider: React.FC = (props: {
  children?: React.ReactNode;
}) => {
  const [theme, setTheme] = React.useState<Theme>('light');

  const toggleTheme = (appTheme: Theme) => {
    setTheme(appTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  );
};

function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
}

export {ThemeContextProvider, useThemeContext};
