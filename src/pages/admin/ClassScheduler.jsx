import React, { useState } from 'react';
import { Video, PlusCircle, Trash2, Calendar, Clock, User, AlertCircle, Check } from 'lucide-react';

export default function ClassScheduler({ classes, setClasses, courses }) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState('Dr. Vivek Sharma');
  const [date, setDate] = useState('2026-05-26');
  const [time, setTime] = useState('10:00');
  const [ampm, setAmpm] = useState('am');
  const [isLive, setIsLive] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Get date labels
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthStr = months[dateObj.getMonth()];
    
    // Is today?
    const todayStr = new Date().toISOString().split('T')[0];
    const dateLabel = date === todayStr ? 'Today' : `${day} ${monthStr}`;

    const newClass = {
      id: `class-${Date.now()}`,
      title,
      teacher,
      courseId: selectedCourseId,
      time,
      ampm,
      date,
      dateLabel,
      isLive
    };

    setClasses([newClass, ...classes]);
    setTitle('');
    setIsAdding(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Class Scheduler</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Schedule live video lectures, manage course calendars, and monitor attendance metrics</p>
        </div>

        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="btn-primary click-press"
          >
            <PlusCircle size={16} />
            <span>Schedule Live Class</span>
          </button>
        )}
      </div>

      {/* Grid: Form on Left, Current Schedules on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* ADD LECTURE FORM */}
        {isAdding ? (
          <div className="smart-card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', textAlign: 'left' }}>Schedule Live Lecture</h3>
            <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Select Associated Course</label>
                <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Lecture Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Advanced Doubly Linked Lists" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Instructor Name</label>
                  <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Scheduled Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Time</label>
                  <input type="text" placeholder="10:00" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Period</label>
                  <select value={ampm} onChange={(e) => setAmpm(e.target.value)}>
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                  </select>
                </div>

                <div className="form-group" style={{ justifyContent: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '16px' }}>
                    <input 
                      type="checkbox" 
                      checked={isLive}
                      onChange={(e) => setIsLive(e.target.checked)}
                      style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>Mark as Live now</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)} 
                  className="btn-secondary click-press"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary click-press">
                  Schedule Class
                </button>
              </div>
            </form>
          </div>
        ) : (
          // CURRENT LIST VIEW
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {success && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '8px', backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success)', fontSize: '13px', fontWeight: 600 }}>
                <Check size={16} />
                <span>Live Lecture scheduled successfully! Switched directly into the shared database.</span>
              </div>
            )}

            {classes.length === 0 ? (
              <div className="smart-card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <AlertCircle size={32} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
                <p style={{ fontSize: '13px' }}>No live classes or sessions scheduled yet.</p>
              </div>
            ) : (
              <div className="upcoming-classes-list">
                {classes.map((cls) => (
                  <div key={cls.id} className="upcoming-class-row animate-fade-in" style={{ padding: '20px' }}>
                    <div className="class-time-block">
                      <span className="class-time">{cls.time}</span>
                      <span className="class-ampm">{cls.ampm}</span>
                    </div>

                    <div className="class-info-block" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Video size={18} />
                      </div>
                      <div>
                        <span className="class-title" style={{ fontSize: '15px', fontWeight: 700, display: 'block' }}>{cls.title}</span>
                        <p className="class-instructor" style={{ fontSize: '11px' }}>
                          Instructor: {cls.teacher} • Date: {cls.dateLabel}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {cls.isLive ? (
                        <span className="live-indicator-pill">Live Stream</span>
                      ) : (
                        <span className="status-pill pending" style={{ padding: '4px 10px', fontSize: '11px' }}>Scheduled</span>
                      )}
                      
                      <button 
                        onClick={() => handleDeleteClass(cls.id)}
                        className="btn-secondary click-press"
                        style={{ padding: '8px 12px', color: 'var(--status-danger)', borderColor: 'rgba(239,68,68,0.2)' }}
                        title="Cancel Class"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
