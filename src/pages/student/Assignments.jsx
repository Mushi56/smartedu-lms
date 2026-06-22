import React, { useState } from 'react';
import { Sparkles, Calendar, BookOpen, Clock, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Assignments({ assignments, setAssignments, setOverallProgress }) {
  const [selectedAssignId, setSelectedAssignId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  const activeAssign = assignments.find(a => a.id === selectedAssignId);

  const handleStartSubmit = (assign) => {
    setSelectedAssignId(assign.id);
    setInputText('');
    setAiFeedback(null);
  };

  const handleAISubmit = async () => {
    if (!inputText.trim()) return;

    setIsGrading(true);
    
    // Simulate AI Grader processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const grades = ['A (96%)', 'A- (92%)', 'B+ (88%)'];
    const selectedGrade = grades[Math.floor(Math.random() * grades.length)];
    
    setIsGrading(false);
    
    // Dynamic feedback content
    const feedback = {
      grade: selectedGrade,
      points: [
        "Correct structure and proper complexity limits.",
        "Excellent variable naming patterns and structural formatting.",
        "Improvement: Try to add edge case validation for null or empty elements."
      ],
      revisionTip: "Great work! Review your array pointer limits and practice doubly linked lists as your next progression step."
    };
    
    setAiFeedback(feedback);
    
    // Update assignments array
    const updated = assignments.map(a => {
      if (a.id === selectedAssignId) {
        return { ...a, status: 'Graded', grade: selectedGrade, aiNotes: feedback.revisionTip };
      }
      return a;
    });
    
    setAssignments(updated);
    setOverallProgress(prev => Math.min(100, prev + 3)); // slightly boost progress

    // Celebrate with confetti!
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>AI Assignments</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Solve homework problems and receive instant optimization feedback from the AI grader</p>
        </div>
      </div>

      {/* Select Assignment Screen */}
      {!selectedAssignId ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {assignments.map((assign) => (
            <div key={assign.id} className="upcoming-class-row" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, textAlign: 'left' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px' }}>{assign.title}</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Course: {assign.course} • Due: {assign.dueDate}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {assign.status === 'Graded' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span className="status-pill success">Graded</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--status-success)', marginTop: '4px' }}>Grade: {assign.grade}</span>
                  </div>
                ) : (
                  <span className="status-pill pending">Pending Submit</span>
                )}

                <button 
                  onClick={() => handleStartSubmit(assign)}
                  className="btn-primary click-press"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  {assign.status === 'Graded' ? 'Review Submission' : 'Open Workspace'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Assignment Workspace Screen
        <div className="smart-card">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{activeAssign.title}</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Due: {activeAssign.dueDate} • Target: O(1) auxiliary space complexity</p>
            </div>
            <button 
              onClick={() => setSelectedAssignId(null)}
              className="btn-secondary click-press"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              Back to Homeworks
            </button>
          </div>

          {/* Description Section */}
          <div style={{ textAlign: 'left', backgroundColor: 'var(--bg-app)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <AlertCircle size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Problem Description:</span>
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>{activeAssign.problemDescription}</p>
            
            <div style={{ padding: '10px', borderRadius: '6px', backgroundColor: 'var(--bg-card)', borderLeft: '3px solid var(--primary-color)', display: 'flex', gap: '6px', flexDirection: 'column' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={10} />
                <span>AI STUDY TUTOR TIP</span>
              </span>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{activeAssign.aiNotes}</p>
            </div>
          </div>

          {/* Workspace Submission area */}
          <div className="assignments-workspace-grid" style={{ display: 'grid', gap: '20px' }}>
            {/* Editor panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Write your answer below (Supports Python, Javascript, or Pseudocode):</label>
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="def reverse_array(arr):&#10;    # Write your code here..."
                disabled={activeAssign.status === 'Graded'}
                rows={12}
                style={{ width: '100%', fontSize: '13px', fontFamily: 'var(--mono)', lineHeight: 1.5, padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: activeAssign.status === 'Graded' ? 'var(--bg-app)' : 'var(--bg-card)' }}
              />
              {activeAssign.status !== 'Graded' && (
                <button 
                  onClick={handleAISubmit}
                  className="btn-primary click-press"
                  style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '8px' }}
                  disabled={!inputText.trim() || isGrading}
                >
                  {isGrading ? <Loader size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  <span>{isGrading ? 'AI Assessing Solution...' : 'Submit to AI Grader'}</span>
                </button>
              )}
            </div>

            {/* AI feedback panel */}
            {(aiFeedback || activeAssign.status === 'Graded') && (
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
                    <CheckCircle size={16} />
                    <span>AI Grading Report</span>
                  </h4>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--status-success)' }}>Grade: {aiFeedback?.grade || activeAssign.grade}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>ASSESSMENT RUBRICS:</span>
                  <ul style={{ paddingLeft: '18px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {(aiFeedback?.points || [
                      "Proper logic mapping and direct solution path.",
                      "Time complexity fits inside optimal scales.",
                      "Ensure to check boundary constraints for extremely large arrays."
                    ]).map((pt, index) => (
                      <li key={index}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '10px', padding: '12px', borderRadius: '6px', backgroundColor: 'var(--bg-app)', borderLeft: '3px solid var(--status-success)', display: 'flex', gap: '6px', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={10} />
                    <span>AI REVISION GUIDANCE</span>
                  </span>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {aiFeedback?.revisionTip || activeAssign.aiNotes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
