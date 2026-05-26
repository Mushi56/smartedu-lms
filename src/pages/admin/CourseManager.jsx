import React, { useState } from 'react';
import { PlusCircle, Edit3, Trash2, BookOpen, Clock, Video, Tag, Check } from 'lucide-react';

export default function CourseManager({ courses, setCourses }) {
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
  // New Course fields
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Development');
  const [newTeacher, setNewTeacher] = useState('Dr. Vivek Sharma');
  const [newPrice, setNewPrice] = useState('49.00');

  // Syllabus fields
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('15:00');
  const [newLessonVideo, setNewLessonVideo] = useState('https://www.w3schools.com/html/movie.mp4');

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const courseObj = {
      id: `course-${Date.now()}`,
      title: newTitle,
      teacher: newTeacher,
      progress: 0,
      enrolledDate: "May 26, 2026",
      price: parseFloat(newPrice) || 49.00,
      chaptersCount: 0,
      studentsCount: 0,
      category: newCategory,
      modules: []
    };

    setCourses([courseObj, ...courses]);
    setNewTitle('');
    setIsAddingCourse(false);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    if (selectedCourseId === id) setSelectedCourseId(null);
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim() || !selectedCourseId) return;

    const updated = courses.map(c => {
      if (c.id === selectedCourseId) {
        return {
          ...c,
          modules: [...c.modules, { id: `m-${Date.now()}`, title: newModuleTitle, lessons: [] }]
        };
      }
      return c;
    });

    setCourses(updated);
    setNewModuleTitle('');
  };

  const handleAddLesson = (e, moduleId) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !selectedCourseId) return;

    const updated = courses.map(c => {
      if (c.id === selectedCourseId) {
        const updatedModules = c.modules.map(m => {
          if (m.id === moduleId) {
            return {
              ...m,
              lessons: [...m.lessons, {
                id: `l-${Date.now()}`,
                title: newLessonTitle,
                duration: newLessonDuration,
                videoUrl: newLessonVideo
              }]
            };
          }
          return m;
        });

        // Compute total chapters count
        const chaptersCount = updatedModules.flatMap(m => m.lessons).length;

        return { ...c, modules: updatedModules, chaptersCount };
      }
      return c;
    });

    setCourses(updated);
    setNewLessonTitle('');
    setNewLessonDuration('15:00');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Course Manager</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Create courses, upload recorded classes, and manage syllabus modules</p>
        </div>
        
        {!isAddingCourse && !selectedCourseId && (
          <button 
            onClick={() => setIsAddingCourse(true)} 
            className="btn-primary click-press"
          >
            <PlusCircle size={16} />
            <span>Create New Course</span>
          </button>
        )}
      </div>

      {/* Main Grid: List on Left, Syllabus Workspace on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* ADD COURSE FORM MODE */}
        {isAddingCourse ? (
          <div className="smart-card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', textAlign: 'left' }}>Create New Course</h3>
            <form onSubmit={handleAddCourseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Course Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. React Native Fundamentals" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="Development">Development</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Course Price ($)</label>
                  <input 
                    type="number" 
                    value={newPrice} 
                    onChange={(e) => setNewPrice(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Instructor Name</label>
                <input 
                  type="text" 
                  value={newTeacher} 
                  onChange={(e) => setNewTeacher(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAddingCourse(false)} 
                  className="btn-secondary click-press"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary click-press">
                  Save and Publish
                </button>
              </div>
            </form>
          </div>
        ) : selectedCourseId ? (
          // SYLLABUS AND MODULE WORKSPACE EDITOR MODE
          <div className="smart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Syllabus Editor: {selectedCourse.title}</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Instructor: {selectedCourse.teacher} • Price: ${selectedCourse.price}</p>
              </div>
              <button 
                onClick={() => setSelectedCourseId(null)} 
                className="btn-secondary click-press"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                Back to List
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {/* Add Module Box */}
              <div className="smart-card" style={{ padding: '16px', backgroundColor: 'var(--bg-app)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, textAlign: 'left', marginBottom: '12px' }}>Add Chapter/Module</h4>
                <form onSubmit={handleAddModule} style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    placeholder="Chapter Title..." 
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}
                  />
                  <button type="submit" className="btn-primary click-press" style={{ padding: '8px 16px', fontSize: '12px' }}>
                    Add Module
                  </button>
                </form>
              </div>

              {/* Modules List and Lesson Uploader */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedCourse.modules.length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>No chapters created yet. Add your first chapter above.</p>
                ) : (
                  selectedCourse.modules.map((mod) => (
                    <div key={mod.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', textAlign: 'left' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '12px' }}>
                        {mod.title}
                      </h4>

                      {/* Add Lesson Form Inside Module */}
                      <form 
                        onSubmit={(e) => handleAddLesson(e, mod.id)}
                        style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}
                      >
                        <input 
                          type="text" 
                          placeholder="Lesson Title..." 
                          value={newLessonTitle}
                          onChange={(e) => setNewLessonTitle(e.target.value)}
                          style={{ flex: 1, minWidth: '150px', padding: '6px 10px', fontSize: '11px' }}
                        />
                        <input 
                          type="text" 
                          placeholder="Duration (e.g. 15:00)..." 
                          value={newLessonDuration}
                          onChange={(e) => setNewLessonDuration(e.target.value)}
                          style={{ width: '100px', padding: '6px 10px', fontSize: '11px' }}
                        />
                        <button type="submit" className="btn-primary click-press" style={{ padding: '6px 12px', fontSize: '11px' }}>
                          Add Video
                        </button>
                      </form>

                      {/* Lessons List in Module */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {mod.lessons.map((les) => (
                          <div 
                            key={les.id} 
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              padding: '8px 12px', 
                              backgroundColor: 'var(--bg-app)', 
                              borderRadius: '6px',
                              fontSize: '12px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Video size={12} style={{ color: 'var(--primary-color)' }} />
                              <span style={{ fontWeight: 600 }}>{les.title}</span>
                            </div>
                            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{les.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          // COURSES LIST VIEW
          <div className="upcoming-classes-list">
            {courses.map((course) => (
              <div key={course.id} className="upcoming-class-row animate-fade-in" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, textAlign: 'left' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px' }}>{course.title}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      Category: {course.category} • Instructor: {course.teacher} • Price: **${course.price}**
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    <span>{course.modules.length} Chapters</span>
                    <span>{course.studentsCount} Students</span>
                  </div>

                  <button 
                    onClick={() => setSelectedCourseId(course.id)}
                    className="btn-primary click-press"
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    <Edit3 size={12} />
                    <span>Edit Syllabus</span>
                  </button>

                  <button 
                    onClick={() => handleDeleteCourse(course.id)}
                    className="btn-secondary click-press"
                    style={{ padding: '8px 12px', color: 'var(--status-danger)', borderColor: 'rgba(239,68,68,0.2)' }}
                    title="Delete Course"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
