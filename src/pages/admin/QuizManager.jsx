import React, { useState } from 'react';
import { HelpCircle, Sparkles, PlusCircle, Trash2, CheckCircle, BarChart, FileText, Loader, ArrowLeft, Lightbulb } from 'lucide-react';

export default function QuizManager({ quizzes, setQuizzes }) {
  const [isAdding, setIsAdding] = useState(false);
  const [topic, setTopic] = useState('Recursion');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [promptText, setPromptText] = useState('Basic base cases and stack overflow bounds');
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAIQuizGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI MCQ Generation processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newQuizObj = {
      topic: topic,
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
    setIsAdding(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleDeleteQuiz = (topicToDelete) => {
    setQuizzes(quizzes.filter(q => q.topic !== topicToDelete));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Quiz & Assessment Manager
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Review student test scores, build homework rubrics, and generate new quizzes using AI
          </p>
        </div>

        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="btn-primary click-press"
            style={{
              background: 'linear-gradient(135deg, var(--primary-color), #4f46e5)',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Sparkles size={16} />
            <span>AI Quiz Generator</span>
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* AI GENERATOR FORM PANEL */}
        {isAdding ? (
          <div 
            className="smart-card"
            style={{
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
              <button 
                onClick={() => setIsAdding(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--border-color)',
                  background: 'var(--bg-app)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
                className="click-press"
              >
                <ArrowLeft size={14} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: 'var(--primary-color)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>AI Quiz Generator</h3>
              </div>
            </div>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
              Set a topic and guidelines below. Our AI engine will automatically generate highly optimized multiple-choice questions, complete with answers and explanations!
            </p>

            <form onSubmit={handleAIQuizGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }} className="responsive-grid-1col">
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Quiz Subject/Topic</label>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Recursion, React Hooks"
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--border-color)', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Syllabus Difficulty</label>
                  <select 
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--border-color)', fontSize: '13px', outline: 'none' }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Focus Guidelines or Key Concepts (Prompt)</label>
                <input 
                  type="text" 
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. stack allocation limits, dynamic memory structures"
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--border-color)', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)} 
                  className="btn-secondary click-press"
                  disabled={isGenerating}
                  style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary click-press"
                  disabled={!topic.trim() || isGenerating}
                  style={{ 
                    padding: '10px 20px', 
                    borderRadius: '8px', 
                    fontSize: '13px', 
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, var(--primary-color), #4f46e5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isGenerating ? <Loader size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  <span>{isGenerating ? 'AI Generating MCQ Sets...' : 'Generate MCQ Quizzes'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          // QUIZZES LIST & ATTEMPT STATS VIEW
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {success && (
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '14px 18px', 
                  borderRadius: '10px', 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  color: '#10b981', 
                  fontSize: '13px', 
                  fontWeight: 700,
                  border: '1px solid rgba(16, 185, 129, 0.2)' 
                }}
                className="animate-fade-in"
              >
                <CheckCircle size={16} />
                <span>AI MCQ Quiz generated and injected successfully! Syncing into active student portals.</span>
              </div>
            )}

            {/* Overall class stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', textAlign: 'left', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(99,102,241,0.08)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <HelpCircle size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Total Assessments</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{quizzes.length} Quizzes</span>
                </div>
              </div>

              <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', textAlign: 'left', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(16,185,129,0.08)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BarChart size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Average Test Grade</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>72.6% Correct</span>
                </div>
              </div>

              <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', textAlign: 'left', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(245,158,11,0.08)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Student Attempts</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>32 Completed</span>
                </div>
              </div>
            </div>

            {/* List of active assessments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Active Questionnaires</div>
              
              {quizzes.map((q) => (
                <div 
                  key={q.topic} 
                  className="upcoming-class-row hover-glow" 
                  style={{ 
                    padding: '20px', 
                    borderRadius: '16px', 
                    border: '1px solid var(--border-color)', 
                    backgroundColor: 'var(--bg-card)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, textAlign: 'left' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <HelpCircle size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '4px', color: 'var(--text-primary)' }}>{q.topic} MCQ Syllabus</h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Contains {q.questions.length} multiple choice options • Complete AI reviews enabled</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => handleDeleteQuiz(q.topic)}
                      className="btn-secondary click-press"
                      style={{ 
                        padding: '10px', 
                        color: '#ef4444', 
                        borderColor: 'rgba(239,68,68,0.15)', 
                        background: 'rgba(239,68,68,0.02)',
                        borderRadius: '10px'
                      }}
                      title="Delete Quiz"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
