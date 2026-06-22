import React from 'react';
import { Flame, Clock, Calendar, ChevronRight, Play, Star, BookOpen } from 'lucide-react';

export default function Home({ db, onSelectCourse, onSelectLiveClass, onSelectTab }) {
  const { courses = [], classes = [], streak = 14, overallProgress = 67 } = db;

  // Active or In Progress Courses
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);
  const completedCourses = courses.filter(c => c.progress === 100);

  // Quick categories
  const categories = [
    { name: 'Test Prep', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
    { name: 'Language', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    { name: 'STEM', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { name: 'Arts', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>LEARNING DASHBOARD</span>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>Hello, Omar! 👋</h2>
        </div>

        {/* Streak Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(249, 115, 22, 0.12)',
          color: '#f97316',
          fontSize: '12px',
          fontWeight: 800,
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(249, 115, 22, 0.2)'
        }}>
          <Flame size={15} fill="#f97316" stroke="none" />
          <span>{streak} Days</span>
        </div>
      </div>

      {/* 2. Progress Overview Ring Card */}
      <div className="mobile-card-premium" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Progress Speedrun</span>
          <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Keep up the momentum!</h3>
          <p style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
            You completed {completedCourses.length} {completedCourses.length === 1 ? 'course' : 'courses'} and have {inProgressCourses.length} study goals active.
          </p>
          <button 
            onClick={() => onSelectTab('tasks')}
            className="click-press"
            style={{
              marginTop: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontSize: '10.5px',
              fontWeight: 700,
              alignSelf: 'flex-start',
              cursor: 'pointer'
            }}
          >
            Review Flashcards
          </button>
        </div>

        {/* Circular SVG Ring */}
        <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r="40" stroke="var(--secondary-color)" strokeWidth="8" fill="none"
              strokeDasharray="251" strokeDashoffset={251 - (251 * overallProgress) / 100}
              strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
            <text x="50" y="52" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="20" fontWeight="800">{overallProgress}%</text>
          </svg>
        </div>
      </div>

      {/* 3. Horizontal Categories Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject Realms</span>
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => onSelectTab('explore')}
              className="click-press"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: c.bg,
                color: c.color,
                border: 'none',
                fontWeight: 750,
                fontSize: '11.5px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <BookOpen size={12} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Enrolled Courses (Horizontal Sliders) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>My Active Courses</span>
          <button onClick={() => onSelectTab('explore')} style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-color)', background: 'none', border: 'none', cursor: 'pointer' }}>See All</button>
        </div>

        <div className="hide-scrollbar" style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '8px' }}>
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="mobile-card click-press"
              style={{ padding: '0px', width: '220px', flexShrink: 0, overflow: 'hidden', cursor: 'pointer' }}
            >
              <div style={{ height: '100px', background: 'var(--primary-color)', position: 'relative' }}>
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
                <span className="mobile-pill" style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '9px' }}>
                  {course.category}
                </span>
              </div>

              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '34px', lineHeight: 1.4 }}>
                  {course.title}
                </h4>
                
                {/* Progress bar */}
                <div style={{ marginTop: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '3px' }}>
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--secondary-color)', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Live Webinars Widget */}
      {classes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Class Companion</span>
          
          <div className="mobile-card" style={{ padding: '14px', borderLeft: '4px solid var(--accent-green)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase' }}>HAPPENING NOW</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Join limit: 100</span>
            </div>

            <div style={{ textAlign: 'left', marginTop: '4px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{classes[0].title}</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>with {classes[0].teacher} &bull; {classes[0].duration}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <Clock size={12} /> {classes[0].time}
              </span>
              <button 
                onClick={() => onSelectLiveClass(classes[0])}
                className="mobile-btn-primary click-press"
                style={{ padding: '6px 14px', fontSize: '11px', borderRadius: '20px', backgroundColor: 'var(--accent-green)', color: '#fff' }}
              >
                Join Webinar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Streak graph (Week view) */}
      <div className="mobile-card" style={{ padding: '16px', gap: '10px' }}>
        <h4 style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)' }}>Study Streaks Chart</h4>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '70px', marginTop: '8px' }}>
          {[
            { label: 'Mon', h: 30, active: true },
            { label: 'Tue', h: 45, active: true },
            { label: 'Wed', h: 25, active: true },
            { label: 'Thu', h: 60, active: true },
            { label: 'Fri', h: 40, active: true },
            { label: 'Sat', h: 70, active: true },
            { label: 'Sun', h: 55, active: false }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
              <div style={{
                width: '10px',
                height: `${item.h}px`,
                backgroundColor: item.active ? 'var(--secondary-color)' : 'var(--border-color)',
                borderRadius: '3px',
                transition: 'height 0.3s ease'
              }} />
              <span style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 700 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
