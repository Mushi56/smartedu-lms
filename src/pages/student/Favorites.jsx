import React from 'react';
import { Heart, Star, Users, BookOpen, Trash2 } from 'lucide-react';

export default function Favorites({ courses, onSelectCourse }) {
  // Show all courses as "favorited" for demo purposes
  const favoriteCourses = courses || [];

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ textAlign: 'left' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700 }}>My Favorites</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Courses you've bookmarked for quick access</p>
      </div>

      {favoriteCourses.length === 0 ? (
        <div className="smart-card" style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <Heart size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>No Favorites Yet</h3>
          <p style={{ fontSize: '13px', marginTop: '8px' }}>Browse courses and click the heart icon to save them here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {favoriteCourses.map((course, idx) => (
            <div
              key={course.id}
              className="smart-card click-press"
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => onSelectCourse && onSelectCourse(course.id)}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '140px', overflow: 'hidden', background: '#3A2048' }}>
                <img
                  src={avatars[idx % avatars.length]}
                  alt={course.teacher}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute', top: '10px', right: '10px',
                    width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#ef4444'
                  }}
                >
                  <Heart size={16} fill="#ef4444" />
                </button>
                <span style={{
                  position: 'absolute', bottom: '8px', left: '8px', padding: '3px 10px',
                  borderRadius: '4px', background: 'rgba(0,0,0,0.7)', color: '#ffffff',
                  fontSize: '10px', fontWeight: 600
                }}>
                  {course.category}
                </span>
              </div>

              {/* Details */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{course.title}</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{course.teacher}</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <BookOpen size={12} /> {course.chaptersCount} Lessons
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <Users size={12} /> {course.studentsCount?.toLocaleString()} Students
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#f59e0b' }}>
                    <Star size={12} fill="#f59e0b" stroke="none" /> 4.8
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', backgroundColor: 'var(--secondary-color)', borderRadius: '3px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
