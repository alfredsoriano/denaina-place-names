import { createContext, ReactNode, useEffect, useState } from 'react';

const ThemeContext = createContext({
    darkTheme: true,
    toggleTheme: () => {}
});

const ThemeProvider = ({ children }: {children: ReactNode}) => {
  const [darkTheme, setDarkTheme] = useState(() => {
    const storedDarkTheme = localStorage.getItem('darkTheme');
    return storedDarkTheme ? storedDarkTheme === "true" : true;
  });

  function toggleTheme() {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    localStorage.setItem('darkTheme', darkTheme ? 'true' : 'false')
  }, [darkTheme])

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
