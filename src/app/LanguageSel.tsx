import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "./constants";

interface LanguageSelector {
  language: string;
  selectLanguage: (lan: string) => void;
}

export default function LanguageSelector({
  language,
  selectLanguage,
}: LanguageSelector) {
  const languages = Object.entries(LANGUAGE_VERSIONS);

  const handleChange = (event: any) => {
    selectLanguage(event.target.value);
  };

  return (
    <>
      <label className="font-semibold">Language</label>
      <select
        value={language}
        onChange={handleChange}
        className="border mx-5 border-black rounded-md px-2 py-1"
      >
        {languages.map(([language, version]) => (
          <option
            key={language}
            onClick={() => selectLanguage(language)}
            value={language}
          >
            {language}
          </option>
        ))}
      </select>
    </>
  );
}

// https://www.youtube.com/watch?v=THgBePRV13o
// complete it
