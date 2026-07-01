import React, { useState } from 'react';
import { Volume2, Plus, Send, Trash2, X, Check, Bell, Users, BookOpen, GraduationCap, Clock, Pin, Edit3 } from 'lucide-react';

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

const fallbackAnnouncements = [
  { id: 'ann-1', title: 'Platform Maintenance Notice', body: 'SmartEdu will undergo scheduled maintenance on June 28, 2026 from 2:00 AM to 4:00 AM GMT. All services will be temporarily unavailable during this window.', audience: 'All Users', priority: 'High', date: 'Jun 22, 2026', pinned: true, icon: 'Bell' },
  { id: 'ann-2', title: 'New SAT Math Course Added', body: 'We are excited to announce the launch of SAT Math Advanced: Topics in Algebra and Statistics, now available for enrollment!', audience: 'Students', priority: 'Normal', date: 'Jun 20, 2026', pinned: false, icon: 'BookOpen' },
  { id: 'ann-3', title: 'Teacher Grading Deadline Reminder', body: 'All instructors must submit final grades and assessment scores for June batch students by June 30, 2026. Please ensure timely submission.', audience: 'Teachers', priority: 'High', date: 'Jun 18, 2026', pinned: false, icon: 'GraduationCap' },
  { id: 'ann-4', title: 'Summer Scholarship Applications Open', body: 'Applications for the 2026 SmartEdu Merit Scholarship are now open. Students maintaining above 85% in their enrolled courses are eligible to apply.', audience: 'Students', priority: 'Normal', date: 'Jun 15, 2026', pinned: false, icon: 'Bell' },
];

const audienceIcons = { 'All Users': Users, 'Students': GraduationCap, 'Teachers': BookOpen };
const priorityStyle = { 'High': { bg: 'rgba(239,68,68,0.08)', color: '#ef4444' }, 'Normal': { bg: 'rgba(99,102,241,0.08)', color: '#6366f1' } };

export default function AnnouncementsPage({ db, setDb }) {
  // Use shared db announcements if available, fallback to local
  const announcements = db?.announcements || fallbackAnnouncements;
  const setAnnouncements = (updater) => {
    if (setDb) {
      setDb(prev => ({
        ...prev,
        announcements: typeof updater === 'function' ? updater(prev.announcements || fallbackAnnouncements) : updater
      }));
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('All Users');
  const [priority, setPriority] = useState('Normal');
  const [sent, setSent] = useState(false);

  const resetForm = () => { setTitle(''); setBody(''); setAudience('All Users'); setPriority('Normal'); setShowForm(false); };

  const handleSend = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const newAnn = {
      id: `ann-${Date.now()}`, title, body, audience, priority,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      pinned: false, icon: 'Bell'
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    // Also push a notification so students/teachers see it
    if (setDb) {
      setDb(prev => ({
        ...prev,
        notifications: [
          { id: `not-${Date.now()}`, text: `📢 ${title}`, time: 'Just now', read: false },
          ...(prev.notifications || [])
        ]
      }));
    }
    resetForm();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const handleDelete = (id) => setAnnouncements(prev => prev.filter(a => a.id !== id));
  const handleTogglePin = (id) => setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));

  const sorted = [...announcements].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Announcements</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Broadcast messages to students and teachers</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Total', value: announcements.length, icon: Volume2, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
          { label: 'Pinned', value: announcements.filter(a => a.pinned).length, icon: Pin, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
          { label: 'High Priority', value: announcements.filter(a => a.priority === 'High').length, icon: Bell, color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
        ].map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} style={{ ...cardStyle, padding: '12px', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={13} style={{ color: st.color }} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{st.value}</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)' }}>{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Success toast */}
      {sent && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', fontSize: '11px', fontWeight: 600, color: '#10b981' }} className="animate-fade-in">
          <Check size={14} /> Announcement broadcast successfully!
        </div>
      )}

      {/* New Announcement Button / Form */}
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="click-press"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
          <Plus size={14} /> New Announcement
        </button>
      ) : (
        <div style={cardStyle} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Volume2 size={14} style={{ color: 'var(--primary-color)' }} /> Compose Announcement
            </h4>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Title *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="Announcement title..." required />
            </div>
            <div>
              <label style={labelStyle}>Message *</label>
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} placeholder="Type your message here..." required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Audience</label>
                <select value={audience} onChange={e => setAudience(e.target.value)} style={inputStyle}>
                  <option>All Users</option><option>Students</option><option>Teachers</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priority</label>
                <select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}>
                  <option>Normal</option><option>High</option>
                </select>
              </div>
            </div>
            <button type="submit" className="click-press"
              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Send size={14} /> Broadcast Now
            </button>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sorted.map(ann => {
          const AudienceIcon = audienceIcons[ann.audience] || Users;
          const pStyle = priorityStyle[ann.priority] || priorityStyle.Normal;
          return (
            <div key={ann.id} style={{ ...cardStyle, borderLeft: ann.pinned ? '4px solid #f59e0b' : '4px solid transparent' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Volume2 size={16} style={{ color: '#6366f1' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>{ann.title}</h4>
                    {ann.pinned && <span style={{ flexShrink: 0 }}><Pin size={12} style={{ color: '#f59e0b' }} /></span>}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', background: pStyle.bg, color: pStyle.color }}>{ann.priority}</span>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <AudienceIcon size={9} /> {ann.audience}
                    </span>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={9} /> {ann.date}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{ann.body}</p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid #f5f3f9', paddingTop: '8px' }}>
                <button onClick={() => handleTogglePin(ann.id)} className="click-press"
                  style={{ flex: 1, padding: '6px', borderRadius: '8px', background: ann.pinned ? 'rgba(245,158,11,0.08)' : '#f5f3f9', color: ann.pinned ? '#f59e0b' : 'var(--text-muted)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '11px', fontWeight: 600 }}>
                  <Pin size={11} /> {ann.pinned ? 'Unpin' : 'Pin'}
                </button>
                <button onClick={() => handleDelete(ann.id)} className="click-press"
                  style={{ flex: 1, padding: '6px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '11px', fontWeight: 600 }}>
                  <Trash2 size={11} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
