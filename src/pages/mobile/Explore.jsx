import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Play, BookOpen, Clock, Star, ArrowLeft, Download, ShieldCheck } from 'lucide-react';

export default function Explore({ db, setDb, onCourseSelect, currentCourse, viewState, setViewState }) {
  const { courses = [] } = db;
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

    // Save to global db
    setDb(prev => {
      const nextDB = { ...prev, courses: updatedCourses };
      const totalProgSum = updatedCourses.reduce((acc, cr) => acc + cr.progress, 0);
      nextDB.overallProgress = Math.round(totalProgSum / updatedCourses.length);
      return nextDB;
    });
  };

  const premiumCard = {
    background: '#ffffff',
    borderRadius: '20px',
    border: '1px solid rgba(0,0,0,0.02)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    padding: '16px',
    position: 'relative'
  };

  // ---------------- VIEW 1: DISCOVER / LISTING ----------------
  if (viewState === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
        
        {/* Header */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>Discover Courses</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>
            Find the perfect modules, lessons, and classes for you.
          </p>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          background: '#fff', border: '1px solid rgba(0,0,0,0.03)', borderRadius: '16px',
          padding: '12px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search courses or teachers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: 'none', background: 'none', outline: 'none',
              fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-primary)', flex: 1,
              fontWeight: 500
            }}
          />
        </div>

        {/* Level Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Difficulty Level</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className="click-press"
                  style={{
                    padding: '8px 14px',
                    borderRadius: '16px',
                    backgroundColor: isSelected ? 'var(--primary-color)' : '#fff',
                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 750,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 12px rgba(99,102,241,0.2)' : '0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</span>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="hide-scrollbar">
            {['All', 'Test Prep', 'Language', 'STEM', 'Arts'].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="click-press"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '16px',
                    backgroundColor: isSelected ? 'var(--primary-color)' : '#fff',
                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 750,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? '0 4px 12px rgba(99,102,241,0.2)' : '0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Card Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
          {filteredCourses.map((c, idx) => {
            const thumbnails = [
              'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
            ];
            return (
              <div
                key={c.id}
                onClick={() => onCourseSelect(c)}
                className="click-press"
                style={{ 
                  ...premiumCard,
                  padding: '12px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'row', 
                  gap: '14px',
                  alignItems: 'center'
                }}
              >
                <div style={{ width: '84px', height: '84px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img 
                    src={c.thumbnail || thumbnails[idx % thumbnails.length]} 
                    alt={c.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {c.title}
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 550, marginTop: '2px', display: 'block' }}>{c.teacher}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                    <span style={{ fontSize: '10px', background: 'rgba(99,102,241,0.06)', color: 'var(--primary-color)', padding: '4px 8px', borderRadius: '10px', fontWeight: 800 }}>
                      {c.progress}% done
                    </span>
                    
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#f59e0b', fontWeight: 800 }}>
                      <Star size={12} fill="#f59e0b" stroke="none" /> {c.rating || '4.8'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredCourses.length === 0 && (
            <div style={{ padding: '40px', color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 600 }}>
              No courses found matching your filters.
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------- VIEW 2: COURSE SYLLABUS DETAIL ----------------
  if (viewState === 'detail' && currentCourse) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-slide-up">
        {/* Back navigation */}
        <div>
          <button
            onClick={() => setViewState('list')}
            className="click-press"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#ffffff', border: '1px solid rgba(0,0,0,0.04)', 
              padding: '8px 16px', borderRadius: '14px', fontSize: '12px',
              fontWeight: 800, color: 'var(--text-secondary)', cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <ArrowLeft size={14} /> <span>Back to Courses</span>
          </button>
        </div>

        {/* Thumbnail Hero */}
        <div style={{ ...premiumCard, padding: '0px', overflow: 'hidden' }}>
          <div style={{ height: '150px', position: 'relative' }}>
            <img 
              src={currentCourse.thumbnail} 
              alt={currentCourse.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }} />
            <h3 style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#fff', fontSize: '18px', fontWeight: 800, margin: 0, lineHeight: 1.3, letterSpacing: '-0.5px' }}>
              {currentCourse.title}
            </h3>
          </div>

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>
              <span>Instructor: <strong>{currentCourse.teacher}</strong></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontWeight: 800 }}>
                <Star size={12} fill="#f59e0b" stroke="none" /> {currentCourse.rating || '4.8'} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({currentCourse.reviews || '840'})</span>
              </span>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 550, margin: 0 }}>
              {currentCourse.description}
            </p>
          </div>
        </div>

        {/* Curriculum Modules list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Course Syllabus</h4>

          {currentCourse.modules?.map((mod) => {
            const isExpanded = expandedModuleId === mod.id;
            return (
              <div 
                key={mod.id} 
                style={{ 
                  border: '1px solid rgba(0,0,0,0.03)', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  background: '#ffffff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.01)'
                }}
              >
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
                    background: isExpanded ? 'rgba(99,102,241,0.03)' : '#fcfcfd',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{mod.title}</span>
                  {isExpanded ? <ChevronUp size={16} style={{ color: 'var(--text-secondary)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />}
                </button>

                {/* Lesson collapse list */}
                {isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.03)', background: '#ffffff' }}>
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson)}
                        style={{
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid rgba(0,0,0,0.02)',
                          cursor: 'pointer'
                        }}
                        className="click-press"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: lesson.completed ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.08)',
                            color: lesson.completed ? '#10b981' : 'var(--primary-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Play size={10} fill="currentColor" style={{ marginLeft: '1px' }} />
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{lesson.title}</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 550 }}>{lesson.duration}</span>
                          </div>
                        </div>

                        {lesson.completed && (
                          <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-slide-up">
        {/* Back navigation */}
        <div>
          <button
            onClick={() => setViewState('detail')}
            className="click-press"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#ffffff', border: '1px solid rgba(0,0,0,0.04)', 
              padding: '8px 16px', borderRadius: '14px', fontSize: '12px',
              fontWeight: 800, color: 'var(--text-secondary)', cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <ArrowLeft size={14} /> <span>Exit Player</span>
          </button>
        </div>

        {/* Video Player view */}
        <div style={{ ...premiumCard, padding: '0px', overflow: 'hidden', background: '#000' }}>
          <div style={{ position: 'relative', width: '100%', height: '190px' }}>
            <video
              src={activeLesson.videoUrl}
              controls
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              poster={currentCourse.thumbnail}
            />
          </div>
          <div style={{ padding: '16px', background: '#ffffff' }}>
            <span style={{ fontSize: '9px', color: 'var(--primary-color)', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>NOW PLAYING</span>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px', marginBottom: '2px', lineHeight: 1.3 }}>{activeLesson.title}</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', fontWeight: 550 }}>Course: {currentCourse.title}</span>
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
            className="click-press"
            style={{ 
              flex: 1, backgroundColor: '#10b981', color: '#fff', border: 'none',
              padding: '12px', borderRadius: '16px', fontSize: '12px', fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 4px 12px rgba(16,185,129,0.2)'
            }}
          >
            <ShieldCheck size={16} /> Mark Complete
          </button>
          
          <button
            onClick={() => alert("Mock study slides PDF downloaded to device.")}
            className="click-press"
            style={{ 
              flex: 0.8, backgroundColor: '#ffffff', color: 'var(--text-secondary)', border: '1px solid rgba(0,0,0,0.04)',
              padding: '12px', borderRadius: '16px', fontSize: '12px', fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <Download size={14} /> Slides
          </button>
        </div>

        {/* Description tabs */}
        <div style={{ ...premiumCard }}>
          <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px 0' }}>Lesson Notes</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 550, margin: 0 }}>
            This class covers core concepts of the module. Watch the video, review the study formulas PDF attached above, and test your skills in the AI Tutor companion tab.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
