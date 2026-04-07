import type { PropsWithChildren } from "react";
import { createContext, use, useCallback, useState } from "react";
import type { Theme } from "@/server/functions/theme";
import { setTheme as setThemeServerFn } from "@/server/functions/theme";

interface ThemeContext {
  theme: Theme;
  setTheme: (val: Theme) => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

const ThemeProvider = ({
  children,
  theme: initialTheme,
}: PropsWithChildren<{ theme: Theme }>) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = useCallback((val: Theme) => {
    // Update DOM immediately for instant visual feedback
    document.documentElement.className = val;

    setThemeState(val);

    // Persist to server in background (non-blocking)
    setThemeServerFn({ data: val });
  }, []);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export const useTheme = () => {
  const val = use(ThemeContext);
  if (!val) throw new Error("`useTheme` called outside of `<ThemeProvider />`");

  return val;
};

export default ThemeProvider;
