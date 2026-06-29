import React, { useState, useEffect } from 'react';
import { 
  Award, Key, Eye, EyeOff, Settings, Check, Download, 
  ArrowLeft, Sun, Moon, Volume2, User, CreditCard, BarChart3, 
  ChevronRight, Save, Clock, Target, Calendar, HelpCircle, MessageSquare
} from 'lucide-react';
import VerificationBadge from '../../components/VerificationBadge';

export default function Profile({ 
  db, 
  setDb, 
  apiKey, 
  setApiKey, 
  theme, 
  setTheme, 
  user,
  setUser 
}) {
  const { courses = [] } = db;
  const [activeTab, setActiveTab] = useState('account'); // 'account', 'billing', 'performance', 'settings'

  // Account Tab States
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '+60 12-345 6789');
  const [locationInput, setLocationInput] = useState(user?.location || 'Kuala Lumpur, MY');
  const [bioInput, setBioInput] = useState(user?.bio || 'Passionate learner preparing for examinations.');
  const [avatarInput, setAvatarInput] = useState(user?.avatar || '');

  // Performance Tab States
  const [targetExam, setTargetExam] = useState(() => localStorage.getItem('suriatech_profile_target_exam') || 'SAT Math Mastery');
  const [targetScore, setTargetScore] = useState(() => localStorage.getItem('suriatech_profile_target_score') || '1500');
  const [examDate, setExamDate] = useState(() => localStorage.getItem('suriatech_profile_exam_date') || '2026-08-15');
  const [weeklyStudyHours, setWeeklyStudyHours] = useState(() => Number(localStorage.getItem('suriatech_profile_weekly_hours') || '6.5'));
  const [weeklyGoal, setWeeklyGoal] = useState(() => Number(localStorage.getItem('suriatech_profile_weekly_goal') || '10'));

  // Key / Settings States
  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);

  // Certificate Viewer State
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);

  const completedCourses = courses.filter(c => c.progress === 100);

  // Save Account Handler
  const handleSaveAccount = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: nameInput,
      email: emailInput,
      phone: phoneInput,
      location: locationInput,
      bio: bioInput,
      avatar: avatarInput
    };
    if (setUser) {
      setUser(updatedUser);
    }
    localStorage.setItem('suriatech_mobile_user', JSON.stringify(updatedUser));
    alert("Profile settings saved successfully!");
  };

  // Save Key Handler
  const handleSaveKey = (e) => {
    e.preventDefault();
    setApiKey(keyInput);
    setIsEditingKey(false);
    alert("Gemini API Key saved successfully!");
  };

  // Save Goals Handler
  const handleSaveGoals = (e) => {
    e.preventDefault();
    localStorage.setItem('suriatech_profile_target_exam', targetExam);
    localStorage.setItem('suriatech_profile_target_score', targetScore);
    localStorage.setItem('suriatech_profile_exam_date', examDate);
    localStorage.setItem('suriatech_profile_weekly_goal', weeklyGoal.toString());
    alert("Learning targets and goals updated!");
  };

  // Log study session
  const handleLogStudyTime = () => {
    const nextHours = Math.min(weeklyGoal * 2, weeklyStudyHours + 1);
    setWeeklyStudyHours(nextHours);
    localStorage.setItem('suriatech_profile_weekly_hours', nextHours.toString());
  };

  // Calculate days countdown
  const getDaysRemaining = () => {
    const diff = new Date(examDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (selectedCertCourse) {
    return (
      <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
        <button
          onClick={() => setSelectedCertCourse(null)}
          style={{ 
            alignSelf: 'flex-start', background: 'none', border: 'none', 
            color: 'var(--text-primary)', fontWeight: 800, display: 'flex', 
            alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '12px' 
          }}
        >
          <ArrowLeft size={14} /> Back to Profile
        </button>

        {/* Certificate Mockup Canvas */}
        <div style={{
          background: 'linear-gradient(135deg, #fffcf4 0%, #fff8e8 100%)',
          border: '6px double var(--secondary-color)',
          borderRadius: '12px',
          padding: '28px 16px',
          color: '#1b1b1b',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: 800, color: 'var(--secondary-color)' }}>
            CERTIFICATE OF COMPLETION
          </span>
          <div style={{ height: '2px', background: 'var(--secondary-color)', width: '60px', margin: '0 auto' }} />
          <span style={{ fontSize: '11px', fontStyle: 'italic', color: '#666' }}>This is proudly presented to</span>
          <strong style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'serif', color: '#1a1a1a' }}>
            {user?.name || 'Omar Hassan'}
          </strong>
          <span style={{ fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
            for successfully completing all modules, quizzes, and practical requirements for the course
          </span>
          <strong style={{ fontSize: '14px', color: 'var(--primary-color)' }}>
            {selectedCertCourse.title}
          </strong>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '14px', fontSize: '10px', color: '#666' }}>
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
          className="click-press"
          style={{ 
            width: '100%', padding: '12px', borderRadius: '12px', border: 'none',
            background: 'var(--primary-color)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
          }}
        >
          <Download size={14} /> Download PDF Certificate
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }} className="animate-fade-in">
      
      {/* SaaS Profile Banner Header */}
      <div style={{ 
        background: '#fff', 
        borderRadius: '16px', 
        border: '1px solid #ede9f4', 
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(58,32,72,0.02)'
      }}>
        {/* Banner color overlay */}
        <div style={{ 
          height: '70px', 
          background: 'linear-gradient(135deg, var(--primary-color) 0%, #3a2048 100%)' 
        }} />

        {/* Profile Card details */}
        <div style={{ padding: '14px', marginTop: '-35px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <img
            src={avatarInput || user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200"}
            alt="Avatar"
            style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              border: '3px solid #fff', 
              background: '#fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
            }}
          />

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {user?.name || 'Omar Hassan'}
              </h3>
              <VerificationBadge status={user?.role} size={12} />
            </div>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 600 }}>
              {user?.role === 'super-admin' ? 'Super Admin' : user?.role === 'admin' ? 'Admin Access' : 'Pro Student Member'}
            </span>
          </div>
        </div>
      </div>

      {/* SaaS Sub-Tabs scrolling navigation bar */}
      <div style={{ 
        display: 'flex', 
        gap: '6px', 
        overflowX: 'auto', 
        paddingBottom: '2px'
      }} className="hide-scrollbar">
        {[
          { id: 'account', label: 'Account', icon: User },
          { id: 'billing', label: 'Billing', icon: CreditCard },
          { id: 'performance', label: 'Performance', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map(t => {
          const isActive = activeTab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="click-press"
              style={{
                flex: '0 0 auto',
                padding: '6px 12px',
                borderRadius: '12px',
                border: isActive ? '1px solid var(--primary-color)' : '1px solid #ede9f4',
                background: isActive ? 'rgba(124, 58, 237, 0.06)' : '#fff',
                color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Icon size={12} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── TAB CONTENT ─── */}

      {/* 1. Account Settings Tab */}
      {activeTab === 'account' && (
        <form onSubmit={handleSaveAccount} style={{ 
          background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4', padding: '14px',
          display: 'flex', flexDirection: 'column', gap: '12px' 
        }} className="animate-fade-in">
          <h4 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Account Settings</h4>
          
          <div>
            <label style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Full Name</label>
            <input 
              type="text" 
              value={nameInput} 
              onChange={e => setNameInput(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #ede9f4', borderRadius: '8px', background: '#faf9fc', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Email Address</label>
            <input 
              type="email" 
              value={emailInput} 
              onChange={e => setEmailInput(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #ede9f4', borderRadius: '8px', background: '#faf9fc', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Phone</label>
              <input 
                type="text" 
                value={phoneInput} 
                onChange={e => setPhoneInput(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #ede9f4', borderRadius: '8px', background: '#faf9fc', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Location</label>
              <input 
                type="text" 
                value={locationInput} 
                onChange={e => setLocationInput(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #ede9f4', borderRadius: '8px', background: '#faf9fc', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Profile Image URL</label>
            <input 
              type="text" 
              value={avatarInput} 
              onChange={e => setAvatarInput(e.target.value)}
              placeholder="Paste custom avatar URL link"
              style={{ width: '100%', padding: '8px 10px', fontSize: '11px', border: '1px solid #ede9f4', borderRadius: '8px', background: '#faf9fc', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>User Bio</label>
            <textarea 
              value={bioInput} 
              onChange={e => setBioInput(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #ede9f4', borderRadius: '8px', background: '#faf9fc', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          <button 
            type="submit" 
            className="click-press"
            style={{ 
              padding: '10px', borderRadius: '10px', border: 'none',
              background: 'var(--primary-color)', color: '#fff',
              fontSize: '11.5px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
              marginTop: '4px'
            }}
          >
            <Save size={13} />
            <span>Save Profile Settings</span>
          </button>
        </form>
      )}

      {/* 2. Billing & Membership Tab */}
      {activeTab === 'billing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-in">
          {/* Plan Info Card */}
          <div style={{ 
            background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4', padding: '14px',
            display: 'flex', flexDirection: 'column', gap: '10px' 
          }}>
            <span style={{ fontSize: '9px', fontWeight: 800, color: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '3px 8px', borderRadius: '8px', width: 'fit-content' }}>
              PRO ACCESS ACTIVE
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>Student Accelerator Plus</h4>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Auto-renews on July 24, 2026</span>
              </div>
              <strong style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-color)' }}>$29/mo</strong>
            </div>

            <div style={{ borderTop: '1px solid #ede9f4', paddingTop: '10px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CreditCard size={12} />
                <span>Visa ending in 4242</span>
              </span>
              <button 
                onClick={() => alert("Payment method updates are managed via Stripe. Redirection sandbox initiated.")}
                style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '10px', fontWeight: 700, cursor: 'pointer', padding: '2px' }}
              >
                Change Card
              </button>
            </div>
          </div>

          {/* Billing Invoice history list */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4', padding: '14px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Billing Statements</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { inv: 'INV-2026-004', date: 'Jun 24, 2026', price: '$29.00' },
                { inv: 'INV-2026-003', date: 'May 24, 2026', price: '$29.00' },
                { inv: 'INV-2026-002', date: 'Apr 24, 2026', price: '$29.00' }
              ].map(bill => (
                <div key={bill.inv} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', border: '1px solid #ede9f4', borderRadius: '8px', background: '#faf9fc', fontSize: '11px' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{bill.inv}</strong>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{bill.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{bill.price}</span>
                    <button 
                      onClick={() => alert("Downloading receipt pdf...")}
                      style={{ border: 'none', background: 'none', padding: '2px', cursor: 'pointer', color: 'var(--primary-color)' }}
                    >
                      <Download size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Performance / Stats Tab */}
      {activeTab === 'performance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-in">
          
          {/* Target Exam Countdown Goal Setter */}
          <form onSubmit={handleSaveGoals} style={{ 
            background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4', padding: '14px',
            display: 'flex', flexDirection: 'column', gap: '10px' 
          }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, margin: '0', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Target size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Exam Targets & Goals</span>
            </h4>

            {/* Countdown Display */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(58, 32, 72, 0.08) 100%)',
              border: '1px solid rgba(124, 58, 237, 0.15)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              marginTop: '4px'
            }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-color)' }}>
                {getDaysRemaining()} Days Left
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                until your target {targetExam || 'Exam'} ({targetScore || 'Score'} Goal)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
              <div>
                <label style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>Target Exam</label>
                <input 
                  type="text" 
                  value={targetExam} 
                  onChange={e => setTargetExam(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '11px', border: '1px solid #ede9f4', borderRadius: '6px', background: '#faf9fc', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>Target Score</label>
                <input 
                  type="text" 
                  value={targetScore} 
                  onChange={e => setTargetScore(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '11px', border: '1px solid #ede9f4', borderRadius: '6px', background: '#faf9fc', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>Target Date</label>
              <input 
                type="date" 
                value={examDate} 
                onChange={e => setExamDate(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: '11px', border: '1px solid #ede9f4', borderRadius: '6px', background: '#faf9fc', boxSizing: 'border-box' }}
              />
            </div>

            <button 
              type="submit" 
              className="click-press"
              style={{
                width: '100%', padding: '8px', border: 'none', background: '#f1edf5',
                color: 'var(--primary-color)', fontSize: '10.5px', fontWeight: 700,
                borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px'
              }}
            >
              <Save size={11} /> Save Exam Target
            </button>
          </form>

          {/* Interactive Study Hour Tracker */}
          <div style={{ 
            background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4', padding: '14px',
            display: 'flex', flexDirection: 'column', gap: '10px' 
          }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, margin: '0', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Weekly Syllabus Study Tracker</span>
            </h4>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                <span>Weekly Hours Goal</span>
                <span>{weeklyStudyHours} / {weeklyGoal} Hours</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#ede9f4', borderRadius: '3px', overflow: 'hidden', marginBottom: '4px' }}>
                <div style={{ 
                  width: `${Math.min(100, (weeklyStudyHours / weeklyGoal) * 100)}%`, 
                  height: '100%', 
                  background: 'var(--primary-color)', 
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '8.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Adjust Goal (Hours)</label>
                <input 
                  type="number" 
                  min={1} 
                  max={40} 
                  value={weeklyGoal} 
                  onChange={e => setWeeklyGoal(Number(e.target.value))}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '11px', border: '1px solid #ede9f4', borderRadius: '6px', background: '#faf9fc', boxSizing: 'border-box' }}
                />
              </div>
              <button 
                onClick={handleLogStudyTime}
                className="click-press"
                style={{
                  flex: 1.5, border: 'none', background: 'var(--primary-color)',
                  color: '#fff', fontSize: '10.5px', fontWeight: 700,
                  borderRadius: '8px', cursor: 'pointer', alignSelf: 'flex-end', height: '28px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                }}
              >
                <span>+ Log 1 Hour</span>
              </button>
            </div>
          </div>

          {/* Quick learning progress statistics card */}
          <div style={{ background: '#fff', border: '1px solid #ede9f4', borderRadius: '16px', padding: '14px' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Syllabus Course Progress</span>
            <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>67% Overall Completed</strong>
          </div>

          {/* Earned Certificates links */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4', padding: '14px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              Syllabus Certificates
            </h4>
            {completedCourses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {completedCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCertCourse(c)}
                    className="click-press"
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px',
                      border: '1px solid #ede9f4', background: '#faf9fc',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award size={14} style={{ color: 'var(--secondary-color)' }} />
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{c.title} Certificate</span>
                    </div>
                    <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />
                  </button>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                No courses completed yet. Finish a course to 100% to generate official credential links.
              </p>
            )}
          </div>

        </div>
      )}

      {/* 4. Settings Configuration Tab */}
      {activeTab === 'settings' && (
        <div style={{ 
          background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4', padding: '14px',
          display: 'flex', flexDirection: 'column', gap: '12px' 
        }} className="animate-fade-in">
          
          <h4 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Settings Configuration</h4>

          {/* Theme Mode Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />} Dark Theme Mode
            </span>
            <button
              onClick={() => {
                const nextTheme = theme === 'light' ? 'dark' : 'light';
                setTheme(nextTheme);
                document.documentElement.setAttribute('data-theme', nextTheme);
              }}
              className="click-press"
              style={{
                padding: '4px 10px', borderRadius: '12px',
                border: '1px solid #ede9f4', backgroundColor: '#faf9fc',
                color: 'var(--text-primary)', fontSize: '10.5px', fontWeight: 800, cursor: 'pointer'
              }}
            >
              {theme === 'light' ? 'Disabled' : 'Enabled'}
            </button>
          </div>

          {/* Study reminder toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-primary)' }}>
              <Volume2 size={14} /> Reminders & Notifications
            </span>
            <button
              onClick={() => setPushAlerts(!pushAlerts)}
              className="click-press"
              style={{
                padding: '4px 10px', borderRadius: '12px',
                border: '1px solid #ede9f4', backgroundColor: '#faf9fc',
                color: 'var(--text-primary)', fontSize: '10.5px', fontWeight: 800, cursor: 'pointer'
              }}
            >
              {pushAlerts ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Custom API Key Form */}
          <div style={{ borderTop: '1px solid #ede9f4', paddingTop: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                <Key size={14} /> Gemini Developer Key
              </span>
              <button
                onClick={() => setIsEditingKey(!isEditingKey)}
                style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
              >
                {isEditingKey ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditingKey ? (
              <form onSubmit={handleSaveKey} style={{ display: 'flex', gap: '6px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type={showKey ? 'text' : 'password'}
                    placeholder="AIzaSy..."
                    value={keyInput}
                    onChange={e => setKeyInput(e.target.value)}
                    style={{ 
                      width: '100%', height: '32px', padding: '0 32px 0 8px', fontSize: '11px', 
                      border: '1px solid #ede9f4', borderRadius: '8px', background: '#faf9fc', 
                      outline: 'none', boxSizing: 'border-box' 
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    style={{ 
                      position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', 
                      background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                      padding: '2px'
                    }}
                  >
                    {showKey ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="click-press" 
                  style={{ 
                    height: '32px', padding: '0 12px', borderRadius: '8px', fontSize: '11px', 
                    fontWeight: 700, border: 'none', background: 'var(--primary-color)', color: '#fff',
                    cursor: 'pointer' 
                  }}
                >
                  Save
                </button>
              </form>
            ) : (
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                {apiKey ? '••••••••••••••••' : 'No developer key set'}
              </span>
            )}
          </div>

          {/* Help & Customer Support Desk Section */}
          <div style={{ borderTop: '1px solid #ede9f4', paddingTop: '12px', marginTop: '4px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HelpCircle size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Help &amp; Customer Support</span>
            </h4>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
              Have questions or run into technical issues? Open a support ticket below or read our user guide.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => alert("Creating a Support Ticket...\nTicket logged successfully! Our team will contact you shortly.")}
                className="click-press"
                style={{
                  flex: 1, padding: '8px 0', fontSize: '10.5px', fontWeight: 700,
                  borderRadius: '8px', border: 'none', background: 'var(--primary-color)', color: '#fff',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                }}
              >
                <MessageSquare size={11} /> Support Ticket
              </button>
              <button 
                onClick={() => alert("Opening Help Documentation...")}
                className="click-press"
                style={{
                  flex: 1, padding: '8px 0', fontSize: '10.5px', fontWeight: 700,
                  borderRadius: '8px', border: '1px solid #ede9f4', background: '#fff', color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                User Guide
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
