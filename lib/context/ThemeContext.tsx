import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Appearance } from "react-native";

type ThemeType = "light" | "dark";

const ThemeContext = createContext<ThemeType>("light");

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = Appearance.getColorScheme() || "light";
  const [theme, setTheme] = useState<ThemeType>(systemTheme);

  // AUTOMATICALLY CHANGING THEME IF SYSTEM THEME CHANGES
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setTheme(colorScheme);
      }
    });

    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
