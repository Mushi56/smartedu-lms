import React, { useState } from 'react';
import { Search, BookOpen, Clock, Star, Play, CheckCircle, Award } from 'lucide-react';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>My Learning Journey</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>
          You have {courses.length} enrolled courses · {inProgress} active · {completed} completed
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {[
          { label: 'Enrolled', value: courses.length, color: '#6366f1', bg: 'rgba(99,102,241,0.06)', icon: BookOpen },
          { label: 'In Progress', value: inProgress, color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', icon: Clock },
          { label: 'Completed', value: completed, color: '#10b981', bg: 'rgba(16,185,129,0.06)', icon: CheckCircle },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{
              background: 'var(--bg-card)', 
              borderRadius: '16px', 
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
              padding: '14px 10px', 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                backgroundColor: s.bg, color: s.color, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '4px'
              }}>
                <Icon size={16} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 700 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Search Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px',
        padding: '12px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
      }}>
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search courses or instructor..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            border: 'none', background: 'none', outline: 'none',
            fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-primary)', flex: 1,
            fontWeight: 500
          }}
        />
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="hide-scrollbar">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="click-press"
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 750,
              border: 'none',
              background: activeFilter === f ? 'var(--primary-color)' : '#fff',
              color: activeFilter === f ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeFilter === f ? '0 4px 12px rgba(99,102,241,0.2)' : '0 2px 10px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Course List */}
      {filtered.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-subtle)',
          padding: '48px 24px', textAlign: 'center', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
        }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <BookOpen size={24} />
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, fontWeight: 600 }}>No courses match your filter.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  background: 'var(--bg-card)', 
                  borderRadius: '20px',
                  border: '1px solid var(--border-subtle)', 
                  overflow: 'hidden',
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '12px',
                  gap: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', width: '96px', height: '96px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={course.thumbnail || thumbnails[idx % thumbnails.length]}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      {isCompleted
                        ? <CheckCircle size={16} style={{ color: '#10b981' }} />
                        : <Play size={14} fill="var(--primary-color)" stroke="none" style={{ marginLeft: '2px' }} />
                      }
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {course.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>{course.teacher}</span>
                      <span style={{ color: '#e2e8f0' }}>•</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Star size={11} fill="#f59e0b" stroke="none" />
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{course.rating || '4.8'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 650 }}>
                      <span>{course.chaptersCount || 0} lessons</span>
                      <span style={{ fontWeight: 800, color: isCompleted ? '#10b981' : 'var(--text-primary)' }}>
                        {course.progress}%
                      </span>
                    </div>
                    <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${course.progress}%`,
                        height: '100%',
                        background: isCompleted ? '#10b981' : 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  {/* Action buttons (inline footer) */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                    <button
                      onClick={e => { e.stopPropagation(); onSelectCourse(course.id); }}
                      style={{
                        padding: '6px 14px', 
                        borderRadius: '12px', 
                        border: 'none',
                        background: isCompleted ? 'rgba(16,185,129,0.1)' : 'var(--primary-color)',
                        color: isCompleted ? '#10b981' : '#fff',
                        fontSize: '10px', 
                        fontWeight: 800, 
                        cursor: 'pointer',
                        boxShadow: isCompleted ? 'none' : '0 2px 8px rgba(99,102,241,0.15)'
                      }}
                      className="click-press"
                    >
                      {isCompleted ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
                    </button>
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
