import React, { useState } from 'react';
import {
  Video, Plus, Calendar as CalendarIcon, Clock, Users, BarChart2, Star,
  Search, Check, Globe, CheckCircle, AlertCircle,
  PlayCircle, Eye, ChevronRight, Layers, Edit3, Trash2, X
} from 'lucide-react';

const cardStyle = {
  background: '#fff', borderRadius: '16px',
  border: '1px solid #ede9f4', padding: '16px',
  display: 'flex', flexDirection: 'column', gap: '12px'
};

const inputStyle = {
  width: '100%', padding: '10px 12px', fontSize: '13px',
  border: '1px solid #ede9f4', borderRadius: '10px',
  background: '#faf9fc', color: 'var(--text-primary)',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
};

const labelStyle = {
  fontSize: '10px', fontWeight: 700,
  color: 'var(--text-secondary)', display: 'block', marginBottom: '5px'
};

export default function ClassScheduler({ classes, setClasses, courses, activeTab, setActiveTab }) {
  const [wizardStep, setWizardStep] = useState(1);
  const [dashboardTab, setDashboardTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Wizard Form States
  const [classTitle, setClassTitle] = useState('');
  const [teacherName, setTeacherName] = useState('Dr. Ahmed Al-Hassan');
  const [classCategory, setClassCategory] = useState('Scholarship Exams');
  const [classLevel, setClassLevel] = useState('Advanced');
  const [classLanguage, setClassLanguage] = useState('English');
  const [classDescription, setClassDescription] = useState('');
  const [classDate, setClassDate] = useState('');
  const [startTime, setStartTime] = useState('06:00 PM');
  const [endTime, setEndTime] = useState('07:30 PM');
  const [recordClass, setRecordClass] = useState(true);
  const [enableChat, setEnableChat] = useState(true);

  // Dummy class data
  const [mockClasses] = useState([
    { id: 'mc-1', title: 'SAT Math Mastery Live', teacher: 'Dr. Ahmed Al-Hassan', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80', rating: 4.9, reviews: 210, category: 'Scholarship', date: 'Jun 24', time: '6:00 PM - 7:30 PM', participants: 245, max: 300, status: 'Live Now', color: '#7c3aed', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=300&q=80' },
    { id: 'mc-2', title: 'IELTS Speaking Practice', teacher: 'Ms. Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80', rating: 4.8, reviews: 180, category: 'Language', date: 'Jun 24', time: '8:00 PM - 9:00 PM', participants: 178, max: 250, status: 'Upcoming', color: '#3b82f6', thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80' },
    { id: 'mc-3', title: 'TOEFL Writing Workshop', teacher: 'Ms. Lisa Park', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', rating: 4.9, reviews: 156, category: 'Language', date: 'Jun 25', time: '7:00 PM - 8:30 PM', participants: 210, max: 250, status: 'Upcoming', color: '#3b82f6', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80' },
    { id: 'mc-4', title: 'GRE Quantitative Strategies', teacher: 'Dr. Michael Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', rating: 4.8, reviews: 142, category: 'Graduate', date: 'Jun 26', time: '6:00 PM - 7:30 PM', participants: 156, max: 200, status: 'Upcoming', color: '#f59e0b', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=300&q=80' },
    { id: 'mc-5', title: 'Essay Writing Excellence', teacher: 'Mr. James Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', rating: 4.7, reviews: 120, category: 'Academic', date: 'Jun 22', time: '6:00 PM - 7:30 PM', participants: 198, max: 200, status: 'Completed', color: '#10b981', thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=300&q=80' },
    { id: 'mc-6', title: 'Arabic Language Basics', teacher: 'Ms. Fatima Al-Zahra', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=100&q=80', rating: 4.9, reviews: 98, category: 'Language', date: 'Jun 21', time: '7:00 PM - 8:00 PM', participants: 132, max: 150, status: 'Completed', color: '#8b5cf6', thumbnail: 'https://images.unsplash.com/photo-1566418705663-e39d33b82143?auto=format&fit=crop&w=300&q=80' },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Live Now': return { bg: 'rgba(239,68,68,0.08)', color: '#ef4444', dot: '#ef4444' };
      case 'Upcoming': return { bg: 'rgba(59,130,246,0.08)', color: '#3b82f6', dot: '#3b82f6' };
      case 'Completed': return { bg: 'rgba(16,185,129,0.08)', color: '#10b981', dot: '#10b981' };
      default: return { bg: '#f5f3f9', color: 'var(--text-muted)', dot: '#94a3b8' };
    }
  };

  const filteredClasses = mockClasses.filter(c => {
    if (dashboardTab === 'Live' && c.status !== 'Live Now') return false;
    if (dashboardTab === 'Upcoming' && c.status !== 'Upcoming') return false;
    if (dashboardTab === 'Completed' && c.status !== 'Completed') return false;
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handlePublish = () => {
    if (!classTitle.trim()) return;
    const newClass = {
      id: `class-${Date.now()}`, title: classTitle, teacher: teacherName,
      courseId: 'course-1', time: startTime.split(' ')[0],
      ampm: startTime.split(' ')[1]?.toLowerCase() || 'pm',
      date: '2026-06-24', dateLabel: 'Upcoming', isLive: false
    };
    if (setClasses && classes) setClasses([newClass, ...classes]);
    setActiveTab('live-classes');
    setWizardStep(1);
    setClassTitle(''); setClassDescription('');
  };

  // ── Schedule Wizard ──────────────────────────────────────────
  if (activeTab === 'schedule-class') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Schedule a Class</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Create a new live session for your students</p>
        </div>

        {/* Progress Steps */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {['Details', 'Schedule', 'Settings'].map((label, i) => {
            const step = i + 1;
            const isActive = wizardStep === step;
            const isDone = wizardStep > step;
            return (
              <button key={label} onClick={() => setWizardStep(step)} className="click-press"
                style={{ flex: 1, padding: '8px 4px', borderRadius: '10px', border: 'none', fontSize: '10px', fontWeight: 700, cursor: 'pointer',
                  background: isActive ? 'var(--primary-color)' : isDone ? 'rgba(16,185,129,0.1)' : '#f5f3f9',
                  color: isActive ? '#fff' : isDone ? '#10b981' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                }}>
                {isDone ? <Check size={10} /> : <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: isActive ? 'rgba(255,255,255,0.2)' : '#ede9f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800 }}>{step}</span>}
                {label}
              </button>
            );
          })}
        </div>

        {/* Step 1: Details */}
        {wizardStep === 1 && (
          <div style={cardStyle}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Video size={14} style={{ color: 'var(--primary-color)' }} /> Class Details
            </h4>
            <div>
              <label style={labelStyle}>Class Title *</label>
              <input type="text" value={classTitle} onChange={e => setClassTitle(e.target.value)} style={inputStyle} placeholder="e.g. SAT Math Advanced Session" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Teacher</label>
                <select value={teacherName} onChange={e => setTeacherName(e.target.value)} style={inputStyle}>
                  <option>Dr. Ahmed Al-Hassan</option><option>Ms. Sarah Johnson</option><option>Dr. Michael Chen</option><option>Ms. Lisa Park</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={classCategory} onChange={e => setClassCategory(e.target.value)} style={inputStyle}>
                  <option>Scholarship Exams</option><option>Language Tests</option><option>Academic</option><option>STEM</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Level</label>
                <select value={classLevel} onChange={e => setClassLevel(e.target.value)} style={inputStyle}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All Levels</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Language</label>
                <select value={classLanguage} onChange={e => setClassLanguage(e.target.value)} style={inputStyle}>
                  <option>English</option><option>Arabic</option><option>Malay</option><option>French</option>
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea value={classDescription} onChange={e => setClassDescription(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} placeholder="Brief description of this live class..." />
            </div>
            <button onClick={() => setWizardStep(2)} className="click-press"
              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              Continue <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2: Schedule */}
        {wizardStep === 2 && (
          <div style={cardStyle}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarIcon size={14} style={{ color: 'var(--primary-color)' }} /> Date & Time
            </h4>
            <div>
              <label style={labelStyle}>Date *</label>
              <input type="date" value={classDate} onChange={e => setClassDate(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Start Time</label>
                <select value={startTime} onChange={e => setStartTime(e.target.value)} style={inputStyle}>
                  {['04:00 PM','04:30 PM','05:00 PM','05:30 PM','06:00 PM','06:30 PM','07:00 PM','07:30 PM','08:00 PM','08:30 PM','09:00 PM'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>End Time</label>
                <select value={endTime} onChange={e => setEndTime(e.target.value)} style={inputStyle}>
                  {['05:00 PM','05:30 PM','06:00 PM','06:30 PM','07:00 PM','07:30 PM','08:00 PM','08:30 PM','09:00 PM','09:30 PM','10:00 PM'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ background: '#f5f3f9', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <Clock size={14} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
              <span>Duration: <strong style={{ color: 'var(--text-primary)' }}>90 minutes</strong> • Timezone: GMT +3</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setWizardStep(1)} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #ede9f4', background: '#fff', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }} className="click-press">Back</button>
              <button onClick={() => setWizardStep(3)} className="click-press"
                style={{ flex: 2, padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                Continue <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Settings & Publish */}
        {wizardStep === 3 && (
          <div style={cardStyle}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} style={{ color: 'var(--primary-color)' }} /> Class Settings
            </h4>

            {/* Toggle Settings */}
            {[
              { label: 'Record Class Automatically', value: recordClass, set: setRecordClass },
              { label: 'Enable Live Chat', value: enableChat, set: setEnableChat },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f3f9' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                <button onClick={() => item.set(!item.value)} style={{ width: '40px', height: '22px', borderRadius: '11px', border: 'none', background: item.value ? '#10b981' : '#ede9f4', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: item.value ? '21px' : '3px', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                </button>
              </div>
            ))}

            {/* Summary card */}
            <div style={{ background: '#f5f3f9', borderRadius: '10px', padding: '12px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Summary</span>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Title</span>
                <strong style={{ color: 'var(--text-primary)' }}>{classTitle || 'Not set'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Teacher</span>
                <strong style={{ color: 'var(--text-primary)' }}>{teacherName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Date & Time</span>
                <strong style={{ color: 'var(--text-primary)' }}>{classDate || 'Not set'} • {startTime}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setWizardStep(2)} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #ede9f4', background: '#fff', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }} className="click-press">Back</button>
              <button onClick={handlePublish} className="click-press"
                style={{ flex: 2, padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Check size={14} /> Publish Class
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Recordings View ──────────────────────────────────────────
  if (activeTab === 'class-recordings') {
    const recordings = [
      { title: 'SAT Math Mastery - Session 12', teacher: 'Dr. Ahmed Al-Hassan', date: 'Jun 20', duration: '1h 28m', views: 342 },
      { title: 'IELTS Speaking - Practice Set 8', teacher: 'Ms. Sarah Johnson', date: 'Jun 19', duration: '58m', views: 256 },
      { title: 'GRE Quantitative - Mock Test Review', teacher: 'Dr. Michael Chen', date: 'Jun 18', duration: '1h 32m', views: 189 },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Class Recordings</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Archived recordings from completed sessions</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recordings.map((rec, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PlayCircle size={18} style={{ color: '#7c3aed' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{rec.title}</h4>
                  <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>{rec.teacher} • {rec.date}</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f3f9', paddingTop: '8px' }}>
                <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {rec.duration}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Eye size={10} /> {rec.views} views</span>
                </div>
                <button className="click-press" style={{ padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'var(--primary-glow)', color: 'var(--primary-color)', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Watch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Categories View ──────────────────────────────────────────
  if (activeTab === 'live-categories') {
    const cats = [
      { name: 'Scholarship Exams', count: 12, color: '#7c3aed' },
      { name: 'Language Tests', count: 8, color: '#3b82f6' },
      { name: 'Graduate Exams', count: 6, color: '#f59e0b' },
      { name: 'Academic Success', count: 4, color: '#10b981' },
      { name: 'Professional Certs', count: 3, color: '#ef4444' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Live Class Categories</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Organize live sessions by category</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {cats.map((cat, i) => (
            <div key={i} style={{ ...cardStyle, borderLeft: `4px solid ${cat.color}`, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{cat.name}</h4>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>{cat.count} classes scheduled</p>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Settings View ────────────────────────────────────────────
  if (activeTab === 'live-settings') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Live Class Settings</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Configure default settings for live sessions</p>
        </div>
        <div style={cardStyle}>
          {[
            { label: 'Auto-record all classes', defaultVal: true },
            { label: 'Enable waiting room', defaultVal: true },
            { label: 'Allow students to join early (15 min)', defaultVal: true },
            { label: 'Send reminder emails', defaultVal: true },
            { label: 'Enable Q&A during sessions', defaultVal: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid #f5f3f9' : 'none' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
              <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: item.defaultVal ? '#10b981' : '#ede9f4', position: 'relative' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: item.defaultVal ? '21px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Dashboard View (default) ─────────────────────────────────
  const stats = [
    { label: 'Total Classes', value: '248', icon: CalendarIcon, color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
    { label: 'Upcoming', value: '32', icon: Video, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    { label: 'Participants', value: '14.6K', icon: Users, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
    { label: 'Watch Hours', value: '2,450', icon: Clock, color: '#ec4899', bg: 'rgba(236,72,153,0.08)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Live Classes</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Manage and schedule live sessions</p>
        </div>
        <button onClick={() => setActiveTab('schedule-class')} className="click-press"
          style={{ padding: '8px 12px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Plus size={12} /> New Class
        </button>
      </div>

      {/* Stats Row - 2x2 grid for mobile */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} style={{ ...cardStyle, padding: '12px', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={14} style={{ color: st.color }} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{st.value}</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)' }}>{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Tab Filters */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }} className="hide-scrollbar">
        {['All', 'Live', 'Upcoming', 'Completed'].map(tab => {
          const isActive = dashboardTab === tab;
          return (
            <button key={tab} onClick={() => setDashboardTab(tab)} className="click-press"
              style={{ flexShrink: 0, padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                border: isActive ? 'none' : '1px solid #ede9f4',
                background: isActive ? 'var(--primary-color)' : '#fff',
                color: isActive ? '#fff' : 'var(--text-secondary)'
              }}>
              {tab} {tab === 'Live' && '🔴'}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ ...inputStyle, paddingLeft: '32px' }} placeholder="Search classes..." />
      </div>

      {/* Class Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredClasses.length === 0 && (
          <div style={{ ...cardStyle, alignItems: 'center', padding: '30px 20px', textAlign: 'center' }}>
            <AlertCircle size={28} style={{ color: '#ede9f4' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>No classes found</p>
          </div>
        )}
        {filteredClasses.map(cls => {
          const statusStyle = getStatusStyle(cls.status);
          const pctFull = Math.round((cls.participants / cls.max) * 100);
          return (
            <div key={cls.id} style={cardStyle}>
              {/* Thumbnail */}
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', aspectRatio: '16/9' }}>
                <img src={cls.thumbnail} alt={cls.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '8px', left: '8px', padding: '3px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 700, background: statusStyle.bg, color: statusStyle.color, display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}>
                  {cls.status === 'Live Now' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />}
                  {cls.status}
                </span>
              </div>

              {/* Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={cls.avatar} alt={cls.teacher} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f5f3f9' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cls.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{cls.teacher}</span>
                    <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Star size={9} fill="#f59e0b" /> {cls.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f3f9', paddingTop: '8px' }}>
                <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><CalendarIcon size={10} /> {cls.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {cls.time}</span>
                </div>
              </div>

              {/* Participants bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{cls.participants}/{cls.max} enrolled</span>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>{pctFull}%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '2px', background: '#f5f3f9' }}>
                  <div style={{ height: '100%', borderRadius: '2px', background: pctFull > 90 ? '#ef4444' : 'var(--primary-color)', width: `${pctFull}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
