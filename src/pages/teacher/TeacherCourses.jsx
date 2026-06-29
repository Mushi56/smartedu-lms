import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit3, Trash2, Eye, Send, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';

export default function TeacherCourses({ db, setDb, user }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const courses = (db?.courses || []).map((c, i) => ({
    ...c,
    publishStatus: i === 0 ? 'published' : i === 1 ? 'published' : i === 2 ? 'draft' : 'pending',
    enrollments: Math.floor(Math.random() * 500) + 50,
    revenue: `$${(Math.random() * 5000 + 500).toFixed(0)}`
  }));

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.publishStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusConfig = {
    published: { label: 'Published', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    draft: { label: 'Draft', color: 'var(--text-secondary)', bg: 'var(--bg-input)' },
    pending: { label: 'Pending Review', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
    rejected: { label: 'Rejected', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' }
  };

  const filters = ['all', 'published', 'draft', 'pending', 'rejected'];

  const premiumCard = {
    background: 'var(--bg-card)',
    borderRadius: '20px',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-premium)',
    padding: '16px',
    position: 'relative'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>My Courses</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 550 }}>Create and manage your syllabus</p>
        </div>
        <button 
          className="click-press" 
          style={{ 
            fontSize: '11px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px',
            background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '14px',
            fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.15)'
          }}
          onClick={() => alert('Opening course creation wizard...')}
        >
          <Plus size={14} /> Create Course
        </button>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px',
        padding: '12px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
      }}>
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input 
          type="text" 
          placeholder="Search courses..." 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            border: 'none', background: 'none', outline: 'none',
            fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-primary)', flex: 1,
            fontWeight: 500
          }}
        />
      </div>

      {/* Status Filters */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {filters.map(f => (
          <button 
            key={f} 
            onClick={() => setStatusFilter(f)} 
            className="click-press"
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 750,
              border: 'none',
              background: statusFilter === f ? 'var(--primary-color)' : 'var(--bg-card)',
              color: statusFilter === f ? '#fff' : 'var(--text-secondary)',
              boxShadow: statusFilter === f ? '0 4px 12px rgba(99,102,241,0.2)' : '0 2px 10px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {f === 'all' ? 'All Courses' : statusConfig[f]?.label || f}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.length === 0 ? (
          <div style={{ ...premiumCard, padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <BookOpen size={24} />
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, fontWeight: 600 }}>No courses found</p>
          </div>
        ) : filtered.map(course => {
          const status = statusConfig[course.publishStatus] || statusConfig.draft;
          return (
            <div 
              key={course.id} 
              style={{ 
                ...premiumCard, 
                padding: '12px', 
                display: 'flex', 
                gap: '14px', 
                alignItems: 'center' 
              }}
            >
              <img 
                src={course.thumbnail} 
                alt={course.title}
                style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: status.color, backgroundColor: status.bg, padding: '3px 8px', borderRadius: '8px', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                    {status.label}
                  </span>
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.title}</h4>
                <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  <span>{course.enrollments} students</span>
                  <span style={{ color: 'var(--border-color)' }}>•</span>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 800 }}>{course.revenue}</span>
                  <span style={{ color: 'var(--border-color)' }}>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
                    <Star size={11} fill="#f59e0b" stroke="none" />
                    <span>{course.rating || '4.8'}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                <button className="click-press" style={{ background: 'var(--bg-input)', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit"><Edit3 size={13} /></button>
                <button className="click-press" style={{ background: 'rgba(239, 68, 68, 0.06)', border: 'none', cursor: 'pointer', color: '#ef4444', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete"><Trash2 size={13} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
