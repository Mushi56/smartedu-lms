import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, CheckCircle, XCircle, Timer, RotateCcw, AlertCircle, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Quizzes({ quizzes, streak, overallProgress, setOverallProgress }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizScore, setQuizScore] = useState(0);

  const activeQuiz = quizzes.find(q => q.topic === selectedTopic);
  const currentQuestion = activeQuiz ? activeQuiz.questions[currentQuestionIdx] : null;

  // Countdown timer for active quiz session
  useEffect(() => {
    if (!selectedTopic || isSubmitted) return;
    if (timeLeft === 0) {
      handleNextQuestion(true); // Automatically advance on timeout
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, selectedTopic, isSubmitted]);

  const handleStartQuiz = (topic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsSubmitted(false);
    setTimeLeft(30);
    setQuizScore(0);
  };

  const handleOptionSelect = (idx) => {
    if (selectedOption !== null) return; // Prevent changing answer after selection
    setSelectedOption(idx);
  };

  const handleNextQuestion = (isTimeout = false) => {
    const updatedAnswers = [...answers, isTimeout ? -1 : selectedOption];
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      // Calculate final score
      let correctCount = 0;
      activeQuiz.questions.forEach((q, idx) => {
        if (q.answer === updatedAnswers[idx]) {
          correctCount++;
        }
      });
      setQuizScore(correctCount);
      setIsSubmitted(true);

      // Confetti splash for top performers!
      if (correctCount === activeQuiz.questions.length) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      
      // Update overall progress slightly upon completing a quiz!
      setOverallProgress(prev => Math.min(100, prev + 2));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            AI Smart Quizzes
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Validate your competencies with instant AI assessments and feedback
          </p>
        </div>
        
        {streak > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1))',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#f59e0b',
            fontSize: '12px',
            fontWeight: 800
          }}>
            <span>🔥 {streak} Day Streak</span>
          </div>
        )}
      </div>

      {/* Select Topic Mode */}
      {!selectedTopic ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {quizzes.map((quiz) => (
            <div 
              key={quiz.topic} 
              className="smart-card hover-glow" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                backgroundColor: 'var(--primary-glow)', 
                color: 'var(--primary-color)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '20px' 
              }}>
                <HelpCircle size={24} />
              </div>
              
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {quiz.topic} Basics Quiz
              </h3>
              
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
                Covers fundamentals, memory complexities, execution limits, and optimization rules. Contains {quiz.questions.length} MCQ questions.
              </p>
              
              <button 
                onClick={() => handleStartQuiz(quiz.topic)}
                className="btn-primary click-press"
                style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  background: 'linear-gradient(135deg, var(--primary-color), #4f46e5)',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Start Assessment</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Active Quiz View
        <div 
          className="smart-card" 
          style={{ 
            maxWidth: '680px', 
            margin: '0 auto', 
            width: '100%', 
            padding: '30px', 
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          {/* Header Row */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: '1px solid var(--border-color)', 
            paddingBottom: '16px', 
            marginBottom: '24px' 
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Topic: <span style={{ color: 'var(--primary-color)' }}>{selectedTopic}</span> • Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
            </span>
            
            {!isSubmitted && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontSize: '14px', 
                fontWeight: 800, 
                color: timeLeft < 10 ? '#ef4444' : 'var(--text-primary)',
                background: timeLeft < 10 ? 'rgba(239,68,68,0.1)' : 'var(--bg-app)',
                padding: '6px 12px',
                borderRadius: '20px',
                border: timeLeft < 10 ? '1px solid rgba(239,68,68,0.2)' : '1px solid var(--border-color)',
                transition: 'all 0.3s ease'
              }}>
                <Timer size={16} className={timeLeft < 10 ? 'animate-pulse' : ''} />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>

          {/* Score Result View */}
          {isSubmitted ? (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                backgroundColor: quizScore === activeQuiz.questions.length ? 'rgba(16, 185, 129, 0.1)' : 'rgba(124, 58, 237, 0.1)', 
                color: quizScore === activeQuiz.questions.length ? '#10b981' : 'var(--primary-color)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '36px',
                margin: '0 auto'
              }}>
                {quizScore === activeQuiz.questions.length ? '🏆' : '🎉'}
              </div>
              
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>Quiz Completed!</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  You scored <strong style={{ color: 'var(--primary-color)' }}>{quizScore} out of {activeQuiz.questions.length}</strong> ({Math.round((quizScore / activeQuiz.questions.length) * 100)}%).
                </p>
              </div>

              {/* Explanations List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', textAlign: 'left' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  Question Review & AI Explanations:
                </h4>

                {activeQuiz.questions.map((q, qIdx) => {
                  const userAnswerIdx = answers[qIdx];
                  const isCorrect = q.answer === userAnswerIdx;
                  return (
                    <div 
                      key={qIdx} 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '12px', 
                        padding: '20px', 
                        borderRadius: '12px', 
                        border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`, 
                        backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.02)' : 'rgba(239, 68, 68, 0.02)' 
                      }}
                    >
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        {isCorrect 
                          ? <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} /> 
                          : <XCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                        }
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>{q.question}</span>
                      </div>

                      <div style={{ fontSize: '13px', paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ color: 'var(--text-secondary)' }}>
                          Your answer: <span style={{ fontWeight: 700, color: isCorrect ? '#10b981' : '#ef4444' }}>{userAnswerIdx === -1 ? 'Timed Out' : q.options[userAnswerIdx]}</span>
                        </div>
                        {!isCorrect && (
                          <div style={{ color: 'var(--text-secondary)' }}>
                            Correct answer: <span style={{ fontWeight: 700, color: '#10b981' }}>{q.options[q.answer]}</span>
                          </div>
                        )}
                        
                        {/* AI explanation segment */}
                        <div style={{ 
                          marginTop: '12px', 
                          padding: '16px', 
                          borderRadius: '10px', 
                          backgroundColor: 'var(--bg-app)', 
                          borderLeft: '4px solid var(--primary-color)', 
                          display: 'flex', 
                          gap: '8px', 
                          flexDirection: 'column',
                          boxShadow: 'var(--shadow-sm)'
                        }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '0.5px' }}>
                            <Sparkles size={12} />
                            <span>AI INSIGHT & EXPLANATION</span>
                          </span>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                <button 
                  onClick={() => setSelectedTopic(null)} 
                  className="btn-secondary click-press"
                  style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '13px' }}
                >
                  Select Another Quiz
                </button>
                <button 
                  onClick={() => handleStartQuiz(selectedTopic)} 
                  className="btn-primary click-press"
                  style={{ 
                    padding: '10px 20px', 
                    borderRadius: '8px', 
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, var(--primary-color), #4f46e5)'
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          ) : (
            // Active Question Options
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', lineHeight: 1.4 }}>
                {currentQuestion.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      className={`mcq-option-row ${isSelected ? 'selected' : ''}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid var(--primary-color)' : '1.5px solid var(--border-color)',
                        backgroundColor: isSelected ? 'var(--primary-glow)' : 'var(--bg-app)',
                        cursor: selectedOption !== null ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div className="option-badge" style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
                        color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '12px',
                        flexShrink: 0
                      }}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="option-text" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginTop: '28px', 
                borderTop: '1px solid var(--border-color)', 
                paddingTop: '20px' 
              }}>
                <button 
                  onClick={() => handleNextQuestion()}
                  className="btn-primary click-press"
                  disabled={selectedOption === null}
                  style={{ 
                    opacity: selectedOption === null ? 0.6 : 1,
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, var(--primary-color), #4f46e5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{currentQuestionIdx === activeQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
