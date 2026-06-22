import React from 'react';
import {
  Flame, Clock, BookOpen, Award, FileText, Play,
  CheckCircle, Calendar, Star, ChevronRight, TrendingUp
} from 'lucide-react';

const card = {
  background: '#fff',
  borderRadius: '16px',
  border: '1px solid #ede9f4',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const sectionLabel = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2px',
};

const seeAllBtn = {
  fontSize: '11px',
  fontWeight: 700,
  color: 'var(--primary-color)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

export default function Dashboard({ courses, classes, streak, overallProgress, setActiveTab, onSelectCourse }) {
  const completedLessons = courses ? courses.reduce((sum, c) => sum + Math.round((c.progress / 100) * (c.chaptersCount || 10)), 0) : 12;
  const inProgress = courses ? courses.filter(c => c.progress > 0 && c.progress < 100).length : 2;
  const totalChapters = courses ? courses.reduce((sum, c) => sum + (c.chaptersCount || 10), 0) : 30;
  const remaining = Math.max(0, totalChapters - completedLessons);

  const nextClass = classes && classes.length > 0 ? classes[0] : null;

  const achievements = [
    { label: 'Enrolled', count: courses ? courses.length : 0, color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
    { label: 'Completed', count: completedLessons, color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
    { label: 'Assignments', count: courses ? courses.filter(c => c.progress > 15).length + 1 : 3, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
    { label: 'Certificates', count: courses ? courses.filter(c => c.progress === 100).length : 0, color: '#CABA61', bg: 'rgba(202,186,97,0.1)' },
  ];

  const resources = [
    { id: 1, name: 'SAT Math Formula Sheet', type: 'PDF', size: '2.4 MB' },
    { id: 2, name: 'IELTS Writing Samples', type: 'PDF', size: '1.8 MB' },
    { id: 3, name: 'GRE Quant Sheet', type: 'PDF', size: '1.2 MB' },
  ];

  const streakDays = [
    { d: 'M', h: 40 }, { d: 'T', h: 60 }, { d: 'W', h: 30 },
    { d: 'T', h: 75 }, { d: 'F', h: 50 }, { d: 'S', h: 90 }, { d: 'S', h: 65 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }} className="animate-fade-in">

      {/* ── Overall Progress Banner ─────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #3A2048 0%, #1e0b29 100%)',
        borderRadius: '18px',
        padding: '18px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        {/* Circular SVG */}
        <div style={{ flexShrink: 0, width: '80px', height: '80px' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.12)" strokeWidth="6" fill="none" />
            <circle cx="40" cy="40" r="32" stroke="var(--secondary-color)" strokeWidth="6" fill="none"
              strokeDasharray="201" strokeDashoffset={201 - (201 * (overallProgress || 0)) / 100}
              strokeLinecap="round" transform="rotate(-90 40 40)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
            <text x="40" y="37" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="14" fontWeight="800">{overallProgress || 0}%</text>
            <text x="40" y="51" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontWeight="600">Progress</text>
          </svg>
        </div>

        {/* Stats */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'Done', val: completedLessons },
              { label: 'Active', val: inProgress },
              { label: 'Left', val: remaining },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab('progress')}
            style={{ alignSelf: 'flex-start', padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
          >
            View Progress →
          </button>
        </div>
      </div>

      {/* ── Achievements 2×2 Grid ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {achievements.map((a, i) => (
          <div key={i} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: '10px', padding: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={16} style={{ color: a.color }} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{a.count}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>{a.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Next Live Class ─────────────────────────────────────── */}
      <div style={card}>
        <div style={sectionLabel}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Next Live Class</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 700, color: '#2BA84A', background: 'rgba(43,168,74,0.1)', padding: '3px 8px', borderRadius: '10px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2BA84A' }} />
            Live
          </span>
        </div>
        {nextClass ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{nextClass.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {nextClass.time} {nextClass.ampm?.toUpperCase()}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> 60 min
              </span>
            </div>
            <button
              onClick={() => onSelectCourse(nextClass.courseId || 'course-1')}
              style={{ width: '100%', padding: '10px', background: 'var(--secondary-color)', color: '#1e1b4b', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
              className="click-press"
            >
              Join Class
            </button>
          </div>
        ) : (
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>No upcoming classes. Enroll in a course to see live classes.</p>
        )}
      </div>

      {/* ── My Courses ─────────────────────────────────────────── */}
      {courses && courses.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={sectionLabel}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>My Courses</span>
            <button style={seeAllBtn} onClick={() => setActiveTab('courses')}>See All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {courses.slice(0, 3).map((course, idx) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course.id)}
                style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: '12px', padding: '12px', cursor: 'pointer' }}
                className="click-press"
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#3A2048' }}>
                  {course.thumbnail
                    ? <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={18} style={{ color: 'rgba(255,255,255,0.6)' }} /></div>
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {course.title}
                  </h4>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{course.teacher}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '5px' }}>
                    <div style={{ flex: 1, height: '4px', background: '#ede9f4', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--secondary-color)', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 }}>{course.progress}%</span>
                  </div>
                </div>
                <Play size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Continue Watching ──────────────────────────────────── */}
      <div style={card}>
        <div style={sectionLabel}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Continue Watching</span>
          <button style={seeAllBtn} onClick={() => setActiveTab('courses')}>See All</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '70px', height: '44px', borderRadius: '8px', background: '#3A2048', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
            <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80" alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <Play size={14} fill="#fff" stroke="none" style={{ position: 'absolute', color: '#fff' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 1px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Quadratic Equations – Problem Solving
            </h4>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>SAT Math Mastery</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <div style={{ flex: 1, height: '3px', background: '#ede9f4', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: 'var(--secondary-color)' }} />
              </div>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0 }}>60%</span>
            </div>
          </div>
          <button
            onClick={() => onSelectCourse && onSelectCourse('course-1')}
            style={{ flexShrink: 0, padding: '6px 12px', borderRadius: '8px', background: 'var(--primary-glow)', color: 'var(--primary-color)', border: 'none', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
            className="click-press"
          >
            Resume
          </button>
        </div>
      </div>

      {/* ── Study Streak ──────────────────────────────────────── */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Study Streak</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Keep up the great work!</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f97316', fontWeight: 800, fontSize: '14px' }}>
            <Flame size={16} fill="#f97316" stroke="#f97316" />
            14 Days
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '70px' }}>
          {streakDays.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flex: 1 }}>
              <div style={{
                width: '10px',
                height: `${Math.round(item.h * 0.7)}px`,
                background: i === 5 ? 'var(--secondary-color)' : 'rgba(202,186,97,0.25)',
                borderRadius: '3px',
                transition: 'height 0.3s ease'
              }} />
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>{item.d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upcoming Schedule ─────────────────────────────────── */}
      {classes && classes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={sectionLabel}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Upcoming Schedule</span>
            <button style={seeAllBtn} onClick={() => setActiveTab('schedule')}>View Calendar</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {classes.slice(0, 3).map(item => (
              <div key={item.id} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: '10px', padding: '12px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(58,32,72,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={15} style={{ color: 'var(--primary-color)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h4>
                  <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{item.isLive ? 'Live Class' : 'Scheduled'}</span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 700, flexShrink: 0 }}>{item.time} {item.ampm?.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Recent Resources ─────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={sectionLabel}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Recent Resources</span>
          <button style={seeAllBtn} onClick={() => setActiveTab('resources')}>See All</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {resources.map(res => (
            <div key={res.id} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: '10px', padding: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={15} style={{ color: '#ef4444' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.name}</h4>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{res.type} · {res.size}</span>
              </div>
              <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
