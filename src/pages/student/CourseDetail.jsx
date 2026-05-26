import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, BookOpen, Clock, Users, Star, ArrowLeft } from 'lucide-react';

export default function CourseDetail({ courseId, courses, onBack, onStartLesson }) {
  const [expandedModule, setExpandedModule] = useState('m1');
  const course = courses.find(c => c.id === courseId);

  if (!course) return <div>Course not found</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Back navigation button */}
      <div>
        <button 
          onClick={onBack} 
          className="btn-secondary click-press" 
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Courses</span>
        </button>
      </div>

      {/* Main Grid: Detail + Right Action Card */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Course Banner */}
        <div className="smart-card" style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          color: 'white',
          padding: '40px'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', backgroundColor: 'var(--primary-color)', color: 'white', textTransform: 'uppercase' }}>
              {course.category}
            </span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>{course.title}</h2>
          <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '24px', maxWidth: '600px' }}>
            Master this topic from absolute scratch. This comprehensive curriculum takes you step-by-step through core theory, hands-on programming labs, and AI-assisted doubt solving.
          </p>

          {/* Banner Meta Rows */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '13px', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} style={{ color: 'var(--primary-color)' }} />
              <span>{course.studentsCount} Students Enrolled</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
              <span>4.9 / 5.0 Rating</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: 'var(--primary-color)' }} />
              <span>{course.chaptersCount} Chapters</span>
            </div>
          </div>
        </div>

        {/* Detailed Curriculum Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          <div className="smart-card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Course Syllabus</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {course.modules.map((mod) => {
                const isExpanded = expandedModule === mod.id;
                return (
                  <div 
                    key={mod.id} 
                    style={{ 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '8px', 
                      overflow: 'hidden' 
                    }}
                  >
                    {/* Module Header */}
                    <div 
                      onClick={() => setExpandedModule(isExpanded ? '' : mod.id)}
                      style={{ 
                        padding: '16px 20px', 
                        backgroundColor: 'var(--bg-app)', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        cursor: 'pointer' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                        <BookOpen size={16} style={{ color: 'var(--primary-color)' }} />
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '13px', display: 'block' }}>{mod.title}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{mod.lessons.length} lessons</span>
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>

                    {/* Lessons list folders */}
                    {isExpanded && (
                      <div style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
                        {mod.lessons.map((lesson) => (
                          <div 
                            key={lesson.id} 
                            style={{ 
                              padding: '14px 20px', 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              borderBottom: '1px solid var(--border-color)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                              <button 
                                onClick={() => onStartLesson(course.id, lesson.id)}
                                className="play-overlay-btn click-press" 
                                style={{ position: 'relative', width: '28px', height: '28px', opacity: 1 }}
                              >
                                <Play size={10} fill="currentColor" />
                              </button>
                              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>{lesson.title}</span>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{lesson.duration}</span>
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
          <div className="smart-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                alt="Teacher avatar" 
              />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, display: 'block' }}>{course.teacher}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Professor of Computer Science & ML</span>
              </div>
            </div>
            
            <button 
              onClick={() => onStartLesson(course.id, course.modules[0].lessons[0].id)}
              className="btn-primary click-press"
            >
              <Play size={14} fill="currentColor" />
              <span>Resume Learning ({course.progress}%)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
