import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Globe } from 'lucide-react';

export interface LanguageToggleProps {
  onLanguageChange?: (lang: string) => void;
  className?: string;
}

export function LanguageToggle({ onLanguageChange, className }: LanguageToggleProps) {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const handleToggle = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    onLanguageChange?.(newLang);
  };

  return (
    <button
      onClick={handleToggle}
      className={clsx("flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-gray-100", className)}
    >
      <Globe size={16} />
      <span>{lang === 'en' ? 'English' : 'हिंदी'}</span>
    </button>
  );
}
