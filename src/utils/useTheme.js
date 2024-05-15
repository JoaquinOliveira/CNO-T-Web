// useTheme.js
import { useEffect, useState } from 'react';

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const saveThemeToLocalStorage = (isDarkMode) => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  const handleThemeChange = (checked) => {
    setIsDarkMode(checked);
    saveThemeToLocalStorage(checked);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return { isDarkMode, handleThemeChange };
};

export default useTheme;