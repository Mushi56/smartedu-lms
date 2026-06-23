import React, { useState } from 'react';
import { Award, Shield, Key, Eye, EyeOff, Settings, Check, Download, ArrowLeft, Sun, Moon, Volume2 } from 'lucide-react';
import VerificationBadge from '../../components/VerificationBadge';

export default function Profile({ db, setDb, apiKey, setApiKey, theme, setTheme, user }) {
  const { courses = [], achievements = [] } = db;


  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [isEditingKey, setIsEditingKey] = useState(false);
  
  // Settings toggle states
  const [offlineMode, setOfflineMode] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);

  // Certificate Viewer State
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);

  const completedCourses = courses.filter(c => c.progress === 100);

  const handleSaveKey = (e) => {
    e.preventDefault();
    setApiKey(keyInput);
    setIsEditingKey(false);
    alert("Gemini API Key saved successfully!");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      
      {/* ---------------- VIEW 1: PROFILE SUMMARY & SETTINGS ---------------- */}
      {!selectedCertCourse ? (
        <>
          {/* User Details header */}
          <div className="mobile-card" style={{ padding: '20px', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                alt="User Avatar"
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--secondary-color)', boxShadow: 'var(--shadow-md)' }}
              />
              <span style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--accent-green)', width: '16px', height: '16px', borderRadius: '50%', border: '2.5px solid #fff' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{user?.name || 'Omar Hassan'}</h3>
                <VerificationBadge status={user?.verificationStatus || user?.role} size={14} style={{ marginLeft: '6px' }} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {user?.role === 'super-admin' ? 'Super Admin' : user?.role === 'admin' ? 'Admin' : user?.role === 'teacher' ? 'Verified Teacher' : 'Premium Student Member'}
              </span>
            </div>

            {/* Level progress */}
            <div style={{ width: '100%', marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Level 4 Scholar</span>
                <span>820 / 1000 XP</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '82%', height: '100%', background: 'var(--secondary-color)', borderRadius: '3px' }} />
              </div>
            </div>
          </div>

          {/* Badge Vault cabinet */}
          <div className="mobile-card" style={{ padding: '16px', gap: '10px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', textAlign: 'left' }}>Achievements Cabinet</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {achievements.map((ac) => (
                <div
                  key={ac.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: ac.earned ? 1 : 0.4
                  }}
                  title={ac.desc}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: ac.color ? `${ac.color}15` : 'var(--bg-input)',
                    color: ac.color || 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: ac.earned ? `1px solid ${ac.color}30` : '1px dashed var(--border-color)'
                  }}>
                    <Award size={18} />
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                    {ac.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates panel */}
          <div className="mobile-card" style={{ padding: '16px', gap: '10px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Earned Certificates</h4>
            
            {completedCourses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {completedCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCertCourse(c)}
                    className="click-press"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                      <Award size={16} style={{ color: 'var(--secondary-color)' }} />
                      <span style={{ fontSize: '12px', fontWeight: 750, color: 'var(--text-primary)' }}>{c.title} Certificate</span>
                    </div>
                    <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                  </button>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                Complete a course syllabus to 100% to generate certificate badges.
              </p>
            )}
          </div>

          {/* Platform Settings */}
          <div className="mobile-card" style={{ padding: '16px', gap: '12px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Settings Configuration</h4>

            {/* Dark Mode toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 650 }}>
                {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />} Dark Theme Mode
              </span>
              <button
                onClick={() => {
                  const nextTheme = theme === 'light' ? 'dark' : 'light';
                  setTheme(nextTheme);
                  document.documentElement.setAttribute('data-theme', nextTheme);
                }}
                className="click-press"
                style={{
                  padding: '4px 12px',
                  borderRadius: '14px',
                  border: '1.5px solid var(--border-color)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {theme === 'light' ? 'OFF' : 'ON'}
              </button>
            </div>

            {/* Offline Cache Mode */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 650 }}>
                <Shield size={15} /> Cache Offline Sync
              </span>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className="click-press"
                style={{
                  padding: '4px 12px',
                  borderRadius: '14px',
                  border: '1.5px solid var(--border-color)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {offlineMode ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Push Alerts */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 650 }}>
                <Volume2 size={15} /> Study Reminder Alerts
              </span>
              <button
                onClick={() => setPushAlerts(!pushAlerts)}
                className="click-press"
                style={{
                  padding: '4px 12px',
                  borderRadius: '14px',
                  border: '1.5px solid var(--border-color)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {pushAlerts ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* API Key Form */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 700 }}>
                  <Key size={15} /> Gemini API Key
                </span>
                <button
                  onClick={() => setIsEditingKey(!isEditingKey)}
                  style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {isEditingKey ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditingKey ? (
                <form onSubmit={handleSaveKey} style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type={showKey ? 'text' : 'password'}
                      className="mobile-input"
                      placeholder="AIzaSy..."
                      value={keyInput}
                      onChange={e => setKeyInput(e.target.value)}
                      style={{ height: '36px', paddingRight: '36px', fontSize: '11.5px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <button type="submit" className="mobile-btn-primary click-press" style={{ height: '36px', padding: '0 12px', borderRadius: '8px', fontSize: '11.5px' }}>
                    Save
                  </button>
                </form>
              ) : (
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {apiKey ? '••••••••••••••••' : 'No custom API key set (Simulated AI Active)'}
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        /* ---------------- VIEW 2: DETAILED MOCK CERTIFICATE DISPLAY ---------------- */
        <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button
            onClick={() => setSelectedCertCourse(null)}
            style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            <ArrowLeft size={14} /> Back to Profile
          </button>

          {/* Certificate Mockup Canvas */}
          <div className="mobile-card" style={{
            background: 'linear-gradient(135deg, #fffcf4 0%, #fff8e8 100%)',
            border: '6px double var(--secondary-color)',
            borderRadius: '8px',
            padding: '24px 16px',
            color: '#1a1a1a',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <span style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: 800, color: 'var(--secondary-color)' }}>CERTIFICATE OF COMPLETION</span>
            
            <div style={{ height: '2px', background: 'var(--secondary-color)', width: '60px', margin: '0 auto' }} />

            <span style={{ fontSize: '11px', fontStyle: 'italic', color: '#666' }}>This is proudly presented to</span>
            <strong style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'serif' }}>Omar Hassan</strong>
            
            <span style={{ fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
              for successfully completing all modules, quizzes, and practical requirements for the course
            </span>

            <strong style={{ fontSize: '14px', color: 'var(--primary-color)' }}>{selectedCertCourse.title}</strong>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px', fontSize: '10px', color: '#666' }}>
              <div>
                <span style={{ display: 'block', textDecoration: 'underline' }}>Sarah J.</span>
                <strong>Course Instructor</strong>
              </div>
              <div>
                <span style={{ display: 'block', textDecoration: 'underline' }}>SmartEdu Board</span>
                <strong>Academic Director</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert("PDF Download initiated. Check your device download folders.")}
            className="mobile-btn-primary click-press"
            style={{ width: '100%' }}
          >
            <Download size={14} /> Download PDF Certificate
          </button>
        </div>
      )}

    </div>
  );
}
