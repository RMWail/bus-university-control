import React from 'react';
import { useLanguage } from '../../../../context/LanguageContext';
import { translations } from '../../../../translations/translations';
import './LanguageSettings.scss';
import { MdLanguage } from 'react-icons/md';
import swal from 'sweetalert2';

const LanguageSettings = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    sessionStorage.setItem('language', lang);
  };

  return (
    <div className="language-settings">
      <div className="language-settings-header">
        <MdLanguage className="header-icon" />
        <h2>{t.admin.sidebar.language}</h2>
      </div>
      
      <div className="language-options">
        <div 
          className={`language-option ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          <span className="language-name">{t.admin.language.en}</span>
          {currentLanguage === 'en' && <span className="active-indicator">✓</span>}
        </div>
        
        <div 
          className={`language-option ${currentLanguage === 'fr' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('fr')}
        >
          <span className="language-name">{t.admin.language.fr}</span>
          {currentLanguage === 'fr' && <span className="active-indicator">✓</span>}
        </div>
        
        <div 
          className={`language-option ${currentLanguage === 'ar' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('ar')}
        >
          <span className="language-name">{t.admin.language.ar}</span>
          {currentLanguage === 'ar' && <span className="active-indicator">✓</span>}
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
