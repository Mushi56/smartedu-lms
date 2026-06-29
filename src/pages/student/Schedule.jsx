import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, Video, AlertCircle, FileText, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Assignments from './Assignments';

export default function Schedule({ 
  classes, 
  onSelectCourse, 
  assignments, 
  setAssignments, 
  streak, 
  overallProgress, 
  setOverallProgress 
}) {
  const [activeSubTab, setActiveSubTab] = useState('live'); // 'live', 'assignments'
  
  // Date states
  const [currentDate, setCurrentDate] = useState(new Date()); // Month/Year currently viewed
  const [selectedDate, setSelectedDate] = useState(new Date()); // Day selected
  const [currentTimeString, setCurrentTimeString] = useState('');

  // Live time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeString(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateString = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate dynamic grid cells for the current month view
  const getCalendarCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of current month (0 = Sun, 1 = Mon, ...)
    const firstDayIndex = new Date(year, month, 1).getDay();
    const cells = [];

    // 1. Previous month trailing days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = month === 0 ? 11 : month - 1;
      const y = month === 0 ? year - 1 : year;
      cells.push({
        dayNum: d,
        date: new Date(y, m, d),
        isCurrentMonth: false
      });
    }

    // 2. Current month days
    const currentMonthDays = getDaysInMonth(year, month);
    for (let i = 1; i <= currentMonthDays; i++) {
      cells.push({
        dayNum: i,
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    // 3. Next month leading days to complete grid
    const totalCells = cells.length;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remaining; i++) {
      const m = month === 11 ? 0 : month + 1;
      const y = month === 11 ? year + 1 : year;
      cells.push({
        dayNum: i,
        date: new Date(y, m, i),
        isCurrentMonth: false
      });
    }

    return cells;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isCellToday = (cellDate) => {
    const today = new Date();
    return cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear();
  };

  const isCellSelected = (cellDate) => {
    return cellDate.getDate() === selectedDate.getDate() &&
      cellDate.getMonth() === selectedDate.getMonth() &&
      cellDate.getFullYear() === selectedDate.getFullYear();
  };

  // Check if a class matches this cell's date
  const getClassesForDate = (cellDate) => {
    const formattedCell = formatDateString(cellDate);
    return classes.filter(cls => {
      if (!cls.date) {
        // If no date field exists, display it on today's calendar cell as fallback
        return isCellToday(cellDate);
      }
      // Standard ISO match (YYYY-MM-DD)
      if (cls.date === formattedCell) return true;
      // Readable format match (e.g. "Jun 24")
      const monthShort = cellDate.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = cellDate.getDate();
      if (cls.date === `${monthShort} ${dayNum}`) return true;
      return false;
    });
  };

  const selectedDayClasses = getClassesForDate(selectedDate);
  const calendarCells = getCalendarCells();
  const currentMonthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }} className="animate-fade-in">
      
      {/* Dynamic Header with Real-Time Clock */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>My Schedule</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
            Manage your classes, assignments, and test dates.
          </p>
        </div>
        <div style={{
          background: 'rgba(124, 58, 237, 0.08)',
          color: 'var(--primary-color)',
          fontSize: '11px',
          fontWeight: 700,
          padding: '6px 12px',
          borderRadius: '12px',
          border: '1px solid rgba(124, 58, 237, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Clock size={11} />
          <span>{currentTimeString || '--:--:--'}</span>
        </div>
      </div>

      {/* Premium Tab Selector */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        background: '#f3f0f7', 
        borderRadius: '20px', 
        padding: '3px',
        border: '1px solid #eae5f0'
      }}>
        <button
          onClick={() => setActiveSubTab('live')}
          style={{
            padding: '7px 0',
            borderRadius: '16px',
            border: 'none',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            backgroundColor: activeSubTab === 'live' ? '#fff' : 'transparent',
            color: activeSubTab === 'live' ? 'var(--primary-color)' : 'var(--text-secondary)',
            boxShadow: activeSubTab === 'live' ? '0 2px 6px rgba(124,58,237,0.1)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <CalendarIcon size={12} />
          <span>Classes</span>
        </button>
        <button
          onClick={() => setActiveSubTab('assignments')}
          style={{
            padding: '7px 0',
            borderRadius: '16px',
            border: 'none',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            backgroundColor: activeSubTab === 'assignments' ? '#fff' : 'transparent',
            color: activeSubTab === 'assignments' ? 'var(--primary-color)' : 'var(--text-secondary)',
            boxShadow: activeSubTab === 'assignments' ? '0 2px 6px rgba(124,58,237,0.1)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <FileText size={12} />
          <span>Assignments</span>
        </button>
      </div>

      {/* ─── CLASSES & PREMIUM CALENDAR ─── */}
      {activeSubTab === 'live' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-in">
          
          {/* PREMIUM CALENDAR CARD */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '18px', 
            border: '1px solid #ede9f4', 
            padding: '14px',
            boxShadow: '0 4px 16px rgba(58,32,72,0.03)'
          }}>
            {/* Header / Month Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {currentMonthLabel}
              </h3>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button 
                  onClick={handlePrevMonth}
                  style={{
                    border: '1px solid #ede9f4', background: '#fff', width: '26px', height: '26px',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-secondary)'
                  }}
                  className="click-press"
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  onClick={handleNextMonth}
                  style={{
                    border: '1px solid #ede9f4', background: '#fff', width: '26px', height: '26px',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-secondary)'
                  }}
                  className="click-press"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Week Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px' }}>
              {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day, idx) => (
                <span key={idx} style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  {day}
                </span>
              ))}
            </div>

            {/* Calendar dynamic days grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px 4px', textAlign: 'center' }}>
              {calendarCells.map((cell, idx) => {
                const dayClasses = getClassesForDate(cell.date);
                const isSelected = isCellSelected(cell.date);
                const isToday = isCellToday(cell.date);
                const hasLive = dayClasses.some(c => c.isLive);
                
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDate(cell.date)}
                    className="click-press"
                    style={{
                      aspectRatio: '1',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundColor: isSelected 
                        ? 'var(--primary-color)' 
                        : isToday 
                          ? 'rgba(202, 186, 97, 0.15)' 
                          : 'transparent',
                      border: isToday && !isSelected ? '1px solid var(--secondary-color)' : '1px solid transparent',
                      color: isSelected 
                        ? '#fff' 
                        : !cell.isCurrentMonth 
                          ? 'var(--text-muted)' 
                          : 'var(--text-primary)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '10.5px', fontWeight: isToday || isSelected ? 800 : 500 }}>
                      {cell.dayNum}
                    </span>

                    {/* Dot indicators */}
                    {dayClasses.length > 0 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '4px',
                        display: 'flex',
                        gap: '2px'
                      }}>
                        <span style={{
                          width: '3.5px',
                          height: '3.5px',
                          borderRadius: '50%',
                          backgroundColor: isSelected 
                            ? '#fff' 
                            : hasLive 
                              ? '#10b981' 
                              : 'var(--secondary-color)'
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CLASSES DETAILS FOR SELECTED DATE */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '18px', 
            border: '1px solid #ede9f4', 
            padding: '14px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 600 }}>
                {selectedDayClasses.length} Scheduled
              </span>
            </div>

            {selectedDayClasses.length === 0 ? (
              <div style={{ padding: '24px 10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={22} style={{ color: 'var(--text-muted)' }} />
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>No classes scheduled for this date.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedDayClasses.map((cls) => (
                  <div key={cls.id} style={{
                    border: '1px solid #ede9f4',
                    borderRadius: '12px',
                    padding: '12px',
                    background: '#faf9fc',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 800, color: 'var(--primary-color)' }}>
                        <Clock size={11} />
                        <span>{cls.time} {cls.ampm || 'PM'}</span>
                      </div>
                      {cls.isLive && (
                        <span style={{
                          fontSize: '8px',
                          fontWeight: 800,
                          backgroundColor: '#10b981',
                          color: '#fff',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          textTransform: 'uppercase'
                        }}>Live</span>
                      )}
                    </div>

                    <div>
                      <h4 style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 3px 0' }}>
                        {cls.title}
                      </h4>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        Instructor: {cls.teacher}
                      </span>
                    </div>

                    <button 
                      onClick={() => onSelectCourse(cls.courseId)}
                      className="click-press"
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        fontSize: '11px',
                        fontWeight: 700,
                        borderRadius: '8px',
                        border: 'none',
                        background: cls.isLive ? 'var(--secondary-color)' : 'var(--primary-color)',
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      {cls.isLive ? 'Join Live Lecture' : 'Open Course'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ─── ASSIGNMENTS VIEW ─── */}
      {activeSubTab === 'assignments' && (
        <div className="animate-fade-in">
          <Assignments 
            assignments={assignments} 
            setAssignments={setAssignments} 
            setOverallProgress={setOverallProgress} 
          />
        </div>
      )}


    </div>
  );
}
