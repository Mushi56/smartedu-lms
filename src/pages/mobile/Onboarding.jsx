import React, { useState } from 'react';
import { Crown, BookOpen, Cpu, Flame, ArrowRight } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: 'Learn Anywhere, Anytime',
      subtitle: 'Unlock premium education, synchronized modules, and active offline caching straight from your pocket.',
      icon: BookOpen,
      color: '#CABA61'
    },
    {
      title: 'AI Study Assistant',
      subtitle: 'Ask code questions, resolve math problems, and trigger custom-tailored study plans on the go.',
      icon: Cpu,
      color: '#a855f7'
    },
    {
      title: 'Gamified Achievements',
      subtitle: 'Build daily study streaks, challenge interactive quizzes, swipe study flashcards, and earn certificate rewards.',
      icon: Flame,
      color: '#f97316'
    }
  ];

  const current = slides[slide];
  const Icon = current.icon;

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(s => s + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'var(--bg-app)',
      padding: '36px 24px',
      justifyContent: 'space-between',
      textAlign: 'center'
    }} className="animate-fade-in">
      
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Crown size={16} style={{ color: 'var(--secondary-color)' }} />
        </div>
        <span style={{ fontWeight: 800, letterSpacing: '0.5px', color: 'var(--text-primary)', fontSize: '15px' }}>SmartEdu Mobile</span>
      </div>

      {/* Main Slide Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', margin: '40px 0' }} className="animate-slide-up">
        {/* Animated Glow Circle */}
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${current.color}15 0%, ${current.color}03 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${current.color}10`,
          boxShadow: `0 8px 30px ${current.color}08`
        }}>
          <Icon size={56} style={{ color: current.color }} />
        </div>

        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{current.title}</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '12px', padding: '0 10px' }}>
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* Footer Controllers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        {/* Slide Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: i === slide ? 'var(--secondary-color)' : 'var(--text-muted)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '16px' }}>
          <button
            onClick={onComplete}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              padding: '10px'
            }}
          >
            Skip
          </button>
          
          <button
            onClick={handleNext}
            className="mobile-btn-primary click-press"
            style={{
              padding: '12px 28px',
              borderRadius: '24px',
              boxShadow: '0 4px 15px rgba(202, 186, 97, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {slide === slides.length - 1 ? 'Get Started' : 'Next'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
