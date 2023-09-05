import React, {createContext, ReactNode, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';

interface ProviderInterface {
  children: ReactNode;
}
interface ContextValueInterface {
  theme: string | null | undefined;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ContextValueInterface | null>(null);

// Create the provider component
export const ThemeProvider: React.FC<ProviderInterface> = ({
  children,
}: ProviderInterface) => {
  // Define the state or data that you want to share
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme);

  // Define any functions or methods that modify the shared state
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    setTheme(scheme);
  }, [scheme]);

  // Provide the state and methods to the child components
  const contextValue: ContextValueInterface = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
