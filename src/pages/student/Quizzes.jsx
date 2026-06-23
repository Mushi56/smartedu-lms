import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, CheckCircle, XCircle, Timer, RotateCcw, AlertTriangle } from 'lucide-react';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700 }}>AI Smart Quizzes</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Validate your competencies with instant AI assessments and feedback</p>
      </div>

      {/* Select Topic Mode */}
      {!selectedTopic ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {quizzes.map((quiz) => (
            <div key={quiz.topic} className="smart-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <HelpCircle size={20} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{quiz.topic} Basics Quiz</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Covers fundamentals, memory complexities, execution limits, and optimization rules. {quiz.questions.length} MCQ questions.
              </p>
              <button 
                onClick={() => handleStartQuiz(quiz.topic)}
                className="btn-primary click-press"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Start Assessment
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Active Quiz View
        <div className="smart-card" style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Topic: {selectedTopic} • Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
            </span>
            
            {!isSubmitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: timeLeft < 10 ? 'var(--status-danger)' : 'var(--text-primary)' }}>
                <Timer size={16} />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>

          {/* Score Result View */}
          {isSubmitted ? (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '48px' }}>
                {quizScore === activeQuiz.questions.length ? '🏆' : '🎉'}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Quiz Completed!</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                You scored **{quizScore} out of {activeQuiz.questions.length}** ({Math.round((quizScore / activeQuiz.questions.length) * 100)}%).
              </p>

              {/* Explanations List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', textAlign: 'left' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  Question Review & AI Explanations:
                </h4>

                {activeQuiz.questions.map((q, qIdx) => {
                  const userAnswerIdx = answers[qIdx];
                  const isCorrect = q.answer === userAnswerIdx;
                  return (
                    <div key={qIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        {isCorrect 
                          ? <CheckCircle size={16} style={{ color: 'var(--status-success)', marginTop: '2px' }} /> 
                          : <XCircle size={16} style={{ color: 'var(--status-danger)', marginTop: '2px' }} />
                        }
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{q.question}</span>
                      </div>

                      <div style={{ fontSize: '12px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>
                          Your answer: <span style={{ fontWeight: 600, color: isCorrect ? 'var(--status-success)' : 'var(--status-danger)' }}>{userAnswerIdx === -1 ? 'Timed Out' : q.options[userAnswerIdx]}</span>
                        </p>
                        {!isCorrect && (
                          <p style={{ color: 'var(--text-secondary)' }}>
                            Correct answer: <span style={{ fontWeight: 600, color: 'var(--status-success)' }}>{q.options[q.answer]}</span>
                          </p>
                        )}
                        
                        {/* AI explanation segment */}
                        <div style={{ marginTop: '10px', padding: '10px', borderRadius: '6px', backgroundColor: 'var(--bg-card)', borderLeft: '3px solid var(--primary-color)', display: 'flex', gap: '8px', flexDirection: 'column' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Sparkles size={10} />
                            <span>AI EXPLANATION</span>
                          </span>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4 }}>{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                <button onClick={() => setSelectedTopic(null)} className="btn-secondary click-press">
                  Select Another Quiz
                </button>
                <button onClick={() => handleStartQuiz(selectedTopic)} className="btn-primary click-press">
                  <RotateCcw size={14} />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          ) : (
            // Active Question Options
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px' }}>{currentQuestion.question}</h3>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      className={`mcq-option-row ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="option-badge">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="option-text">{option}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <button 
                  onClick={() => handleNextQuestion()}
                  className="btn-primary click-press"
                  disabled={selectedOption === null}
                  style={{ opacity: selectedOption === null ? 0.6 : 1 }}
                >
                  <span>{currentQuestionIdx === activeQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
