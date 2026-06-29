import React, { useState, useEffect } from 'react';
import {
  Flame, Clock, BookOpen, Award, FileText, Play,
  CheckCircle, Calendar, Star, ChevronRight, TrendingUp,
  Sparkles, ArrowRight, MessageSquare, CreditCard, Heart,
  GraduationCap, Bell, Search, Video, FileDown, ExternalLink
} from 'lucide-react';

export default function Dashboard({ 
  courses, 
  classes, 
  streak, 
  overallProgress, 
  setActiveTab, 
  onSelectCourse,
  user 
}) {
  const [greeting, setGreeting] = useState('Welcome back');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreeting('Good morning');
    else if (hrs < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const completedLessons = courses ? courses.reduce((sum, c) => sum + Math.round((c.progress / 100) * (c.chaptersCount || 10)), 0) : 12;
  const inProgress = courses ? courses.filter(c => c.progress > 0 && c.progress < 100).length : 2;
  const totalChapters = courses ? courses.reduce((sum, c) => sum + (c.chaptersCount || 10), 0) : 30;
  const remaining = Math.max(0, totalChapters - completedLessons);

  const nextClass = classes && classes.length > 0 ? classes[0] : null;

  const achievements = [
    { label: 'Enrolled Courses', count: courses ? courses.length : 0, color: '#6366f1', bg: 'rgba(99,102,241,0.08)', icon: BookOpen },
    { label: 'Completed Lessons', count: completedLessons, color: '#10b981', bg: 'rgba(16,185,129,0.08)', icon: CheckCircle },
    { label: 'Assignments Done', count: courses ? courses.filter(c => c.progress > 15).length + 1 : 3, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', icon: FileText },
    { label: 'Certificates Earned', count: courses ? courses.filter(c => c.progress === 100).length : 0, color: '#ec4899', bg: 'rgba(236,72,153,0.08)', icon: Award },
  ];

  const quickLinks = [
    { label: 'My Progress', icon: GraduationCap, tab: 'progress', color: '#6366f1' },
    { label: 'Messages', icon: MessageSquare, tab: 'messages', color: '#ec4899' },
    { label: 'Payments', icon: CreditCard, tab: 'payments', color: '#10b981' },
    { label: 'Resources', icon: FileText, tab: 'resources', color: '#3b82f6' },
    { label: 'Favorites', icon: Heart, tab: 'favorites', color: '#ef4444' },
  ];

  const resources = [
    { id: 1, name: 'SAT Math Formula Sheet', type: 'PDF', size: '2.4 MB', color: '#3b82f6' },
    { id: 2, name: 'IELTS Writing Samples', type: 'PDF', size: '1.8 MB', color: '#ec4899' },
    { id: 3, name: 'GRE Quant Sheet', type: 'PDF', size: '1.2 MB', color: '#10b981' },
  ];

  const streakDays = [
    { d: 'Mon', h: 40, active: true }, 
    { d: 'Tue', h: 60, active: true }, 
    { d: 'Wed', h: 30, active: true },
    { d: 'Thu', h: 75, active: true }, 
    { d: 'Fri', h: 50, active: true }, 
    { d: 'Sat', h: 95, active: true, today: true }, 
    { d: 'Sun', h: 0, active: false },
  ];

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', paddingBottom: '30px' }} className="animate-fade-in">
      
      {/* ── PRESTIGE HEADER ────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 4px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {greeting}, {user?.name?.split(' ')[0] || 'Scholar'}!
            </span>
            <Sparkles size={16} style={{ color: '#f59e0b', fill: '#f59e0b', animation: 'pulse 2s infinite' }} />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0', fontWeight: 500 }}>
            {formattedDate} · Ready to continue your learning journey?
          </p>
        </div>
        
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s'
        }}
        onClick={() => setActiveTab('profile')}
        className="click-press"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <GraduationCap size={18} style={{ color: 'var(--primary-color)' }} />
          )}
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            border: '2px solid var(--bg-card)'
          }} />
        </div>
      </div>

      {/* ── QUICK NAVIGATION CHIPS ──────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        padding: '4px 0',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.label}
              onClick={() => setActiveTab(link.tab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '24px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = link.color;
                e.currentTarget.style.background = `${link.color}08`;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon size={13} style={{ color: link.color }} />
              {link.label}
            </button>
          );
        })}
      </div>

      {/* ── OVERALL PROGRESS GLOW BANNER ────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
        borderRadius: '24px',
        padding: '20px 24px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(79, 70, 229, 0.25)',
      }}>
        {/* Glow Effects */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(236,72,153,0) 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-20px',
          width: '130px',
          height: '130px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0) 70%)',
          pointerEvents: 'none',
        }} />

        {/* Circular Progress Ring */}
        <div style={{ flexShrink: 0, width: '90px', height: '90px', position: 'relative', zIndex: 1 }}>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="36" stroke="rgba(255,255,255,0.12)" strokeWidth="7" fill="none" />
            <circle cx="45" cy="45" r="36" stroke="#f59e0b" strokeWidth="7" fill="none"
              strokeDasharray="226" strokeDashoffset={226 - (226 * (overallProgress || 0)) / 100}
              strokeLinecap="round" transform="rotate(-90 45 45)"
              style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            <text x="45" y="42" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="16" fontWeight="900">{overallProgress || 0}%</text>
            <text x="45" y="58" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="700" letterSpacing="0.5px">COMPLETE</text>
          </svg>
        </div>

        {/* Metrics & Action */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 1 }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>Academic Standing</span>
            <div style={{ display: 'flex', gap: '24px', marginTop: '6px' }}>
              {[
                { label: 'Completed', val: completedLessons },
                { label: 'Active', val: inProgress },
                { label: 'Chapters Left', val: remaining },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '18px', fontWeight: 800, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginTop: '3px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setActiveTab('progress')}
            style={{ 
              alignSelf: 'flex-start', 
              padding: '6px 14px', 
              borderRadius: '20px', 
              border: 'none', 
              background: '#fff', 
              color: '#312e81', 
              fontSize: '10px', 
              fontWeight: 800, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            Detailed Progress <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* ── VIBRANT ACHIEVEMENTS GRID ───────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {achievements.map((a, i) => {
          const Icon = a.icon;
          return (
            <div 
              key={i} 
              style={{ 
                background: 'var(--bg-card)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                padding: '14px 16px',
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: hoveredCard === `ach-${i}` ? '0 6px 16px rgba(0,0,0,0.04)' : 'none',
                transform: hoveredCard === `ach-${i}` ? 'translateY(-2px)' : 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard(`ach-${i}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '12px', 
                background: a.bg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0 
              }}>
                <Icon size={18} style={{ color: a.color }} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>{a.count}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '2px' }}>{a.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── NEXT LIVE CLASS (HIGH PRIORITY DETAILED ACTION CARD) ──── */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        padding: '18px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>Next Scheduled Class</span>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px', 
            fontSize: '10px', 
            fontWeight: 800, 
            color: '#ef4444', 
            background: 'rgba(239,68,68,0.08)', 
            padding: '4px 10px', 
            borderRadius: '20px' 
          }}>
            <span style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              background: '#ef4444',
              animation: 'pulse 1.5s infinite'
            }} />
            Live Soon
          </span>
        </div>

        {nextClass ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '42px', 
                height: '42px', 
                borderRadius: '12px', 
                background: 'rgba(99,102,241,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Video size={20} style={{ color: 'var(--primary-color)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                  {nextClass.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} style={{ color: 'var(--primary-color)' }} /> {nextClass.time} {nextClass.ampm?.toUpperCase()}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} style={{ color: 'var(--primary-color)' }} /> 60 mins
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectCourse(nextClass.courseId || 'course-1')}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '14px', 
                fontWeight: 800, 
                fontSize: '12px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'none';
              }}
              className="click-press"
            >
              <Play size={12} fill="#fff" stroke="none" /> Enter Classroom
            </button>
          </div>
        ) : (
          <div style={{ padding: '10px 0', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>No upcoming classes scheduled for today.</p>
          </div>
        )}
      </div>

      {/* ── DYNAMIC STUDY STREAK GRAPH ─────────────────────────── */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        padding: '18px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Daily Activity</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>Your weekly study minutes</div>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: '#f97316', 
            fontWeight: 800, 
            fontSize: '13px',
            background: 'rgba(249,115,22,0.08)',
            padding: '6px 12px',
            borderRadius: '20px'
          }}>
            <Flame size={15} fill="#f97316" stroke="#f97316" />
            14 Day Streak
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '80px', padding: '0 4px' }}>
          {streakDays.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div 
                style={{
                  width: '12px',
                  height: `${item.h ? Math.max(8, Math.round(item.h * 0.6)) : 6}px`,
                  background: item.today 
                    ? 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)' 
                    : item.active 
                      ? 'linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)' 
                      : '#ede9f4',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  boxShadow: item.today ? '0 4px 8px rgba(245,158,11,0.3)' : 'none',
                  cursor: 'pointer'
                }}
                title={`${item.h} minutes`}
              />
              <span style={{ 
                fontSize: '9px', 
                color: item.today ? 'var(--primary-color)' : 'var(--text-secondary)', 
                fontWeight: item.today ? 800 : 600 
              }}>
                {item.d}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ENROLLED COURSES (SLICK CARD ROWS) ──────────────────── */}
      {courses && courses.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>My Courses</span>
            <button 
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--primary-color)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }} 
              onClick={() => setActiveTab('courses')}
            >
              See All <ChevronRight size={12} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {courses.slice(0, 3).map((course, idx) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course.id)}
                style={{ 
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '14px', 
                  padding: '12px 14px', 
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: hoveredCard === `course-${course.id}` ? '0 6px 18px rgba(0,0,0,0.03)' : 'none',
                  transform: hoveredCard === `course-${course.id}` ? 'translateY(-1px)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard(`course-${course.id}`)}
                onMouseLeave={() => setHoveredCard(null)}
                className="click-press"
              >
                <div style={{ 
                  width: '54px', 
                  height: '54px', 
                  borderRadius: '14px', 
                  overflow: 'hidden', 
                  flexShrink: 0, 
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                  position: 'relative'
                }}>
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={20} style={{ color: 'rgba(255,255,255,0.7)' }} />
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    background: 'rgba(255,255,255,0.2)'
                  }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', background: '#f59e0b' }} />
                  </div>
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {course.title}
                  </h4>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>{course.teacher}</span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <div style={{ flex: 1, height: '4px', background: '#ede9f4', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-primary)', flexShrink: 0 }}>{course.progress}%</span>
                  </div>
                </div>

                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(99,102,241,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s'
                }}>
                  <Play size={11} fill="var(--primary-color)" stroke="none" style={{ marginLeft: '1px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTINUE STUDYING (STUNNING VIDEO BANNER) ────────────── */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        padding: '18px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>Resume Learning</span>
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>Recent Lecture</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '80px', 
            height: '52px', 
            borderRadius: '12px', 
            background: '#1e0b29', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden', 
            position: 'relative', 
            flexShrink: 0,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80" alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
            <div style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Play size={9} fill="var(--primary-color)" stroke="none" style={{ marginLeft: '1px' }} />
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Quadratic Equations – Problem Solving
            </h4>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>SAT Math Mastery</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <div style={{ flex: 1, height: '4px', background: '#ede9f4', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: '#f59e0b', borderRadius: '2px' }} />
              </div>
              <span style={{ fontSize: '9px', color: 'var(--text-primary)', fontWeight: 800, flexShrink: 0 }}>60%</span>
            </div>
          </div>

          <button
            onClick={() => onSelectCourse && onSelectCourse('course-1')}
            style={{ 
              flexShrink: 0, 
              padding: '8px 14px', 
              borderRadius: '12px', 
              background: 'var(--primary-glow)', 
              color: 'var(--primary-color)', 
              border: 'none', 
              fontSize: '11px', 
              fontWeight: 800, 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary-color)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary-glow)';
              e.currentTarget.style.color = 'var(--primary-color)';
            }}
            className="click-press"
          >
            Resume
          </button>
        </div>
      </div>

      {/* ── UPCOMING SCHEDULE TIMELINE ──────────────────────────── */}
      {classes && classes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Today's Agenda</span>
            <button 
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--primary-color)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }} 
              onClick={() => setActiveTab('schedule')}
            >
              View Calendar <ChevronRight size={12} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {classes.slice(0, 3).map(item => (
              <div 
                key={item.id} 
                style={{ 
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 14px' 
                }}
              >
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: 'rgba(99,102,241,0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexShrink: 0 
                }}>
                  <Calendar size={16} style={{ color: 'var(--primary-color)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.title}
                  </h4>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {item.isLive ? 'Live Lecture' : 'Discussion Group'}
                  </span>
                </div>
                <span style={{ 
                  fontSize: '10px', 
                  color: 'var(--text-primary)', 
                  fontWeight: 800, 
                  flexShrink: 0,
                  background: 'var(--bg-app)',
                  padding: '4px 8px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)'
                }}>
                  {item.time} {item.ampm?.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RECENT RESOURCES ───────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Latest Study Materials</span>
          <button 
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--primary-color)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }} 
            onClick={() => setActiveTab('resources')}
          >
            See All <ChevronRight size={12} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {resources.map(res => (
            <div 
              key={res.id} 
              style={{ 
                background: 'var(--bg-card)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '12px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => setActiveTab('resources')}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = res.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '10px', 
                background: `${res.color}08`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0 
              }}>
                <FileText size={16} style={{ color: res.color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {res.name}
                </h4>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {res.type} · {res.size}
                </span>
              </div>
              <FileDown size={14} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
