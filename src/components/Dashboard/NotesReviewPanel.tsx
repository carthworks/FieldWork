import React from 'react';

interface NotesReviewPanelProps {
  notes: string;
}

export const NotesReviewPanel: React.FC<NotesReviewPanelProps> = ({ notes }) => {
  if (!notes || !notes.trim()) return null;

  return (
    <div className="hf-card" style={{ marginTop: '16px' }}>
      <div className="hf-card-header" style={{ marginBottom: '8px' }}>
        <div className="title-group">
          <h3>Your Additional Context</h3>
          <span className="desc">
            Signals that weren&apos;t captured by the sliders.
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
