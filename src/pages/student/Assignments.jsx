import React, { useState } from 'react';
import { Calendar, BookOpen, Clock, FileText, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Assignments({ assignments, setAssignments, setOverallProgress }) {
  const [selectedAssignId, setSelectedAssignId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeAssign = assignments.find(a => a.id === selectedAssignId);

  const handleStartSubmit = (assign) => {
    setSelectedAssignId(assign.id);
    setInputText('');
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API/db update delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    
    // Update assignments array
    const updated = assignments.map(a => {
      if (a.id === selectedAssignId) {
        return { ...a, status: 'Submitted', submissionText: inputText };
      }
      return a;
    });
    
    setAssignments(updated);
    if (setOverallProgress) {
      setOverallProgress(prev => Math.min(100, prev + 2)); // slightly boost progress
    }

    // Celebrate with confetti!
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSelectedAssignId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      
      {/* Select Assignment Screen */}
      {!selectedAssignId ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {assignments.map((assign) => (
            <div key={assign.id} style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              border: '1px solid #ede9f4', 
              padding: '14px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '10px', 
                  backgroundColor: 'rgba(124, 58, 237, 0.08)', 
                  color: 'var(--primary-color)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {assign.title}
                  </h3>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>
                    {assign.course}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ede9f4', paddingTop: '10px', marginTop: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                  <Clock size={12} />
                  <span>Due: {assign.dueDate}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {assign.status === 'Graded' ? (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '10px' }}>
                      Grade: {assign.grade}
                    </span>
                  ) : assign.status === 'Submitted' ? (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '3px 8px', borderRadius: '10px' }}>
                      Submitted
                    </span>
                  ) : (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '3px 8px', borderRadius: '10px' }}>
                      Pending
                    </span>
                  )}

                  <button 
                    onClick={() => handleStartSubmit(assign)}
                    className="click-press"
                    style={{ 
                      padding: '6px 12px', 
                      fontSize: '10.5px', 
                      fontWeight: 700, 
                      borderRadius: '8px', 
                      border: 'none',
                      background: assign.status === 'Graded' || assign.status === 'Submitted' ? '#f1edf5' : 'var(--primary-color)',
                      color: assign.status === 'Graded' || assign.status === 'Submitted' ? 'var(--text-secondary)' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    {assign.status === 'Graded' ? 'Review' : assign.status === 'Submitted' ? 'Edit' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Assignment Workspace Screen
        <div style={{ 
          background: '#fff', 
          borderRadius: '16px', 
          border: '1px solid #ede9f4', 
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          textAlign: 'left'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ede9f4', paddingBottom: '12px' }}>
            <div style={{ flex: 1, minWidth: 0, paddingRight: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>{activeAssign.title}</h3>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>Due: {activeAssign.dueDate}</p>
            </div>
            <button 
              onClick={() => setSelectedAssignId(null)}
              className="click-press"
              style={{ 
                padding: '6px 12px', 
                fontSize: '10.5px', 
                fontWeight: 700, 
                borderRadius: '8px', 
                border: '1px solid #ede9f4', 
                background: '#fff', 
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              Back
            </button>
          </div>

          {/* Description Section */}
          <div style={{ backgroundColor: '#faf9fc', padding: '12px', borderRadius: '10px', border: '1px solid #ede9f4' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
              <AlertCircle size={12} style={{ color: 'var(--primary-color)' }} />
              <span>Problem Description:</span>
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {activeAssign.problemDescription}
            </p>
          </div>

          {/* Submission Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Type your solution or text response:
            </label>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your solution here..."
              disabled={activeAssign.status === 'Graded'}
              rows={8}
              style={{ 
                width: '100%', 
                fontSize: '12.5px', 
                fontFamily: 'inherit',
                lineHeight: 1.5, 
                padding: '12px', 
                borderRadius: '10px', 
                border: '1px solid #ede9f4', 
                backgroundColor: activeAssign.status === 'Graded' ? '#faf9fc' : '#fff',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />

            {activeAssign.status === 'Graded' && (
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>
                <strong style={{ fontSize: '11px', color: '#10b981', display: 'block', marginBottom: '4px' }}>Instructor Feedback</strong>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  {activeAssign.aiNotes || "Your submission was reviewed. Excellent logic and correct answers."}
                </p>
              </div>
            )}

            {activeAssign.status !== 'Graded' && (
              <button 
                onClick={handleSubmit}
                className="click-press"
                style={{ 
                  padding: '10px', 
                  borderRadius: '10px', 
                  border: 'none',
                  background: 'var(--primary-color)',
                  color: '#fff',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                disabled={!inputText.trim() || isSubmitting}
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Assignment'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
