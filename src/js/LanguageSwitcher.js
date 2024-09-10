import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from './i18n'; 

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    changeLanguage(language);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('es')}>Español</button>
    </div>
  );
}

export default LanguageSwitcher;