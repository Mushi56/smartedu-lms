import React, { useState } from 'react';
import { Award, Target, Flame, CheckCircle2, Star, ShieldAlert, Download, X, Bookmark, Globe, Verified } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Progress({ courses, streak, overallProgress }) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  const completedCourses = courses.filter(c => c.progress === 100 || c.id === 'course-1'); // simulate some completed

  const achievements = [
    { id: 1, title: "7 Day Streak", desc: "Maintained active study streak for a week", badge: "🔥", color: 'linear-gradient(135deg, #f59e0b, #ef4444)', xp: '500 XP' },
    { id: 2, title: "AI Quiz Master", desc: "Scored 90% in 5 consecutive AI quizzes", badge: "⭐", color: 'linear-gradient(135deg, #3b82f6, #6366f1)', xp: '800 XP' },
    { id: 3, title: "Fast Learner", desc: "Completed 2 modules within a single day", badge: "⚡", color: 'linear-gradient(135deg, #10b981, #059669)', xp: '350 XP' },
    { id: 4, title: "Class Regular", desc: "Attended 10 live lecture streams in a row", badge: "🎓", color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', xp: '600 XP' }
  ];

  const handleLaunchCertificate = (courseName) => {
    setActiveCert(courseName);
    setShowCertificate(true);
    // Splash of congratulations confetti!
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            My Progress & Achievements
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Observe your study streaks, unlock badges, and download accredited certificates
          </p>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="stats-row-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {/* Streak card */}
        <div 
          className="stat-card-item hover-glow"
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1.5px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'linear-gradient(135deg, var(--bg-card), rgba(245, 158, 11, 0.03))'
          }}
        >
          <div 
            className="stat-card-icon-box animate-pulse" 
            style={{ 
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)', 
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Flame size={22} fill="#f59e0b" />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label" style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', fontWeight: 650 }}>Current Streak</span>
            <span className="stat-card-value" style={{ fontSize: '20px', fontWeight: 850, color: 'var(--text-primary)' }}>{streak} Days</span>
            <span style={{ fontSize: '10px', color: '#10b981', display: 'block', marginTop: '2px', fontWeight: 700 }}>Keep it up tomorrow!</span>
          </div>
        </div>

        {/* Courses card */}
        <div 
          className="stat-card-item hover-glow"
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1.5px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div 
            className="stat-card-icon-box" 
            style={{ 
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)', 
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Target size={22} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label" style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', fontWeight: 650 }}>Courses In Progress</span>
            <span className="stat-card-value" style={{ fontSize: '20px', fontWeight: 850, color: 'var(--text-primary)' }}>
              {courses.filter(c => c.progress > 0 && c.progress < 100).length}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>Consistent progression</span>
          </div>
        </div>

        {/* Certs card */}
        <div 
          className="stat-card-item hover-glow"
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1.5px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div 
            className="stat-card-icon-box" 
            style={{ 
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(99, 102, 241, 0.1)', 
              color: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Award size={22} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label" style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', fontWeight: 650 }}>Certificates Earned</span>
            <span className="stat-card-value" style={{ fontSize: '20px', fontWeight: 850, color: 'var(--text-primary)' }}>{completedCourses.length}</span>
            <span style={{ fontSize: '10px', color: 'var(--primary-color)', display: 'block', marginTop: '2px', fontWeight: 700 }}>Accredited & Verified</span>
          </div>
        </div>
      </div>

      {/* Unlocked Badges */}
      <div 
        className="smart-card"
        style={{
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)'
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', margin: '0 0 16px' }}>
          Unlocked Badges
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {achievements.map((ach) => (
            <div 
              key={ach.id} 
              className="hover-glow"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                padding: '16px', 
                borderRadius: '12px', 
                border: '1.5px solid var(--border-color)', 
                backgroundColor: 'var(--bg-app)', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                background: ach.color, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '24px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                flexShrink: 0
              }}>
                {ach.badge}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '13px', fontWeight: 800, display: 'block', color: 'var(--text-primary)' }}>{ach.title}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px', lineHeight: 1.3, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{ach.desc}</span>
                <span style={{ 
                  fontSize: '9px', 
                  fontWeight: 800, 
                  color: '#ffffff', 
                  display: 'inline-block', 
                  marginTop: '6px',
                  background: 'var(--primary-color)',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>{ach.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate List */}
      <div 
        className="smart-card"
        style={{
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)'
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', margin: '0 0 16px' }}>
          Course Credentials
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {completedCourses.map((c) => (
            <div 
              key={c.id} 
              className="upcoming-class-row hover-glow" 
              style={{ 
                padding: '16px 20px', 
                borderRadius: '12px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '10px', 
                  backgroundColor: 'rgba(245,158,11,0.08)', 
                  color: '#f59e0b', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Award size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                    Completion Certificate: {c.title}
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
                    Accredited by SURIA TECH Academy • Issued May 2026
                  </p>
                </div>
              </div>

              <button 
                onClick={() => handleLaunchCertificate(c.title)}
                className="btn-primary click-press"
                style={{ 
                  padding: '10px 18px', 
                  fontSize: '12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--primary-color), #4f46e5)',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Verified size={14} />
                <span>View Credential</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal popup view */}
      {showCertificate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '24px',
          backdropFilter: 'blur(4px)'
        }}>
          <div 
            className="smart-card animate-fade-in" 
            style={{
              maxWidth: '680px',
              width: '100%',
              backgroundColor: '#ffffff',
              color: '#1e1b4b',
              padding: '48px 40px',
              position: 'relative',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              border: '12px double rgba(124, 58, 237, 0.4)',
              textAlign: 'center',
              backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(124, 58, 237, 0.02) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.02) 0%, transparent 40%)'
            }}
          >
            {/* Close */}
            <button 
              onClick={() => setShowCertificate(false)}
              style={{ 
                position: 'absolute', 
                right: '20px', 
                top: '20px', 
                color: '#64748b',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
              className="click-press"
            >
              <X size={20} />
            </button>

            {/* Seal Graphic */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ 
                width: '74px', 
                height: '74px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(124, 58, 237, 0.08)', 
                border: '2px dashed var(--primary-color)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '32px',
                boxShadow: '0 4px 10px rgba(124,58,237,0.1)'
              }}>
                🎓
              </div>
            </div>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
              Certificate of Achievement
            </h2>
            
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#64748b', fontWeight: 700, marginBottom: '24px' }}>
              This is proudly presented to
            </p>
            
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '38px', fontWeight: 800, borderBottom: '2.5px solid var(--primary-color)', display: 'inline-block', paddingBottom: '6px', color: '#0f172a', marginBottom: '24px' }}>
              Omar Hassan
            </h1>
            
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 32px' }}>
              for successfully mastering all modules, completing interactive programming assignments, and passing the AI-generated assessment syllabus in
            </p>
            
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b', marginBottom: '40px', background: 'rgba(124,58,237,0.05)', display: 'inline-block', padding: '6px 16px', borderRadius: '8px' }}>
              {activeCert}
            </h3>

            {/* Signatures */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '24px', display: 'block', color: 'var(--primary-color)', lineHeight: 1 }}>Dr. Vivek Sharma</span>
                <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, display: 'block', marginTop: '6px' }}>Course Instructor</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Verified size={24} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Verified</span>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '24px', display: 'block', color: 'var(--primary-color)', lineHeight: 1 }}>Dr. Arjun Sharma</span>
                <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, display: 'block', marginTop: '6px' }}>Director of Academics</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
