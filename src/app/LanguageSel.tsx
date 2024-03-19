import React from "react";
import { LANGUAGE_VERSIONS } from "./constants";

interface LanguageSelectorProps {
  language: string;
  selectLanguage: (lan: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  selectLanguage,
}) => {
  const languages = Object.entries(LANGUAGE_VERSIONS);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    selectLanguage(event.target.value);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="language" className="font-mono font-semibold mr-2">
        Language
      </label>
      <select
        id="language"
        value={language}
        onChange={handleChange}
        className="border border-black rounded-md px-2 py-1 focus:outline-none"
      >
        {languages.map(([lang, version]) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
