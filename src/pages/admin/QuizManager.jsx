import React, { useState } from 'react';
import { HelpCircle, Sparkles, PlusCircle, Trash2, CheckCircle, BarChart, FileText, Loader } from 'lucide-react';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Quiz & Assessment Manager</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Review student test scores, build homework rubrics, and generate new quizzes using AI</p>
        </div>

        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="btn-primary click-press"
          >
            <Sparkles size={16} />
            <span>AI Quiz Generator</span>
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* AI GENERATOR FORM PANEL */}
        {isAdding ? (
          <div className="smart-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <Sparkles size={18} style={{ color: 'var(--primary-color)' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>AI Quiz Generator</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'left' }}>
              Set a topic and details below. Our built-in EdTech AI engine will automatically build O(1) optimized MCQ questions, complete with option arrays and clear explanations!
            </p>

            <form onSubmit={handleAIQuizGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Quiz Subject/Topic</label>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Recursion, React Hooks"
                  />
                </div>

                <div className="form-group">
                  <label>Syllabus Difficulty</label>
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Focus Guidelines or Key Concepts (Prompt)</label>
                <input 
                  type="text" 
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. stack allocation limits, dynamic memory structures"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)} 
                  className="btn-secondary click-press"
                  disabled={isGenerating}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary click-press"
                  disabled={!topic.trim() || isGenerating}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '8px', backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success)', fontSize: '13px', fontWeight: 600 }}>
                <CheckCircle size={16} />
                <span>AI MCQ Quiz generated and injected successfully! Syncing into active student portals.</span>
              </div>
            )}

            {/* Overall class stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HelpCircle size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Total Assessments</span>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>{quizzes.length} Quizzes</span>
                </div>
              </div>

              <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--status-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Average Test Grade</span>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>72.6% Correct</span>
                </div>
              </div>

              <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--status-pending)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Student Attempts</span>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>32 Completed</span>
                </div>
              </div>
            </div>

            {/* List of active assessments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quizzes.map((q) => (
                <div key={q.topic} className="upcoming-class-row animate-fade-in" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, textAlign: 'left' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px' }}>{q.topic} MCQ Syllabus</h3>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Contains {q.questions.length} multiple choice options • Complete AI reviews enabled</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button 
                      onClick={() => handleDeleteQuiz(q.topic)}
                      className="btn-secondary click-press"
                      style={{ padding: '8px 12px', color: 'var(--status-danger)', borderColor: 'rgba(239,68,68,0.2)' }}
                      title="Delete Quiz"
                    >
                      <Trash2 size={12} />
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
