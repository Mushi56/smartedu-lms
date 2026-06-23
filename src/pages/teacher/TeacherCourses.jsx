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
    published: { label: 'Published', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    draft: { label: 'Draft', color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
    pending: { label: 'Pending Review', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
    rejected: { label: 'Rejected', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }
  };

  const filters = ['all', 'published', 'draft', 'pending', 'rejected'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>My Courses</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Create and manage your courses</p>
        </div>
        <button className="btn-primary click-press" style={{ fontSize: '11px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => alert('Opening course creation wizard...')}
        >
          <Plus size={13} /> Create Course
        </button>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a095a8' }} />
          <input type="text" placeholder="Search courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 34px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* Status Filters */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setStatusFilter(f)} className="click-press"
            style={{
              padding: '6px 14px', borderRadius: '16px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
              backgroundColor: statusFilter === f ? '#37123c' : '#f0ecf4',
              color: statusFilter === f ? '#fff' : '#1e0926'
            }}
          >
            {f === 'all' ? 'All Courses' : statusConfig[f]?.label || f}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div className="smart-card" style={{ padding: '40px', textAlign: 'center' }}>
            <BookOpen size={32} style={{ color: '#d1d5db', marginBottom: '12px' }} />
            <p style={{ fontSize: '13px', color: '#8c7f94' }}>No courses found</p>
          </div>
        ) : filtered.map(course => {
          const status = statusConfig[course.publishStatus] || statusConfig.draft;
          return (
            <div key={course.id} className="smart-card" style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <img src={course.thumbnail} alt={course.title}
                style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '8px', fontWeight: 800, color: status.color, backgroundColor: status.bg, padding: '2px 8px', borderRadius: '8px' }}>
                    {status.label}
                  </span>
                </div>
                <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: 1.3 }}>{course.title}</h4>
                <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: '#8c7f94' }}>
                  <span>{course.enrollments} students</span>
                  <span>{course.revenue}</span>
                  <span>★ {course.rating}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button className="click-press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', padding: '4px' }}><Edit3 size={14} /></button>
                <button className="click-press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}><Trash2 size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
