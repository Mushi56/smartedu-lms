import React, { useState } from 'react';
import { Video, Plus, Calendar, Clock, Users, Play, X, Edit3, Trash2, Download } from 'lucide-react';

const inputStyle = { width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-input)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' };
const labelStyle = { fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' };

export default function TeacherLiveClasses({ db, setDb, user }) {
  const [activeView, setActiveView] = useState('upcoming');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', time: '', duration: '60 mins' });

  const classes = db?.classes || [];

  const mockRecordings = [
    { id: 'rec-1', title: 'SAT Trigonometry Practice', date: 'Jun 20, 2026', duration: '58 mins', views: 124 },
    { id: 'rec-2', title: 'IELTS Part 2 Cue Cards', date: 'Jun 18, 2026', duration: '42 mins', views: 89 }
  ];

  const views = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'recordings', label: 'Recordings' },
    { id: 'attendance', label: 'Attendance' }
  ];

  const handleScheduleClass = () => {
    if (!formData.title.trim() || !formData.time.trim()) return;
    const newClass = {
      id: `lc-${Date.now()}`,
      title: formData.title,
      teacher: user?.name || 'Instructor',
      time: formData.time,
      duration: formData.duration || '60 mins',
      isLive: false
    };
    if (setDb) {
      setDb(prev => ({
        ...prev,
        classes: [newClass, ...(prev.classes || [])],
        notifications: [
          { id: `not-${Date.now()}`, text: `📅 New live class scheduled: "${formData.title}" at ${formData.time}`, time: 'Just now', read: false },
          ...(prev.notifications || [])
        ]
      }));
    }
    setFormData({ title: '', time: '', duration: '60 mins' });
    setShowForm(false);
  };

  const handleDeleteClass = (id) => {
    if (setDb) {
      setDb(prev => ({ ...prev, classes: (prev.classes || []).filter(c => c.id !== id) }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Live Classes</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Schedule and manage your live sessions</p>
        </div>
        <button className="btn-primary click-press" style={{ fontSize: '11px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <><X size={13} /> Cancel</> : <><Plus size={13} /> Schedule Class</>}
        </button>
      </div>

      {/* Schedule Form */}
      {showForm && (
        <div className="smart-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Schedule New Class</h3>
          <div>
            <label style={labelStyle}>Class Title *</label>
            <input 
              style={inputStyle} 
              placeholder="e.g. SAT Algebra Practice Session"
              value={formData.title} 
              onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Time *</label>
              <input 
                style={inputStyle} 
                placeholder="e.g. 06:00 PM"
                value={formData.time} 
                onChange={(e) => setFormData(p => ({ ...p, time: e.target.value }))} 
              />
            </div>
            <div>
              <label style={labelStyle}>Duration</label>
              <select 
                style={inputStyle}
                value={formData.duration} 
                onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))}
              >
                <option>30 mins</option>
                <option>45 mins</option>
                <option>60 mins</option>
                <option>90 mins</option>
                <option>120 mins</option>
              </select>
            </div>
          </div>
          <button 
            className="btn-primary click-press" 
            style={{ fontSize: '12px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%' }}
            onClick={handleScheduleClass}
          >
            <Calendar size={14} /> Schedule Class
          </button>
        </div>
      )}

      {/* View Tabs */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {views.map(v => (
          <button key={v.id} onClick={() => setActiveView(v.id)} className="click-press"
            style={{ padding: '8px 16px', borderRadius: '16px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', border: 'none',
              backgroundColor: activeView === v.id ? '#37123c' : '#f0ecf4', color: activeView === v.id ? '#fff' : '#1e0926'
            }}
          >{v.label}</button>
        ))}
      </div>

      {/* Upcoming Classes */}
      {activeView === 'upcoming' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {classes.length === 0 ? (
            <div className="smart-card" style={{ padding: '30px', textAlign: 'center' }}>
              <Video size={28} style={{ color: '#d1d5db', marginBottom: '8px' }} />
              <p style={{ fontSize: '12px', color: '#8c7f94', fontWeight: 600 }}>No upcoming classes. Schedule one above!</p>
            </div>
          ) : classes.map(cls => (
            <div key={cls.id} className="smart-card" style={{ padding: '16px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: cls.isLive ? 'rgba(239,68,68,0.1)' : 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Video size={18} style={{ color: cls.isLive ? '#ef4444' : '#7c3aed' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>{cls.title}</h4>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: '#8c7f94', marginTop: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Calendar size={10} /> Today</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {cls.time}</span>
                  </div>
                </div>
                {cls.isLive && <span style={{ fontSize: '8px', fontWeight: 800, color: '#fff', background: '#ef4444', padding: '3px 10px', borderRadius: '10px' }}>LIVE NOW</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {cls.isLive ? (
                  <button className="btn-primary click-press" style={{ flex: 1, fontSize: '11px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Play size={13} /> Start Class
                  </button>
                ) : (
                  <>
                    <button className="click-press" style={{ flex: 1, fontSize: '11px', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Edit3 size={12} /> Edit
                    </button>
                    <button onClick={() => handleDeleteClass(cls.id)} className="click-press" style={{ fontSize: '11px', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.06)', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recordings */}
      {activeView === 'recordings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mockRecordings.map(rec => (
            <div key={rec.id} className="smart-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={16} style={{ color: '#7c3aed' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>{rec.title}</h4>
                <span style={{ fontSize: '10px', color: '#8c7f94' }}>{rec.date} · {rec.duration} · {rec.views} views</span>
              </div>
              <button className="click-press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', padding: '4px' }}>
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Attendance */}
      {activeView === 'attendance' && (
        <div className="smart-card" style={{ padding: '24px', textAlign: 'center' }}>
          <Users size={32} style={{ color: '#d1d5db', marginBottom: '12px' }} />
          <p style={{ fontSize: '13px', color: '#8c7f94', fontWeight: 600 }}>Attendance reports will appear here after your classes</p>
          <p style={{ fontSize: '11px', color: '#a095a8' }}>Average attendance: 87% across all sessions</p>
        </div>
      )}
    </div>
  );
}
