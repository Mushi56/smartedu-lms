import React, { useState, useEffect, useRef } from 'react';
import { Send, Cpu, Star, AlertCircle, HelpCircle, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { getMobileAIResponse } from '../../data/mobileData';
import confetti from 'canvas-confetti';

export default function AiTutor({ apiKey }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello Omar! I am your AI learning companion. What concept or problem can I help you master today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('chat'); // 'chat', 'quiz'
  
  // Custom Prompts
  const studyPrompts = [
    { label: 'Explain Quadratic Formula', query: 'Explain quadratic formula clearly' },
    { label: 'IELTS Band 8 Speaking Tips', query: 'What are ielts speaking band 8 tips?' },
    { label: 'Explain Python Lists', query: 'Show me python list comprehensions' }
  ];

  // Quiz States
  const [quizState, setQuizState] = useState({
    started: false,
    currentQuestion: 0,
    answers: {},
    finished: false,
    score: 0
  });

  const quizQuestions = [
    {
      id: 'q1',
      question: 'Which of the following is the correct quadratic roots formula?',
      options: [
        'x = [-b ± √(b² - 4ac)] / 2a',
        'x = [b ± √(b² + 4ac)] / a',
        'x = [-b ± √(b - 4ac)] / 2',
        'x = [b ± √(b² - 4ac)] / 2a'
      ],
      correct: 0
    },
    {
      id: 'q2',
      question: 'What does the term "Coherence and Cohesion" evaluate in IELTS Speaking?',
      options: [
        'Pronunciation of difficult words',
        'Logical organization and flow of sentences',
        'Grammatical accuracy of compound sentences',
        'Volume and speaking pace'
      ],
      correct: 1
    },
    {
      id: 'q3',
      question: 'What is the output of [x**2 for x in range(3)] in Python?',
      options: [
        '[1, 4, 9]',
        '[0, 1, 4, 9]',
        '[0, 1, 4]',
        '[1, 2, 3]'
      ],
      correct: 2
    }
  ];

  const handleSend = async (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await getMobileAIResponse(text, apiKey);
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I encountered an issue. Let's try again!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStartQuiz = () => {
    setQuizState({
      started: true,
      currentQuestion: 0,
      answers: {},
      finished: false,
      score: 0
    });
  };

  const handleSelectOption = (idx) => {
    const nextAnswers = { ...quizState.answers, [quizState.currentQuestion]: idx };
    setQuizState(prev => ({ ...prev, answers: nextAnswers }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
    } else {
      // Evaluate Score
      let score = 0;
      quizQuestions.forEach((q, idx) => {
        if (quizState.answers[idx] === q.correct) {
          score += 1;
        }
      });

      if (score === quizQuestions.length) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setQuizState(prev => ({ ...prev, finished: true, score }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }} className="animate-fade-in">
      
      {/* Tab Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg-input)', borderRadius: '24px', padding: '4px' }}>
        <button
          onClick={() => setActiveSubTab('chat')}
          style={{
            padding: '8px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeSubTab === 'chat' ? 'var(--secondary-color)' : 'transparent',
            color: activeSubTab === 'chat' ? 'var(--primary-color)' : 'var(--text-secondary)'
          }}
        >
          AI Chat Tutor
        </button>
        <button
          onClick={() => setActiveSubTab('quiz')}
          style={{
            padding: '8px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeSubTab === 'quiz' ? 'var(--secondary-color)' : 'transparent',
            color: activeSubTab === 'quiz' ? 'var(--primary-color)' : 'var(--text-secondary)'
          }}
        >
          Dynamic AI Quiz
        </button>
      </div>

      {/* ---------------- SUB TAB 1: AI TUTOR CHAT ---------------- */}
      {activeSubTab === 'chat' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 210px)', justifyContent: 'space-between' }}>
          
          {/* Scrollable Chat Area */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '10px' }} className="hide-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  backgroundColor: m.sender === 'user' ? 'var(--primary-color)' : 'var(--bg-card)',
                  color: m.sender === 'user' ? '#fff' : 'var(--text-primary)',
                  padding: '12px 16px',
                  borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  textAlign: 'left',
                  fontSize: '12.5px',
                  lineHeight: 1.5,
                  wordBreak: 'break-word'
                }}
              >
                {/* Parse simple markdown tags like ### */}
                {m.text.split('\n').map((line, idx) => {
                  if (line.startsWith('### ')) {
                    return <h4 key={idx} style={{ fontSize: '13px', fontWeight: 800, margin: '6px 0 4px 0', color: m.sender === 'user' ? '#fff' : 'var(--text-primary)' }}>{line.replace('### ', '')}</h4>;
                  }
                  if (line.startsWith('* ')) {
                    return <div key={idx} style={{ margin: '2px 0', display: 'flex', gap: '6px' }}><span>•</span><span>{line.replace('* ', '')}</span></div>;
                  }
                  return <p key={idx} style={{ margin: '4px 0' }}>{line}</p>;
                })}
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '6px', background: 'var(--bg-card)', padding: '12px 18px', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-muted)', animation: 'pulse 1.2s infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-muted)', animation: 'pulse 1.2s infinite 0.2s' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-muted)', animation: 'pulse 1.2s infinite 0.4s' }} />
              </div>
            )}
          </div>

          {/* Quick suggestions tags */}
          {messages.length === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', textAlign: 'left' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Quick concepts prompts</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {studyPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.query)}
                    className="click-press"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    🚀 {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Inputs */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <input
              type="text"
              className="mobile-input"
              placeholder="Ask anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isTyping}
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="mobile-btn-primary click-press"
              style={{
                width: '42px',
                height: '42px',
                padding: '0px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* ---------------- SUB TAB 2: INTERACTIVE AI QUIZ GENERATOR ---------------- */}
      {activeSubTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - 210px)', justifyContent: 'center' }}>
          
          {!quizState.started ? (
            <div className="mobile-card" style={{ padding: '24px', textAlign: 'center', gap: '16px' }} className="animate-slide-up">
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(202, 186, 97, 0.15)', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <Cpu size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Dynamic AI Subject Challenge</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '8px' }}>
                  Generate a custom 3-question MCQ quiz based on current learning modules to test memory recall.
                </p>
              </div>
              <button
                onClick={handleStartQuiz}
                className="mobile-btn-primary click-press"
                style={{ width: '100%', borderRadius: '24px' }}
              >
                Launch AI Quiz
              </button>
            </div>
          ) : !quizState.finished ? (
            <div className="mobile-card animate-slide-up" style={{ padding: '20px', gap: '14px', textAlign: 'left' }}>
              {/* Progress Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>
                <span>QUESTION {quizState.currentQuestion + 1} OF {quizQuestions.length}</span>
                <span>Progress: {Math.round(((quizState.currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
              </div>
              
              {/* Question text */}
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                {quizQuestions[quizState.currentQuestion].question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quizQuestions[quizState.currentQuestion].options.map((opt, idx) => {
                  const isSelected = quizState.answers[quizState.currentQuestion] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: isSelected ? '1.5px solid var(--secondary-color)' : '1px solid var(--border-color)',
                        backgroundColor: isSelected ? 'var(--secondary-glow)' : 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        fontSize: '12.5px',
                        fontWeight: isSelected ? 750 : 600,
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      className="click-press"
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Navigation button */}
              <button
                onClick={handleNextQuestion}
                disabled={quizState.answers[quizState.currentQuestion] === undefined}
                className="mobile-btn-primary click-press"
                style={{
                  width: '100%',
                  marginTop: '10px',
                  backgroundColor: quizState.answers[quizState.currentQuestion] === undefined ? 'var(--text-muted)' : 'var(--secondary-color)'
                }}
              >
                {quizState.currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          ) : (
            // Quiz Finish Screen
            <div className="mobile-card animate-slide-up" style={{ padding: '24px', textAlign: 'center', gap: '16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: quizState.score === quizQuestions.length ? 'rgba(43,168,74,0.15)' : 'rgba(239,68,68,0.15)', color: quizState.score === quizQuestions.length ? 'var(--accent-green)' : 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                {quizState.score === quizQuestions.length ? <CheckCircle size={32} /> : <XCircle size={32} />}
              </div>
              
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800 }}>Challenge Completed!</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  You scored <strong>{quizState.score} / {quizQuestions.length}</strong> correct.
                </p>
                {quizState.score === quizQuestions.length ? (
                  <span style={{ fontSize: '11px', color: 'var(--accent-green)', fontWeight: 700, display: 'block', marginTop: '6px' }}>🎉 Perfect score! Confetti triggered!</span>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>Review the topics and try again!</span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button
                  onClick={handleStartQuiz}
                  className="mobile-btn-primary click-press"
                  style={{ flex: 1, borderRadius: '20px' }}
                >
                  <RefreshCw size={14} /> Try Again
                </button>
                <button
                  onClick={() => setQuizState({ started: false })}
                  className="mobile-btn-secondary click-press"
                  style={{ flex: 1, borderRadius: '20px' }}
                >
                  Back to Hub
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
