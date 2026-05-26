import React, { useState } from 'react';
import { Award, Target, Flame, CheckCircle2, Star, ShieldAlert, Download, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Progress({ courses, streak, overallProgress }) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  const completedCourses = courses.filter(c => c.progress === 100 || c.id === 'course-1'); // simulate some completed

  const achievements = [
    { id: 1, title: "7 Day Streak", desc: "Maintained active study streak for a week", badge: "🔥", color: '#7c3aed', xp: '500 XP' },
    { id: 2, title: "AI Quiz Master", desc: "Scored 90% in 5 consecutive AI quizzes", badge: "⭐", color: '#f59e0b', xp: '800 XP' },
    { id: 3, title: "Fast Learner", desc: "Completed 2 modules within a single day", badge: "⚡", color: '#10b981', xp: '350 XP' },
    { id: 4, title: "Class Regular", desc: "Attended 10 live lecture streams in a row", badge: "🎓", color: '#3b82f6', xp: '600 XP' }
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>My Progress & Achievements</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Observe your study streaks, unlock badges, and download accredited certificates</p>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="stats-row-grid">
        <div className="stat-card-item">
          <div className="stat-card-icon-box" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
            <Flame size={20} fill="#7c3aed" />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label">Current Streak</span>
            <span className="stat-card-value">{streak} Days</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Keep it up tomorrow!</span>
          </div>
        </div>

        <div className="stat-card-item">
          <div className="stat-card-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <Target size={20} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label">Courses In Progress</span>
            <span className="stat-card-value">{courses.filter(c => c.progress > 0 && c.progress < 100).length}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Consistent progression</span>
          </div>
        </div>

        <div className="stat-card-item">
          <div className="stat-card-icon-box" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <Award size={20} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label">Certificates Earned</span>
            <span className="stat-card-value">{completedCourses.length}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Share on LinkedIn</span>
          </div>
        </div>
      </div>

      {/* Achievements List and Certificates Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Badges and achievements */}
        <div className="smart-card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '20px', textAlign: 'left' }}>Unlocked Badges</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {achievements.map((ach) => (
              <div 
                key={ach.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '14px', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border-color)', 
                  backgroundColor: 'var(--bg-app)', 
                  textAlign: 'left' 
                }}
              >
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--bg-card)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '22px', 
                  border: '1px solid var(--border-color)', 
                  boxShadow: 'var(--shadow-sm)' 
                }}>
                  {ach.badge}
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 700, display: 'block', color: 'var(--text-primary)' }}>{ach.title}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px', lineHeight: 1.3 }}>{ach.desc}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary-color)', display: 'inline-block', marginTop: '4px' }}>{ach.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Download section */}
        <div className="smart-card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '20px', textAlign: 'left' }}>Course Certificates</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {completedCourses.map((c) => (
              <div key={c.id} className="upcoming-class-row" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Certificate of Completion: {c.title}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Accredited by SmartEdu Learning Academics • Issued May 2026</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleLaunchCertificate(c.title)}
                  className="btn-primary click-press"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  <Download size={14} />
                  <span>View Certificate</span>
                </button>
              </div>
            ))}
          </div>
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
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '24px'
        }}>
          <div className="smart-card animate-fade-in" style={{
            maxWidth: '680px',
            width: '100%',
            backgroundColor: '#fff',
            color: '#1e1b4b',
            padding: '48px',
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            border: '8px double var(--primary-color)',
            textAlign: 'center'
          }}>
            <button 
              onClick={() => setShowCertificate(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', color: 'var(--text-secondary)' }}
            >
              <X size={20} />
            </button>

            {/* Seal */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'rgba(124,58,237,0.1)', border: '2px dashed var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                🎓
              </div>
            </div>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '16px' }}>
              Certificate of Achievement
            </h2>
            <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#64748b', marginBottom: '32px' }}>
              This is proudly presented to
            </p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 700, borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '8px', marginBottom: '32px' }}>
              Arjun Kumar
            </h1>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 40px' }}>
              for successfully mastering all modules, completing interactive programming assignments, and passing the AI-generated assessment syllabus in
            </p>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e1b4b', marginBottom: '48px' }}>
              {activeCert}
            </h3>

            {/* Signatures */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eaedf5', paddingTop: '20px' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '22px', display: 'block', color: 'var(--primary-color)' }}>Dr. Vivek Sharma</span>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Course Instructor</span>
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid var(--primary-color)', padding: '6px 12px', borderRadius: '4px' }}>SmartEdu Verified</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '22px', display: 'block', color: 'var(--primary-color)' }}>Dr. Arjun Sharma</span>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Director of Academics</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
