import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, BookOpen, Clock, Users, Star, ArrowLeft, GraduationCap } from 'lucide-react';

export default function CourseDetail({ courseId, courses, onBack, onStartLesson }) {
  const [expandedModule, setExpandedModule] = useState('m1');
  const course = courses.find(c => c.id === courseId);

  if (!course) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Course not found</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      {/* Back button */}
      <div>
        <button 
          onClick={onBack} 
          className="click-press" 
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', 
            padding: '8px 16px', borderRadius: '14px', fontSize: '12px',
            fontWeight: 800, color: 'var(--text-secondary)', cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Courses</span>
        </button>
      </div>

      {/* Course Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        color: 'white',
        padding: '30px 24px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(49, 46, 129, 0.15)'
      }}>
        {/* Subtle background overlay graphics */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <span style={{ 
            fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '12px', 
            backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', 
            textTransform: 'uppercase', letterSpacing: '0.5px', backdropFilter: 'blur(4px)' 
          }}>
            {course.category}
          </span>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '10px', lineHeight: 1.3, letterSpacing: '-0.5px' }}>
          {course.title}
        </h2>
        <p style={{ fontSize: '12.5px', opacity: 0.85, marginBottom: '20px', lineHeight: 1.5, maxWidth: '600px', fontWeight: 500 }}>
          Master this topic from absolute scratch. This comprehensive curriculum takes you step-by-step through core theory, hands-on programming labs, and AI-assisted doubt solving.
        </p>

        {/* Banner Meta Rows */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={14} style={{ color: '#818cf8' }} />
            <span>{course.studentsCount} Enrolled</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={14} fill="#fbbf24" stroke="none" />
            <span>4.9 Rating</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} style={{ color: '#818cf8' }} />
            <span>{course.chaptersCount} Chapters</span>
          </div>
        </div>
      </div>

      {/* Curriculum Syllabus */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '24px', border: '1px solid var(--border-subtle)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>Course Syllabus</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {course.modules.map((mod) => {
              const isExpanded = expandedModule === mod.id;
              return (
                <div 
                  key={mod.id} 
                  style={{ 
                    border: '1px solid var(--border-subtle)', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    background: 'var(--bg-card)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.01)'
                  }}
                >
                  {/* Module Header */}
                  <div 
                    onClick={() => setExpandedModule(isExpanded ? '' : mod.id)}
                    style={{ 
                      padding: '14px 16px', 
                      backgroundColor: isExpanded ? 'rgba(99,102,241,0.03)' : '#fcfcfd', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                      <div style={{ 
                        width: '32px', height: '32px', borderRadius: '10px', 
                        backgroundColor: isExpanded ? 'rgba(99,102,241,0.1)' : '#f1f5f9', 
                        color: isExpanded ? 'var(--primary-color)' : 'var(--text-secondary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>{mod.title}</span>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 550 }}>{mod.lessons.length} lessons</span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} /> : <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />}
                  </div>

                  {/* Lessons list */}
                  {isExpanded && (
                    <div style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
                      {mod.lessons.map((lesson, idx) => (
                        <div 
                          key={lesson.id} 
                          style={{ 
                            padding: '12px 16px', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            borderBottom: idx !== mod.lessons.length - 1 ? '1px solid rgba(0,0,0,0.02)' : 'none'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                            <button 
                              onClick={() => onStartLesson(course.id, lesson.id)}
                              className="click-press" 
                              style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: 'none', background: 'rgba(99,102,241,0.08)', color: 'var(--primary-color)',
                                width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer'
                              }}
                            >
                              <Play size={10} fill="currentColor" style={{ marginLeft: '1px' }} />
                            </button>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{lesson.title}</span>
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructor & Action box */}
        <div style={{ 
          background: 'var(--bg-card)', padding: '16px 20px', borderRadius: '24px', 
          border: '1px solid var(--border-subtle)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
              style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid var(--bg-card)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
              alt="Teacher avatar" 
            />
            <div>
              <span style={{ fontSize: '13px', fontWeight: 800, display: 'block', color: 'var(--text-primary)' }}>{course.teacher}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 550 }}>Lead Instructor</span>
            </div>
          </div>
          
          <button 
            onClick={() => onStartLesson(course.id, course.modules[0].lessons[0].id)}
            className="click-press"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '16px',
              fontSize: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.2)'
            }}
          >
            <Play size={12} fill="currentColor" />
            <span>Resume Learning ({course.progress}%)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
