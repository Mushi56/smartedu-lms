import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, Video, AlertCircle, Sparkles, User } from 'lucide-react';

export default function Schedule({ classes, onSelectCourse }) {
  const [selectedDateStr, setSelectedDateStr] = useState('2026-05-26'); // default to Today
  
  // Custom static days representation of May 2026 for the calendar view
  // Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
  // May 1 2026 is a Friday (cell index 5)
  const calendarCells = [];
  // Fill initial padding days (April padding)
  for (let i = 26; i <= 30; i++) {
    calendarCells.push({ dayNum: i, dateStr: `2026-04-${i}`, isCurrentMonth: false });
  }
  // Fill May days
  for (let i = 1; i <= 31; i++) {
    const padStr = i < 10 ? `0${i}` : `${i}`;
    calendarCells.push({ dayNum: i, dateStr: `2026-05-${padStr}`, isCurrentMonth: true });
  }
  // Fill June padding
  for (let i = 1; i <= 6; i++) {
    calendarCells.push({ dayNum: i, dateStr: `2026-06-0${i}`, isCurrentMonth: false });
  }

  // Filter classes scheduled for the selected date
  const selectedDayClasses = classes.filter(c => c.date === selectedDateStr);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Class Schedule & Calendar
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Review and join your live lectures, interactive sessions, and assignment due dates
          </p>
        </div>
      </div>

      {/* Main Grid: Calendar Grid Card + Selected Day Details */}
      <div className="schedule-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }} className="responsive-grid-1col">
        {/* The Grid Calendar */}
        <div 
          className="smart-card"
          style={{
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <CalendarIcon size={18} style={{ color: 'var(--primary-color)' }} />
              <span>May 2026</span>
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
              Click days to view specific schedules
            </span>
          </div>

          <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center' }}>
            {/* Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(h => (
              <div 
                key={h} 
                className="calendar-day-header"
                style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', paddingBottom: '8px' }}
              >
                {h}
              </div>
            ))}

            {/* Cells */}
            {calendarCells.map((cell, idx) => {
              const cellClasses = classes.filter(c => c.date === cell.dateStr);
              const isSelected = selectedDateStr === cell.dateStr;
              const isToday = cell.dateStr === '2026-05-26';
              const hasClasses = cellClasses.length > 0;
              
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedDateStr(cell.dateStr)}
                  className={`calendar-day-cell click-press ${!cell.isCurrentMonth ? 'inactive' : ''} ${isToday ? 'today' : ''}`}
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '8px 4px',
                    minHeight: '48px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: cell.isCurrentMonth ? 1 : 0.4,
                    borderColor: isSelected ? 'var(--primary-color)' : isToday ? '#f59e0b' : 'var(--border-color)',
                    backgroundColor: isSelected ? 'var(--primary-glow)' : isToday ? 'rgba(245, 158, 11, 0.04)' : 'var(--bg-app)',
                    boxShadow: isSelected ? '0 0 0 2px var(--primary-glow)' : 'none'
                  }}
                >
                  <span 
                    className="calendar-day-num" 
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: isSelected || isToday ? 800 : 600, 
                      color: isSelected ? 'var(--primary-color)' : isToday ? '#f59e0b' : 'var(--text-primary)' 
                    }}
                  >
                    {cell.dayNum}
                  </span>
                  
                  {/* Status indicators */}
                  <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', flexWrap: 'wrap', width: '100%', height: '6px' }}>
                    {cellClasses.map(c => (
                      <span 
                        key={c.id} 
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: c.isLive ? '#7c3aed' : 'var(--text-muted)',
                          display: 'inline-block'
                        }}
                        title={`${c.time}: ${c.title}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Class items detail list */}
        <div 
          className="smart-card"
          style={{
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            Schedule for: <span style={{ color: 'var(--primary-color)' }}>{new Date(selectedDateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </h3>

          {selectedDayClasses.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-app)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)'
              }}>
                <AlertCircle size={20} />
              </div>
              <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>No classes or assignments scheduled on this date.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedDayClasses.map((cls) => (
                <div 
                  key={cls.id} 
                  className="upcoming-class-row animate-fade-in hover-glow" 
                  style={{ 
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-app)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '20px',
                        backgroundColor: 'var(--primary-glow)',
                        color: 'var(--primary-color)',
                        fontSize: '10px',
                        fontWeight: 700
                      }}>
                        <Clock size={10} />
                        <span>{cls.time} {cls.ampm.toUpperCase()}</span>
                      </span>
                    </div>

                    {cls.isLive && (
                      <span 
                        className="live-indicator-pill animate-pulse"
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          padding: '4px 8px',
                          borderRadius: '20px',
                          fontSize: '10px',
                          fontWeight: 800,
                          letterSpacing: '0.5px'
                        }}
                      >
                        ● Live Now
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--bg-card)', 
                      color: 'var(--primary-color)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: '1px solid var(--border-color)',
                      flexShrink: 0
                    }}>
                      <Video size={18} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span className="class-title" style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {cls.title}
                      </span>
                      <span className="class-instructor" style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <User size={10} />
                        <span>Instructor: {cls.teacher}</span>
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectCourse(cls.courseId)}
                    className="btn-primary click-press"
                    style={{ 
                      width: '100%',
                      justifyContent: 'center',
                      padding: '10px', 
                      fontSize: '12px',
                      borderRadius: '8px',
                      background: cls.isLive ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'linear-gradient(135deg, var(--primary-color), #4f46e5)',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{cls.isLive ? 'Join Live Lecture' : 'View Course Hub'}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
