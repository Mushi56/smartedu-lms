import React, { useState } from 'react';
import { Search, BookOpen, Clock, Star, Play, CheckCircle, Filter } from 'lucide-react';

const FILTERS = ['All', 'In Progress', 'Completed', 'Not Started'];

export default function MyCourses({ courses = [], onSelectCourse }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = courses.filter(c => {
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.teacher || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchFilter =
      activeFilter === 'All' ||
      (activeFilter === 'In Progress' && c.progress > 0 && c.progress < 100) ||
      (activeFilter === 'Completed' && c.progress === 100) ||
      (activeFilter === 'Not Started' && c.progress === 0);

    return matchSearch && matchFilter;
  });

  const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100).length;
  const completed = courses.filter(c => c.progress === 100).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }} className="animate-fade-in">

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>My Courses</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
          {courses.length} enrolled · {inProgress} in progress · {completed} completed
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {[
          { label: 'Enrolled', value: courses.length, color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
          { label: 'In Progress', value: inProgress, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
          { label: 'Completed', value: completed, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#fff', borderRadius: '12px', border: '1px solid #ede9f4',
            padding: '12px 10px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: '#fff', border: '1px solid #ede9f4', borderRadius: '12px',
        padding: '10px 14px'
      }}>
        <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search courses or instructor..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            border: 'none', background: 'none', outline: 'none',
            fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-primary)', flex: 1
          }}
        />
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }} className="hide-scrollbar">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="click-press"
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              border: activeFilter === f ? 'none' : '1px solid #ede9f4',
              background: activeFilter === f ? 'var(--primary-color)' : '#fff',
              color: activeFilter === f ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Course List */}
      {filtered.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4',
          padding: '40px 20px', textAlign: 'center', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '10px'
        }}>
          <BookOpen size={36} style={{ color: '#ede9f4' }} />
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>No courses match your filter.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((course, idx) => {
            const isCompleted = course.progress === 100;
            const thumbnails = [
              'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
            ];

            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course.id)}
                className="click-press"
                style={{
                  background: '#fff', borderRadius: '16px',
                  border: '1px solid #ede9f4', overflow: 'hidden',
                  cursor: 'pointer', display: 'flex', flexDirection: 'row',
                  alignItems: 'stretch'
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', width: '120px', aspectRatio: '16/9', background: '#3A2048', flexShrink: 0 }}>
                  <img
                    src={course.thumbnail || thumbnails[idx % thumbnails.length]}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isCompleted
                        ? <CheckCircle size={14} style={{ color: '#10b981' }} />
                        : <Play size={12} fill="#311442" stroke="none" />
                      }
                    </div>
                  </div>
                  {/* Badge */}
                  {isCompleted && (
                    <div style={{ position: 'absolute', top: '6px', right: '6px', background: '#10b981', color: '#fff', fontSize: '7px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px' }}>
                      ✓
                    </div>
                  )}
                  {!isCompleted && course.progress > 0 && (
                    <div style={{ position: 'absolute', top: '6px', right: '6px', background: '#f59e0b', color: '#fff', fontSize: '7px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px' }}>
                      In Prog.
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {course.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80px' }}>{course.teacher}</span>
                      <span style={{ color: '#e2e8f0' }}>•</span>
                      <Star size={9} fill="#f59e0b" stroke="none" />
                      <span style={{ fontWeight: 700, color: '#f59e0b' }}>{course.rating || '4.8'}</span>
                    </div>
                  </div>

                  {/* Progress Bar & Footer */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                        <span>{course.chaptersCount || 0} lessons</span>
                        <span style={{ fontWeight: 700, color: isCompleted ? '#10b981' : 'var(--text-primary)' }}>
                          {course.progress}%
                        </span>
                      </div>
                      <div style={{ height: '4px', background: '#ede9f4', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${course.progress}%`,
                          height: '100%',
                          background: isCompleted ? '#10b981' : 'var(--secondary-color)',
                          borderRadius: '2px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={e => { e.stopPropagation(); onSelectCourse(course.id); }}
                        style={{
                          padding: '4px 12px', borderRadius: '16px', border: 'none',
                          background: isCompleted ? 'rgba(16,185,129,0.1)' : 'var(--primary-color)',
                          color: isCompleted ? '#10b981' : '#fff',
                          fontSize: '9px', fontWeight: 700, cursor: 'pointer'
                        }}
                        className="click-press"
                      >
                        {isCompleted ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
