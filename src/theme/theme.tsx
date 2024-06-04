import { currentTheme as currentVizTheme, refreshTheme } from "devextreme/viz/themes";
import { current as getCurrentDXTheme } from "devextreme/ui/themes";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const themes = ["light", "dark"] as const;
const storageKey = "app-theme";
const themePrefix = "app-theme-";

const prefixes = ["./styles/theme-dx-", "./styles/variables-"];

const loadStylesImports = async () => {
  await Promise.all([
    ...prefixes.flatMap((prefix) => [
      import(/* webpackChunkName: "app-theme-dark" */ `${prefix}dark.scss`),
      import(/* webpackChunkName: "app-theme-light" */ `${prefix}light.scss`),
    ]),
  ]);
};

export type Theme = (typeof themes)[number];

function getNextTheme(theme?: Theme) {
  const nextTheme = themes[themes.indexOf(theme as Theme) + 1] || themes[0];
  console.log(nextTheme);
  return nextTheme;
}

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || getNextTheme();
}

function isThemeStyleSheet(styleSheet: any, theme: Theme) {
  const themeMarker = `${themePrefix}${theme}`;
  // eslint-disable-next-line no-undef
  if (process.env.REACT_APP_ENV === "production") {
    return styleSheet?.href?.includes(`${themeMarker}`);
  } else {
    const rules = Array.from<CSSStyleRule>(styleSheet.cssRules);
    return !![rules[0], rules.at(-1)].find((rule) => rule?.selectorText?.includes(`.${themeMarker}`));
  }
}

function switchThemeStyleSheets(enabledTheme: Theme) {
  const disabledTheme = getNextTheme(enabledTheme);

  Array.from<CSSStyleSheet>(document.styleSheets).forEach((styleSheet) => {
    styleSheet.disabled = isThemeStyleSheet(styleSheet, disabledTheme);
  });
}

async function setAppTheme(newTheme?: Theme, isFluent?: boolean) {
  const themeName = newTheme || getCurrentTheme();

  switchThemeStyleSheets(themeName);

  const regTheme = isFluent ? /\.[a-z]+$/ : /\.[a-z]+\.compact$/;
  const replaceTheme = isFluent ? `.${themeName}` : `.${themeName}.compact`;
  currentVizTheme(currentVizTheme().replace(regTheme, replaceTheme));
  refreshTheme();
}

function toggleTeme(currentTheme: Theme): Theme {
  const newTheme = getNextTheme(currentTheme);
  window.localStorage[storageKey] = newTheme;

  return newTheme;
}

export function useThemeContext() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadStylesImports().then(() => {
      setIsLoaded(true);
    });
  }, []);

  // This switches the theme
  const switchTheme = useCallback(() => setTheme((currentTheme: Theme) => toggleTeme(currentTheme)), []);

  const isFluent = useCallback((): boolean => {
    return getCurrentDXTheme().includes("fluent");
  }, []);

  useEffect(() => {
    isLoaded && setAppTheme(theme, isFluent());
  }, [theme, isLoaded, isFluent]);

  return useMemo(() => ({ theme, switchTheme, isLoaded, isFluent }), [theme, isLoaded, isFluent, switchTheme]);
}

export const ThemeContext = React.createContext<ReturnType<typeof useThemeContext> | null>(null);
