import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle, Clock, AlertCircle, Plus, ChevronRight, X, ArrowLeft, RefreshCw, Eye } from 'lucide-react';

export default function Tasks({ db, setDb }) {
  const { flashcards = [] } = db;
  const [activeSubTab, setActiveSubTab] = useState('flashcards'); // 'assignments', 'flashcards'
  
  // Assignment Lists State
  const [assignments, setAssignments] = useState([
    { id: 'asg-1', title: 'Calculus Derivatives Sheet', course: 'SAT Math Mastery', dueDate: 'Today, 11:59 PM', status: 'Pending' },
    { id: 'asg-2', title: 'Part 2 Speaking Cue Card Record', course: 'IELTS Speaking Band 8.0', dueDate: 'Yesterday', status: 'Graded', score: '9/10' },
    { id: 'asg-3', title: 'Data Types Coding Exercise', course: 'Python for Beginners', dueDate: 'Tomorrow, 5:00 PM', status: 'Pending' }
  ]);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  // Upload Assignment Sheets Simulator
  const [uploadingAsg, setUploadingAsg] = useState(null);
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFlipCard = () => {
    setIsFlipped(prev => !prev);
  };

  const handleCardOutcome = (known) => {
    setIsFlipped(false);
    if (known) setKnownCount(k => k + 1);
    
    // Slide to next card
    setTimeout(() => {
      if (cardIndex < flashcards.length - 1) {
        setCardIndex(prev => prev + 1);
      } else {
        setCardIndex(flashcards.length); // Completed Deck
      }
    }, 150);
  };

  const handleResetFlashcards = () => {
    setCardIndex(0);
    setKnownCount(0);
    setIsFlipped(false);
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !fileName) return;

    setAssignments(prev => prev.map(a => a.id === uploadingAsg.id ? { ...a, status: 'Submitted' } : a));
    setUploadingAsg(null);
    setInputText('');
    setFileName('');
    alert("Assignment submitted successfully!");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }} className="animate-fade-in">
      
      {/* Sub Tabs Toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg-input)', borderRadius: '24px', padding: '4px' }}>
        <button
          onClick={() => setActiveSubTab('flashcards')}
          style={{
            padding: '8px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeSubTab === 'flashcards' ? 'var(--secondary-color)' : 'transparent',
            color: activeSubTab === 'flashcards' ? 'var(--primary-color)' : 'var(--text-secondary)'
          }}
        >
          Flashcards Deck
        </button>
        <button
          onClick={() => setActiveSubTab('assignments')}
          style={{
            padding: '8px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeSubTab === 'assignments' ? 'var(--secondary-color)' : 'transparent',
            color: activeSubTab === 'assignments' ? 'var(--primary-color)' : 'var(--text-secondary)'
          }}
        >
          Homework Tasks
        </button>
      </div>

      {/* ---------------- SUB TAB 1: INTERACTIVE FLASHCARDS ---------------- */}
      {activeSubTab === 'flashcards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - 210px)', justifyContent: 'center' }}>
          {cardIndex < flashcards.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Deck progress indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>
                <span>FLASHCARD {cardIndex + 1} OF {flashcards.length}</span>
                <span>Score: {knownCount} known</span>
              </div>

              {/* Flipping card panel */}
              <div onClick={handleFlipCard} style={{ perspective: '1000px', cursor: 'pointer' }}>
                <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front card */}
                  <div className="flashcard-front">
                    <span style={{ fontSize: '10px', background: 'var(--bg-input)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '10px', fontWeight: 700, marginBottom: '16px' }}>
                      {flashcards[cardIndex].category}
                    </span>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>{flashcards[cardIndex].term}</h3>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '24px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={12} /> Tap to flip card
                    </span>
                  </div>

                  {/* Back card */}
                  <div className="flashcard-back">
                    <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', color: 'var(--secondary-color)', padding: '4px 10px', borderRadius: '10px', fontWeight: 700, marginBottom: '16px' }}>
                      {flashcards[cardIndex].category} Definition
                    </span>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, padding: '0 10px', color: '#fff' }}>
                      {flashcards[cardIndex].definition}
                    </p>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '20px' }}>
                      Tap again to show term
                    </span>
                  </div>
                </div>
              </div>

              {/* Swipe controllers */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => handleCardOutcome(false)}
                  className="mobile-btn-secondary click-press"
                  style={{ flex: 1, borderColor: 'var(--accent-red)', color: 'var(--accent-red)', padding: '12px 10px', borderRadius: '24px' }}
                >
                  Study Again ❌
                </button>
                
                <button
                  onClick={() => handleCardOutcome(true)}
                  className="mobile-btn-primary click-press"
                  style={{ flex: 1, backgroundColor: 'var(--accent-green)', color: '#fff', padding: '12px 10px', borderRadius: '24px' }}
                >
                  I Know It!  ✔️
                </button>
              </div>
            </div>
          ) : (
            // Deck Completed View
            <div className="mobile-card animate-slide-up" style={{ padding: '24px', textAlign: 'center', gap: '16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(202, 186, 97, 0.15)', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto' }}>
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Deck Completed!</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                  You reviewed all cards and mastered <strong>{knownCount} / {flashcards.length}</strong> terms.
                </p>
              </div>
              <button
                onClick={handleResetFlashcards}
                className="mobile-btn-primary click-press"
                style={{ width: '100%', borderRadius: '20px' }}
              >
                <RefreshCw size={14} /> Restart Review
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------- SUB TAB 2: HOMEWORK TASKS LIST ---------------- */}
      {activeSubTab === 'assignments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-slide-up">
          
          {/* List display */}
          {!uploadingAsg ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              {assignments.map((asg) => {
                const isPending = asg.status === 'Pending';
                const isSubmitted = asg.status === 'Submitted';
                const isGraded = asg.status === 'Graded';

                return (
                  <div key={asg.id} className="mobile-card" style={{ padding: '14px', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{asg.title}</h4>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>{asg.course}</span>
                      </div>
                      
                      {isPending && <span className="mobile-pill" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--status-pending)' }}>Pending</span>}
                      {isSubmitted && <span className="mobile-pill" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>Submitted</span>}
                      {isGraded && <span className="mobile-pill" style={{ background: 'rgba(43,168,74,0.12)', color: 'var(--accent-green)' }}>Graded: {asg.score}</span>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '4px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> Due: {asg.dueDate}
                      </span>

                      {isPending && (
                        <button
                          onClick={() => setUploadingAsg(asg)}
                          className="mobile-btn-primary click-press"
                          style={{ padding: '6px 14px', fontSize: '11.5px', borderRadius: '14px' }}
                        >
                          Submit Task
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Uploading assignment sheet form view
            <div className="mobile-card animate-slide-up" style={{ padding: '20px', gap: '16px', textAlign: 'left' }}>
              <button
                onClick={() => setUploadingAsg(null)}
                style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                <ArrowLeft size={14} /> Back to Homework
              </button>

              <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--text-primary)' }}>Submit: {uploadingAsg.title}</h4>

              <form onSubmit={handleSubmitAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="mobile-input-group">
                  <label>Type Answers / Notes</label>
                  <textarea
                    rows={4}
                    className="mobile-input"
                    placeholder="Write your solutions here..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    style={{ resize: 'none', height: '100px' }}
                  />
                </div>

                <div className="mobile-input-group">
                  <label>Attach Solution File</label>
                  <div style={{
                    border: '1.5px dashed var(--border-color)',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'var(--bg-app)',
                    position: 'relative'
                  }}>
                    <input
                      type="file"
                      style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                      onChange={e => setFileName(e.target.files[0]?.name || '')}
                    />
                    <FileText size={20} style={{ color: 'var(--text-muted)', margin: '0 auto 6px auto', display: 'block' }} />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {fileName ? fileName : 'Upload PDF or JPG file'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mobile-btn-primary click-press"
                  style={{ width: '100%', marginTop: '4px' }}
                >
                  Upload Solution
                </button>
              </form>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
