'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SupportedLanguage } from '@/lib/i18n/types';

interface LanguageSelectorProps {
  variant?: 'header' | 'footer' | 'drawer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { language, setLanguage, supportedLanguages, currentLanguageMeta, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'drawer') {
    return (
      <div className="language-selector-drawer" style={{ width: '100%' }}>
        <div
          style={{
            fontSize: '11.5px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--white-a50)',
            marginBottom: '8px',
            padding: '0 4px',
          }}
        >
          {t('nav_select_lang')}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '6px',
          }}
        >
          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                className={`btn ${isSelected ? 'primary' : 'secondary'}`}
                onClick={() => handleSelect(lang.code)}
                style={{
                  padding: '8px 10px',
                  fontSize: '12px',
                  justifyContent: 'flex-start',
                  gap: '6px',
                  border: isSelected ? '1px solid var(--lime-100)' : '1px solid var(--white-a10)',
                }}
              >
                <span>{lang.flag}</span>
                <span style={{ fontWeight: isSelected ? 600 : 400 }}>
                  {lang.nativeName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`language-selector-container ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        className="btn secondary language-trigger-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('nav_select_lang')}
        style={{
          padding: variant === 'footer' ? '4px 10px' : '6px 11px',
          fontSize: variant === 'footer' ? '12px' : '12.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--r-md)',
          color: 'var(--white-a90)',
          cursor: 'pointer',
        }}
        title={`Change Language (${currentLanguageMeta.name})`}
      >
        <span style={{ fontSize: '13px' }}>🌐</span>
        <span style={{ fontWeight: 500 }}>{currentLanguageMeta.nativeName}</span>
        <span style={{ fontSize: '9px', opacity: 0.6, marginLeft: '2px' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t('nav_select_lang')}
          style={{
            position: 'absolute',
            ...(variant === 'footer' ? { bottom: '100%', marginBottom: '8px' } : { top: '100%', marginTop: '6px' }),
            right: 0,
            zIndex: 1050,
            minWidth: '180px',
            background: '#14171a',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--r-md)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.65)',
            padding: '6px',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              padding: '4px 8px 6px',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--white-a40)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '4px',
            }}
          >
            {t('nav_select_lang')}
          </div>

          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => handleSelect(lang.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '7px 10px',
                  fontSize: '12.5px',
                  background: isSelected ? 'rgba(209, 254, 23, 0.12)' : 'transparent',
                  color: isSelected ? 'var(--lime-100)' : 'var(--white-a85)',
                  border: 'none',
                  borderRadius: 'var(--r-sm)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)');
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) (e.currentTarget.style.background = 'transparent');
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{lang.flag}</span>
                  <div>
                    <div style={{ fontWeight: isSelected ? 600 : 500, lineHeight: 1.2 }}>
                      {lang.nativeName}
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--white-a40)', marginTop: '1px' }}>
                      {lang.name}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <span style={{ color: 'var(--lime-100)', fontWeight: 'bold', fontSize: '13px' }}>
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
