import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface NotesReviewPanelProps {
  notes: string;
}

export const NotesReviewPanel: React.FC<NotesReviewPanelProps> = ({ notes }) => {
  const { t } = useLanguage();
  if (!notes || !notes.trim()) return null;

  return (
    <div className="hf-card" style={{ marginTop: '16px' }}>
      <div className="hf-card-header" style={{ marginBottom: '8px' }}>
        <div className="title-group">
          <h3>{t('notes_title')}</h3>
          <span className="desc">
            {t('notes_desc')}
          </span>
        </div>
      </div>
      <div className="hf-card-subtle">
        <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--white-a80)' }}>
          {notes}
        </p>
      </div>
    </div>
  );
};
