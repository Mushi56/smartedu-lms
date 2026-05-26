import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, Video, AlertCircle } from 'lucide-react';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Class Schedule & Calendar</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Review and join your live lectures, interactive sessions, and assignment due dates</p>
        </div>
      </div>

      {/* Main Grid: Calendar Grid Card + Selected Day Details */}
      <div className="schedule-grid-layout">
        {/* The Grid Calendar */}
        <div className="smart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={16} style={{ color: 'var(--primary-color)' }} />
              <span>May 2026</span>
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Click days to view specific schedules</span>
          </div>

          <div className="calendar-grid">
            {/* Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(h => (
              <div key={h} className="calendar-day-header">{h}</div>
            ))}

            {/* Cells */}
            {calendarCells.map((cell, idx) => {
              const cellClasses = classes.filter(c => c.date === cell.dateStr);
              const isSelected = selectedDateStr === cell.dateStr;
              const isToday = cell.dateStr === '2026-05-26';
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedDateStr(cell.dateStr)}
                  className={`calendar-day-cell click-press ${!cell.isCurrentMonth ? 'inactive' : ''} ${isToday ? 'today' : ''}`}
                  style={{
                    borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
                    backgroundColor: isSelected ? 'var(--primary-glow)' : '',
                    cursor: 'pointer'
                  }}
                >
                  <span className="calendar-day-num">{cell.dayNum}</span>
                  <div className="calendar-events-container">
                    {cellClasses.map(c => (
                      <span 
                        key={c.id} 
                        className="calendar-event-dot"
                        title={c.title}
                      >
                        {c.time} {c.title.split(' - ')[1] || c.title.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Class items detail list */}
        <div className="smart-card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', textAlign: 'left' }}>
            Schedule details for: <span style={{ color: 'var(--primary-color)' }}>{new Date(selectedDateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </h3>

          {selectedDayClasses.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={32} style={{ color: 'var(--text-muted)' }} />
              <p style={{ fontSize: '13px' }}>No classes or assignments scheduled on this date.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedDayClasses.map((cls) => (
                <div key={cls.id} className="upcoming-class-row animate-fade-in" style={{ padding: '16px 20px' }}>
                  <div className="class-time-block">
                    <span className="class-time">{cls.time}</span>
                    <span className="class-ampm">{cls.ampm}</span>
                  </div>

                  <div className="class-info-block" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Video size={16} />
                    </div>
                    <div>
                      <span className="class-title" style={{ fontSize: '14px', display: 'block' }}>{cls.title}</span>
                      <span className="class-instructor" style={{ fontSize: '11px' }}>Instructor: {cls.teacher}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {cls.isLive && <span className="live-indicator-pill">Live Now</span>}
                    <button 
                      onClick={() => onSelectCourse(cls.courseId)}
                      className="btn-primary click-press"
                      style={{ padding: '8px 16px', fontSize: '12px' }}
                    >
                      Join Virtual Class
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
