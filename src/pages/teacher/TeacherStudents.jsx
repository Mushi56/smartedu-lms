import React, { useState } from 'react';
import { Users, Search, TrendingUp, MessageCircle, Award, ChevronRight } from 'lucide-react';

export default function TeacherStudents({ db, user, setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');

  const students = [
    { id: 's1', name: 'Aisha Al-Otaibi', email: 'aisha@example.com', course: 'SAT Math Mastery', progress: 85, enrolled: 'Jan 15, 2026', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=60' },
    { id: 's2', name: 'Khalid Mansoor', email: 'khalid@example.com', course: 'Python for Beginners', progress: 62, enrolled: 'Feb 20, 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60' },
    { id: 's3', name: 'Maria Rodriguez', email: 'maria@example.com', course: 'IELTS Speaking Guide', progress: 94, enrolled: 'Mar 10, 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60' },
    { id: 's4', name: 'James Anderson', email: 'james@example.com', course: 'SAT Math Mastery', progress: 45, enrolled: 'Apr 5, 2026', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=60' },
    { id: 's5', name: 'Priya Patel', email: 'priya@example.com', course: 'Python for Beginners', progress: 100, enrolled: 'Dec 18, 2025', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60' }
  ];

  const filtered = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.course.toLowerCase().includes(searchQuery.toLowerCase()));

  const stats = [
    { label: 'Total Students', value: students.length, color: '#3b82f6' },
    { label: 'Completed', value: students.filter(s => s.progress === 100).length, color: '#22c55e' },
    { label: 'Avg Progress', value: `${Math.round(students.reduce((a, s) => a + s.progress, 0) / students.length)}%`, color: '#a855f7' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800 }}>My Students</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Track student progress and engagement</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {stats.map((s, i) => (
          <div key={i} className="smart-card" style={{ padding: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: s.color, display: 'block' }}>{s.value}</span>
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#8c7f94' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a095a8' }} />
        <input type="text" placeholder="Search students..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '10px 10px 10px 34px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }}
        />
      </div>

      {/* Student List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(student => (
          <div key={student.id} className="smart-card" style={{ padding: '14px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={student.avatar} alt={student.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: 700, margin: 0 }}>{student.name}</h4>
                <span style={{ fontSize: '10px', color: '#8c7f94' }}>{student.course} · Enrolled {student.enrolled}</span>
                {/* Progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <div style={{ flex: 1, height: '4px', backgroundColor: '#f0ecf4', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${student.progress}%`, height: '100%', backgroundColor: student.progress === 100 ? '#22c55e' : '#7c3aed', borderRadius: '2px', transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: student.progress === 100 ? '#22c55e' : '#1e0926' }}>{student.progress}%</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button className="click-press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', padding: '4px' }} title="Message">
                  <MessageCircle size={14} />
                </button>
                {student.progress === 100 && (
                  <button className="click-press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#caba61', padding: '4px' }} title="Issue Certificate">
                    <Award size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
