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
        return isCellToday(cellDate);
      }
      if (cls.date === formattedCell) return true;
      const monthShort = cellDate.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = cellDate.getDate();
      if (cls.date === `${monthShort} ${dayNum}`) return true;
      return false;
    });
  };

  const selectedDayClasses = getClassesForDate(selectedDate);
  const calendarCells = getCalendarCells();
  const currentMonthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const premiumCard = {
    background: '#ffffff',
    borderRadius: '24px',
    border: '1px solid rgba(0,0,0,0.02)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
    padding: '20px',
    position: 'relative'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
      
      {/* Dynamic Header with Real-Time Clock */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>Schedule</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 550 }}>
            Manage your classes, assignments, and test dates.
          </p>
        </div>
        <div style={{
          background: 'rgba(99, 102, 241, 0.06)',
          color: 'var(--primary-color)',
          fontSize: '11px',
          fontWeight: 800,
          padding: '8px 14px',
          borderRadius: '14px',
          border: '1px solid rgba(99, 102, 241, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Clock size={13} />
          <span>{currentTimeString || '--:--:--'}</span>
        </div>
      </div>

      {/* Tab Selector */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        background: '#f1f5f9', 
        borderRadius: '20px', 
        padding: '4px',
        border: '1px solid rgba(0,0,0,0.02)'
      }}>
        <button
          onClick={() => setActiveSubTab('live')}
          className="click-press"
          style={{
            padding: '8px 0',
            borderRadius: '16px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: activeSubTab === 'live' ? '#fff' : 'transparent',
            color: activeSubTab === 'live' ? 'var(--primary-color)' : 'var(--text-secondary)',
            boxShadow: activeSubTab === 'live' ? '0 4px 10px rgba(0,0,0,0.04)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <CalendarIcon size={14} />
          <span>Classes</span>
        </button>
        <button
          onClick={() => setActiveSubTab('assignments')}
          className="click-press"
          style={{
            padding: '8px 0',
            borderRadius: '16px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: activeSubTab === 'assignments' ? '#fff' : 'transparent',
            color: activeSubTab === 'assignments' ? 'var(--primary-color)' : 'var(--text-secondary)',
            boxShadow: activeSubTab === 'assignments' ? '0 4px 10px rgba(0,0,0,0.04)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <FileText size={14} />
          <span>Assignments</span>
        </button>
      </div>

      {/* CLASSES & CALENDAR */}
      {activeSubTab === 'live' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
          
          {/* CALENDAR CARD */}
          <div style={{ ...premiumCard }}>
            {/* Month Selector Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {currentMonthLabel}
              </h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button 
                  onClick={handlePrevMonth}
                  style={{
                    border: '1px solid rgba(0,0,0,0.04)', background: '#fff', width: '30px', height: '30px',
                    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-secondary)', boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                  className="click-press"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNextMonth}
                  style={{
                    border: '1px solid rgba(0,0,0,0.04)', background: '#fff', width: '30px', height: '30px',
                    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-secondary)', boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                  className="click-press"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Week Labels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '10px' }}>
              {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day, idx) => (
                <span key={idx} style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  {day}
                </span>
              ))}
            </div>

            {/* Calendar Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px 6px', textAlign: 'center' }}>
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
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundColor: isSelected 
                        ? 'var(--primary-color)' 
                        : isToday 
                          ? 'rgba(99, 102, 241, 0.08)' 
                          : 'transparent',
                      border: isToday && !isSelected ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
                      color: isSelected 
                        ? '#fff' 
                        : !cell.isCurrentMonth 
                          ? 'var(--text-muted)' 
                          : 'var(--text-primary)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: isToday || isSelected ? 800 : 600 }}>
                      {cell.dayNum}
                    </span>

                    {/* Indicators */}
                    {dayClasses.length > 0 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '5px',
                        display: 'flex',
                        gap: '2px'
                      }}>
                        <span style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: isSelected 
                            ? '#fff' 
                            : hasLive 
                              ? '#ef4444' 
                              : 'var(--primary-color)'
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CLASSES FOR SELECTED DAY */}
          <div style={{ ...premiumCard }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>
                {selectedDayClasses.length} Scheduled
              </span>
            </div>

            {selectedDayClasses.length === 0 ? (
              <div style={{ padding: '30px 10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <AlertCircle size={20} />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 550 }}>No classes scheduled for this date.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedDayClasses.map((cls) => (
                  <div key={cls.id} style={{
                    border: '1px solid rgba(0,0,0,0.03)',
                    borderRadius: '16px',
                    padding: '16px',
                    background: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.01)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: 'var(--primary-color)' }}>
                        <Clock size={13} />
                        <span>{cls.time} {cls.ampm || 'PM'}</span>
                      </div>
                      {cls.isLive && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(239, 68, 68, 0.1)', padding: '2px 8px', borderRadius: '8px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                          <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: 800, letterSpacing: '0.5px' }}>LIVE</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                        {cls.title}
                      </h4>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 550 }}>
                        Instructor: {cls.teacher}
                      </span>
                    </div>

                    <button 
                      onClick={() => onSelectCourse(cls.courseId)}
                      className="click-press"
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        fontSize: '12px',
                        fontWeight: 800,
                        borderRadius: '12px',
                        border: 'none',
                        background: cls.isLive ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'var(--primary-color)',
                        color: '#fff',
                        cursor: 'pointer',
                        boxShadow: cls.isLive ? '0 4px 12px rgba(239,68,68,0.2)' : '0 4px 12px rgba(99,102,241,0.15)',
                        transition: 'all 0.2s'
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

      {/* ASSIGNMENTS VIEW */}
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
