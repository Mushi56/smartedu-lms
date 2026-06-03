import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Award, Calendar, CheckSquare, Clock, BookOpen, RotateCcw, FileText } from 'lucide-react';
import { getAIResponse } from '../data/mockData';

export default function AiPanel({ streak, overallProgress, apiKey, onTriggerQuiz }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi Omar! 👋 How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "Explain Binary Search in simple words",
    "Summarize today's class",
    "Create a quiz on Array",
    "I didn't understand this topic"
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call the AI Response function (simulated or real Gemini)
    const replyText = await getAIResponse(textToSend, apiKey);
    
    setIsTyping(false);
    
    // Add bot response
    const botMsg = { id: Date.now() + 1, text: replyText, sender: 'bot' };
    setMessages(prev => [...prev, botMsg]);

    // Special trigger: if the user asks for a quiz, redirect them to the quiz section!
    if (textToSend.toLowerCase().includes("quiz") || textToSend.toLowerCase().includes("array")) {
      if (onTriggerQuiz) {
        setTimeout(() => {
          onTriggerQuiz();
        }, 1500);
      }
    }
  };

  const handleResetChat = () => {
    setMessages([
      { id: 1, text: "Hi Omar! 👋 How can I help you today?", sender: 'bot' }
    ]);
  };

  return (
    <div className="ai-tutor-panel animate-fade-in">
      {/* 1. AI Tutor Chat Card */}
      <div className="ai-tutor-card">
        <div className="ai-card-header">
          <div className="ai-header-title">
            <Sparkles size={16} style={{ color: '#7c3aed' }} />
            <span>AI Tutor</span>
          </div>
          <button onClick={handleResetChat} className="ai-chat-reset-btn click-press" title="Start New Conversation">
            New Chat
          </button>
        </div>

        {/* Scrollable Chat log */}
        <div className="ai-chat-body">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-bubble ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}
            />
          ))}
          {isTyping && (
            <div className="chat-bubble bot" style={{ display: 'flex', gap: '4px', padding: '12px' }}>
              <span className="dot-blink" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '50%', display: 'inline-block' }}></span>
              <span className="dot-blink" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '50%', display: 'inline-block', animationDelay: '0.2s' }}></span>
              <span className="dot-blink" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '50%', display: 'inline-block', animationDelay: '0.4s' }}></span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Prompts */}
        <div className="ai-suggestions-list">
          {quickPrompts.map((prompt, idx) => (
            <button 
              key={idx} 
              onClick={() => handleSendMessage(prompt)}
              className="ai-suggest-btn click-press"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Input bar */}
        <div className="ai-chat-input-wrapper">
          <input 
            type="text" 
            placeholder="Ask anything..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(inputText);
            }}
          />
          <button 
            onClick={() => handleSendMessage(inputText)} 
            className="ai-send-btn click-press"
            disabled={!inputText.trim()}
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* 2. My Progress Checklist Card */}
      <div className="smart-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '15px', fontWeight: 600 }}>My Progress</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary-color)' }}>{overallProgress}%</span>
        </div>

        <div className="course-progress-bar-bg" style={{ height: '8px', marginBottom: '20px' }}>
          <div className="course-progress-bar-fill" style={{ width: `${overallProgress}%` }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="progress-list-item">
            <div className="progress-item-label">
              <BookOpen size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Courses Completed</span>
            </div>
            <span className="progress-item-value">5</span>
          </div>

          <div className="progress-list-item">
            <div className="progress-item-label">
              <CheckSquare size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Quizzes Completed</span>
            </div>
            <span className="progress-item-value">32</span>
          </div>

          <div className="progress-list-item">
            <div className="progress-item-label">
              <FileText size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Assignments Done</span>
            </div>
            <span className="progress-item-value">18</span>
          </div>

          <div className="progress-list-item">
            <div className="progress-item-label">
              <Clock size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Total Study Time</span>
            </div>
            <span className="progress-item-value">48h 30m</span>
          </div>
        </div>
      </div>

      {/* 3. Recent Achievements Card */}
      <div className="smart-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '15px', fontWeight: 600 }}>Recent Achievements</span>
          <button style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-color)' }}>View all</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Achievement 1 */}
          <div className="achievement-row">
            <div className="achievement-badge-box streak">
              🔥
            </div>
            <div className="achievement-info">
              <span className="achievement-title">{streak} Day Streak</span>
              <span className="achievement-desc">Keep learning everyday</span>
            </div>
          </div>

          {/* Achievement 2 */}
          <div className="achievement-row">
            <div className="achievement-badge-box quiz-master">
              ⭐
            </div>
            <div className="achievement-info">
              <span className="achievement-title">AI Quiz Master</span>
              <span className="achievement-desc">Scored 90% in AI quizzes</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation Keyframes Inject */}
      <style>{`
        @keyframes blink {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }
        .dot-blink {
          animation: blink 1.4s infinite both;
        }
      `}</style>
    </div>
  );
}
