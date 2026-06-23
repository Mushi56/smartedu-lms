import React, { useState } from 'react';
import { HelpCircle, Sparkles, Plus, Trash2, CheckCircle, BarChart, FileText, Loader, X, Check, Clock, Users, Award, ChevronRight, Edit3 } from 'lucide-react';

const cardStyle = {
  background: '#fff', borderRadius: '16px',
  border: '1px solid #ede9f4', padding: '16px',
  display: 'flex', flexDirection: 'column', gap: '12px'
};

const inputStyle = {
  width: '100%', padding: '10px 12px', fontSize: '13px',
  border: '1px solid #ede9f4', borderRadius: '10px',
  background: '#faf9fc', color: 'var(--text-primary)',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
};

const labelStyle = {
  fontSize: '10px', fontWeight: 700,
  color: 'var(--text-secondary)', display: 'block', marginBottom: '5px'
};

export default function QuizManager({ quizzes, setQuizzes }) {
  const [showForm, setShowForm] = useState(false);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [promptText, setPromptText] = useState('');
  const [numQuestions, setNumQuestions] = useState('5');
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [expandedQuiz, setExpandedQuiz] = useState(null);

  const handleAIQuizGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const newQuizObj = {
      topic: topic,
      difficulty,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      attempts: 0,
      avgScore: 0,
      questions: [
        {
          question: `What is the base case in a recursive function?`,
          options: [
            "The condition that terminates the recursive loop",
            "The main block of code executing recursive calls",
            "The initial function parameter value",
            "The memory address of the recursion stack"
          ],
          answer: 0,
          explanation: "The base case is the essential condition in a recursive function that stops further recursive calls, preventing infinite loops and stack overflow."
        },
        {
          question: `What error occurs when a recursion does not hit its base case?`,
          options: [
            "NullPointerException",
            "Stack Overflow Error",
            "Division by Zero Error",
            "Compilation Error"
          ],
          answer: 1,
          explanation: "Without a base case, recursive calls are placed onto the call stack continuously until the memory allocation for the stack is exceeded, causing a Stack Overflow."
        }
      ]
    };

    setQuizzes([newQuizObj, ...quizzes]);
    setIsGenerating(false);
    setShowForm(false);
    setTopic(''); setPromptText('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDeleteQuiz = (topicToDelete) => {
    setQuizzes(quizzes.filter(q => q.topic !== topicToDelete));
    if (expandedQuiz === topicToDelete) setExpandedQuiz(null);
  };

  const getDifficultyStyle = (diff) => {
    switch (diff) {
      case 'Beginner': return { bg: 'rgba(16,185,129,0.08)', color: '#10b981' };
      case 'Advanced': return { bg: 'rgba(239,68,68,0.08)', color: '#ef4444' };
      default: return { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b' };
    }
  };

  // Stats
  const totalQuestions = quizzes.reduce((sum, q) => sum + q.questions.length, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Exams & Assessments</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Generate AI quizzes and manage student assessments</p>
      </div>

      {/* Success Toast */}
      {success && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', fontSize: '11px', fontWeight: 600, color: '#10b981' }} className="animate-fade-in">
          <CheckCircle size={14} /> Quiz generated successfully!
        </div>
      )}

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Quizzes', value: quizzes.length, icon: HelpCircle, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
          { label: 'Questions', value: totalQuestions, icon: FileText, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Avg Score', value: '72.6%', icon: BarChart, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
        ].map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} style={{ ...cardStyle, padding: '12px', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={13} style={{ color: st.color }} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{st.value}</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)' }}>{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Add Button / Form */}
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="click-press"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
          <Sparkles size={14} /> AI Quiz Generator
        </button>
      ) : (
        <div style={cardStyle} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} style={{ color: 'var(--primary-color)' }} /> Generate with AI
            </h4>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleAIQuizGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Quiz Topic *</label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)} style={inputStyle} placeholder="e.g. Recursion, React Hooks" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={inputStyle}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Questions</label>
                <select value={numQuestions} onChange={e => setNumQuestions(e.target.value)} style={inputStyle}>
                  <option>5</option><option>10</option><option>15</option><option>20</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Focus Keywords (optional)</label>
              <input type="text" value={promptText} onChange={e => setPromptText(e.target.value)} style={inputStyle} placeholder="e.g. stack allocation, dynamic memory" />
            </div>

            <button type="submit" disabled={!topic.trim() || isGenerating} className="click-press"
              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: !topic.trim() ? '#ede9f4' : 'var(--primary-gradient)', color: !topic.trim() ? 'var(--text-muted)' : '#fff', fontWeight: 700, fontSize: '12px', cursor: topic.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: isGenerating ? 0.7 : 1 }}>
              {isGenerating ? <><Loader size={14} className="animate-spin" /> Generating...</> : <><Sparkles size={14} /> Generate MCQ Quiz</>}
            </button>
          </form>
        </div>
      )}

      {/* Quiz Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {quizzes.length === 0 && (
          <div style={{ ...cardStyle, alignItems: 'center', padding: '30px 20px', textAlign: 'center' }}>
            <HelpCircle size={28} style={{ color: '#ede9f4' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>No quizzes created yet. Use the AI generator to get started!</p>
          </div>
        )}

        {quizzes.map((q, idx) => {
          const diffStyle = getDifficultyStyle(q.difficulty || 'Intermediate');
          const isExpanded = expandedQuiz === q.topic;
          return (
            <div key={idx} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <HelpCircle size={16} style={{ color: '#6366f1' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{q.topic}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', background: diffStyle.bg, color: diffStyle.color }}>
                      {q.difficulty || 'Intermediate'}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{q.questions.length} questions</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  <button onClick={() => setExpandedQuiz(isExpanded ? null : q.topic)} className="click-press"
                    style={{ padding: '6px 8px', borderRadius: '8px', background: 'var(--primary-glow)', color: 'var(--primary-color)', border: 'none', cursor: 'pointer' }}>
                    <Eye size={12} />
                  </button>
                  <button onClick={() => handleDeleteQuiz(q.topic)} className="click-press"
                    style={{ padding: '6px 8px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', cursor: 'pointer' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              {/* Expanded Questions */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid #f5f3f9', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }} className="animate-fade-in">
                  {q.questions.map((qItem, qIdx) => (
                    <div key={qIdx} style={{ background: '#faf9fc', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary-color)' }}>Q{qIdx + 1}</span>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>{qItem.question}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                        {qItem.options.map((opt, oIdx) => (
                          <div key={oIdx} style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 8px', borderRadius: '6px', fontSize: '10px',
                            background: oIdx === qItem.answer ? 'rgba(16,185,129,0.08)' : 'transparent',
                            border: oIdx === qItem.answer ? '1px solid rgba(16,185,129,0.2)' : '1px solid transparent',
                            color: oIdx === qItem.answer ? '#10b981' : 'var(--text-secondary)',
                            fontWeight: oIdx === qItem.answer ? 700 : 500
                          }}>
                            {oIdx === qItem.answer ? <CheckCircle size={10} /> : <span style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1.5px solid #ede9f4', flexShrink: 0 }} />}
                            {opt}
                          </div>
                        ))}
                      </div>
                      {qItem.explanation && (
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: 1.4, fontStyle: 'italic' }}>
                          💡 {qItem.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
