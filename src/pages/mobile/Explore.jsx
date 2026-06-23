import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Play, BookOpen, Clock, Star, ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import VerificationBadge from '../../components/VerificationBadge';

export default function Explore({ db, setDb, onCourseSelect, currentCourse, viewState, setViewState }) {
  const { courses = [] } = db;

  const getTeacherStatus = (teacherName) => {
    const teacher = db.teachers?.find(t => t.name === teacherName);
    return teacher ? teacher.verificationStatus : 'teacher';
  };
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Accordion state for modules
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  // Filter Logic
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.teacher.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const toggleModule = (id) => {
    setExpandedModuleId(prev => prev === id ? null : id);
  };

  const handleLessonSelect = (lesson) => {
    setActiveLesson(lesson);
    setViewState('player');
  };

  const markLessonComplete = (lessonId, courseId) => {
    const updatedCourses = courses.map(c => {
      if (c.id === courseId) {
        // Mark lesson completed
        const updatedMods = c.modules.map(m => {
          const updatedLessons = m.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l);
          return { ...m, lessons: updatedLessons };
        });
        
        // Calculate new progress percentage
        const totalLessons = updatedMods.reduce((sum, m) => sum + m.lessons.length, 0);
        const completedCount = updatedMods.reduce((sum, m) => sum + m.lessons.filter(l => l.completed).length, 0);
        const nextProgress = Math.round((completedCount / totalLessons) * 100);

        return { ...c, modules: updatedMods, progress: nextProgress };
      }
      return c;
    });

    // Save to global reactive db state
    setDb(prev => {
      const nextDB = { ...prev, courses: updatedCourses };
      const totalProgSum = updatedCourses.reduce((acc, cr) => acc + cr.progress, 0);
      nextDB.overallProgress = Math.round(totalProgSum / updatedCourses.length);
      return nextDB;
    });
  };

  // ---------------- VIEW 1: DISCOVER / LISTING ----------------
  if (viewState === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
        
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Search size={16} /></span>
          <input
            type="text"
            className="mobile-input"
            placeholder="Search courses or teachers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
        </div>

        {/* Level Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Difficulty Level</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className="click-press"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    backgroundColor: isSelected ? 'var(--secondary-color)' : 'var(--bg-input)',
                    color: isSelected ? 'var(--primary-color)' : 'var(--text-primary)',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Category</span>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="hide-scrollbar">
            {['All', 'Test Prep', 'Language', 'STEM', 'Arts'].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="click-press"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '16px',
                    backgroundColor: isSelected ? 'var(--primary-color)' : 'var(--bg-input)',
                    color: isSelected ? '#fff' : 'var(--text-primary)',
                    border: isSelected ? 'none' : '1px solid var(--border-color)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Card Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              onClick={() => onCourseSelect(c)}
              className="mobile-card click-press"
              style={{ padding: '0px', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'row', height: '100px' }}
            >
              <div style={{ width: '90px', background: 'var(--primary-color)', flexShrink: 0 }}>
                <img 
                  src={c.thumbnail} 
                  alt={c.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', justify: 'space-between', flex: 1, minWidth: 0, textAlign: 'left' }}>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.title}
                  </h4>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {c.teacher}
                    <VerificationBadge status={getTeacherStatus(c.teacher)} size={11} />
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                  <span style={{ fontSize: '10px', background: 'rgba(202, 186, 97, 0.15)', color: 'var(--secondary-color)', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                    {c.progress}% done
                  </span>
                  
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', color: '#f59e0b', fontWeight: 750 }}>
                    <Star size={11} fill="#f59e0b" stroke="none" /> {c.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div style={{ padding: '40px', color: 'var(--text-muted)', textAlign: 'center' }}>
              No courses found match filters.
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------- VIEW 2: COURSE SYLLABUS DETAIL ----------------
  if (viewState === 'detail' && currentCourse) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-slide-up">
        {/* Back navigation */}
        <button
          onClick={() => setViewState('list')}
          style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12.5px' }}
        >
          <ArrowLeft size={16} /> Back to Courses
        </button>

        {/* Thumbnail Hero */}
        <div className="mobile-card" style={{ padding: '0px', overflow: 'hidden' }}>
          <div style={{ height: '140px', position: 'relative' }}>
            <img 
              src={currentCourse.thumbnail} 
              alt={currentCourse.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />
            <h3 style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', color: '#fff', fontSize: '15px', fontWeight: 800, textAlign: 'left' }}>
              {currentCourse.title}
            </h3>
          </div>

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Instructor: <strong>{currentCourse.teacher}</strong>
                <VerificationBadge status={getTeacherStatus(currentCourse.teacher)} size={11} />
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontWeight: 700 }}>
                <Star size={11} fill="#f59e0b" stroke="none" /> {currentCourse.rating} ({currentCourse.reviews} reviews)
              </span>
            </div>

            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {currentCourse.description}
            </p>
          </div>
        </div>

        {/* Curriculum Modules list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Course Syllabus</h4>

          {currentCourse.modules?.map((mod) => {
            const isExpanded = expandedModuleId === mod.id;
            return (
              <div key={mod.id} className="mobile-card" style={{ padding: '0px', overflow: 'hidden' }}>
                {/* Header accordion */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)' }}>{mod.title}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {/* Lesson collapse grid */}
                {isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson)}
                        style={{
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid var(--border-color)',
                          cursor: 'pointer'
                        }}
                        className="click-press"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: lesson.completed ? 'var(--secondary-color)' : 'rgba(255,255,255,0.2)',
                            color: lesson.completed ? 'var(--primary-color)' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Play size={10} fill="currentColor" />
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{lesson.title}</span>
                            <span style={{ display: 'block', fontSize: '9.5px', color: 'var(--text-muted)' }}>{lesson.duration}</span>
                          </div>
                        </div>

                        {lesson.completed && (
                          <span style={{ fontSize: '9px', background: 'rgba(43,168,74,0.12)', color: 'var(--accent-green)', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                            Done
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- VIEW 3: MODULAR VIDEO PLAYER ----------------
  if (viewState === 'player' && currentCourse && activeLesson) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-slide-up">
        {/* Back navigation */}
        <button
          onClick={() => setViewState('detail')}
          style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12.5px' }}
        >
          <ArrowLeft size={16} /> Exit Player
        </button>

        {/* Video Player view */}
        <div className="mobile-card" style={{ padding: '0px', overflow: 'hidden', background: '#000' }}>
          <div style={{ position: 'relative', width: '100%', height: '190px' }}>
            <video
              src={activeLesson.videoUrl}
              controls
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              poster={currentCourse.thumbnail}
            />
          </div>
          <div style={{ padding: '16px', textAlign: 'left', background: 'var(--bg-card)' }}>
            <span style={{ fontSize: '9.5px', color: 'var(--secondary-color)', fontWeight: 700, textTransform: 'uppercase' }}>NOW WATCHING</span>
            <h3 style={{ fontSize: '14px', fontWeight: 850, color: 'var(--text-primary)', marginTop: '2px' }}>{activeLesson.title}</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Course: {currentCourse.title}</span>
          </div>
        </div>

        {/* Action Controls & Resource Links */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              markLessonComplete(activeLesson.id, currentCourse.id);
              alert("Lesson marked completed! Overall progress updated.");
              setViewState('detail');
            }}
            className="mobile-btn-primary click-press"
            style={{ flex: 1, backgroundColor: 'var(--accent-green)', color: '#fff' }}
          >
            <ShieldCheck size={16} /> Mark Complete
          </button>
          
          <button
            onClick={() => alert("Mock study slides PDF downloaded to device.")}
            className="mobile-btn-secondary click-press"
            style={{ flex: 0.8 }}
          >
            <Download size={14} /> Slides
          </button>
        </div>

        {/* Description tabs */}
        <div className="mobile-card" style={{ textAlign: 'left', gap: '8px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Lesson Notes</h4>
          <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            This class covers core concepts of the module. Watch the video, review the study formulas PDF attached above, and test your skills in the AI Tutor companion tab.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
