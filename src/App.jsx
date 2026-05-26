import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AiPanel from './components/AiPanel';
import { getDB, saveDB } from './data/mockData';

// Student Page Imports
import StudentDashboard from './pages/student/Dashboard';
import MyCourses from './pages/student/MyCourses';
import CourseDetail from './pages/student/CourseDetail';
import VideoPlayer from './pages/student/VideoPlayer';
import StudentQuizzes from './pages/student/Quizzes';
import StudentAssignments from './pages/student/Assignments';
import StudentSchedule from './pages/student/Schedule';
import StudentProgress from './pages/student/Progress';
import StudentProfile from './pages/student/Profile';

// Admin Page Imports
import AdminDashboard from './pages/admin/Dashboard';
import CourseManager from './pages/admin/CourseManager';
import ClassScheduler from './pages/admin/ClassScheduler';
import AdminQuizManager from './pages/admin/QuizManager';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';

import './App.css';

export default function App() {
  // 1. Role and Navigation State
  const [currentPortal, setCurrentPortal] = useState('student'); // 'student' or 'admin'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 2. Course Selection Navigation States
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [viewState, setViewState] = useState('list'); // 'list', 'detail', 'player'

  // 3. Central Reactive Database Persistence State
  const [db, setDb] = useState(() => getDB());
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('smartedu_api_key') || '');

  // Synchronize dynamic updates back into the persistent localStorage database
  useEffect(() => {
    saveDB(db);
  }, [db]);

  // Synchronize developer credentials
  useEffect(() => {
    localStorage.setItem('smartedu_api_key', apiKey);
  }, [apiKey]);

  // Theme Sync on Initial Load
  useEffect(() => {
    const activeTheme = localStorage.getItem('smartedu_theme') || 'light';
    setTheme(activeTheme);
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, []);

  const handleSetTheme = (nextTheme) => {
    setTheme(nextTheme);
    localStorage.setItem('smartedu_theme', nextTheme);
  };

  // State modifiers
  const setCourses = (updatedCourses) => {
    setDb(prev => ({ ...prev, courses: updatedCourses }));
  };

  const setClasses = (updatedClasses) => {
    setDb(prev => ({ ...prev, classes: updatedClasses }));
  };

  const setStudents = (updatedStudents) => {
    setDb(prev => ({ ...prev, students: updatedStudents }));
  };

  const setQuizzes = (updatedQuizzes) => {
    setDb(prev => ({ ...prev, quizzes: updatedQuizzes }));
  };

  const setAssignments = (updatedAssignments) => {
    setDb(prev => ({ ...prev, assignments: updatedAssignments }));
  };

  const setOverallProgress = (progressVal) => {
    const nextVal = typeof progressVal === 'function' ? progressVal(db.overallProgress) : progressVal;
    setDb(prev => ({ ...prev, overallProgress: nextVal }));
  };

  const markAllNotificationsRead = () => {
    const updated = db.notifications.map(n => ({ ...n, read: true }));
    setDb(prev => ({ ...prev, notifications: updated }));
  };

  // Actions routing
  const handleSelectCourseFromCard = (courseId) => {
    setSelectedCourseId(courseId);
    setViewState('detail');
    setActiveTab('courses'); // Redirect navigation target to courses in sidebar
  };

  const handleStartLesson = (courseId, lessonId) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(lessonId);
    setViewState('player');
  };

  const handleCompleteLesson = (courseId, lessonId) => {
    // Boost progress of completed course
    const updatedCourses = db.courses.map(c => {
      if (c.id === courseId) {
        const nextProgress = Math.min(100, c.progress + 15);
        return { ...c, progress: nextProgress };
      }
      return c;
    });
    setCourses(updatedCourses);

    // Calculate next overall progress average
    const totalProgSum = updatedCourses.reduce((acc, c) => acc + c.progress, 0);
    const avgOverall = Math.round(totalProgSum / updatedCourses.length);
    setOverallProgress(avgOverall);
  };

  // RENDER DYNAMIC PAGES based on portal and activeTab state
  const renderContent = () => {
    // ---------------- STUDENT PORTAL ROUTER ----------------
    if (currentPortal === 'student') {
      switch (activeTab) {
        case 'dashboard':
          return (
            <StudentDashboard 
              courses={db.courses} 
              classes={db.classes} 
              streak={db.streak}
              overallProgress={db.overallProgress}
              setActiveTab={setActiveTab}
              onSelectCourse={handleSelectCourseFromCard}
            />
          );
        
        case 'courses':
          if (viewState === 'player' && selectedCourseId && selectedLessonId) {
            return (
              <VideoPlayer 
                courseId={selectedCourseId}
                initialLessonId={selectedLessonId}
                courses={db.courses}
                onBack={() => setViewState('detail')}
                onCompleteLesson={handleCompleteLesson}
              />
            );
          }
          if (viewState === 'detail' && selectedCourseId) {
            return (
              <CourseDetail 
                courseId={selectedCourseId}
                courses={db.courses}
                onBack={() => setViewState('list')}
                onStartLesson={handleStartLesson}
              />
            );
          }
          return (
            <MyCourses 
              courses={db.courses} 
              onSelectCourse={handleSelectCourseFromCard} 
            />
          );

        case 'live-classes':
          return (
            <StudentSchedule 
              classes={db.classes} 
              onSelectCourse={handleSelectCourseFromCard} 
            />
          );

        case 'schedule':
          return (
            <StudentSchedule 
              classes={db.classes} 
              onSelectCourse={handleSelectCourseFromCard} 
            />
          );

        case 'assignments':
          return (
            <StudentAssignments 
              assignments={db.assignments} 
              setAssignments={setAssignments}
              setOverallProgress={setOverallProgress}
            />
          );

        case 'quizzes':
          return (
            <StudentQuizzes 
              quizzes={db.quizzes} 
              streak={db.streak}
              overallProgress={db.overallProgress}
              setOverallProgress={setOverallProgress}
            />
          );

        case 'ai-tutor':
          return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: '680px', margin: '0 auto' }}>
              <AiPanel 
                streak={db.streak} 
                overallProgress={db.overallProgress}
                apiKey={apiKey}
                onTriggerQuiz={() => setActiveTab('quizzes')}
              />
            </div>
          );

        case 'notes':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>AI-Generated Revision Notes</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Your study tutor automatically structures notes from lessons you stream. Open individual videos to examine generated definitions and syllabus guides.
              </p>
            </div>
          );

        case 'progress':
          return (
            <StudentProgress 
              courses={db.courses} 
              streak={db.streak}
              overallProgress={db.overallProgress}
            />
          );

        case 'certificates':
          return (
            <StudentProgress 
              courses={db.courses} 
              streak={db.streak}
              overallProgress={db.overallProgress}
            />
          );

        case 'messages':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Student Messaging Center</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Connect directly with instructors and peers. Use the **AI Tutor** tab for instant doubt resolution!</p>
            </div>
          );

        case 'settings':
          return (
            <StudentProfile 
              apiKey={apiKey} 
              setApiKey={setApiKey} 
            />
          );

        default:
          return <div>Page Coming Soon</div>;
      }
    }

    // ---------------- ADMIN PORTAL ROUTER ----------------
    if (currentPortal === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return (
            <AdminDashboard 
              courses={db.courses} 
              classes={db.classes} 
              students={db.students} 
              setActiveTab={setActiveTab}
            />
          );

        case 'courses':
          return (
            <CourseManager 
              courses={db.courses} 
              setCourses={setCourses} 
            />
          );

        case 'live-classes':
          return (
            <ClassScheduler 
              classes={db.classes} 
              setClasses={setClasses} 
              courses={db.courses}
            />
          );

        case 'students':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Student Directory</h3>
              <div className="smart-table-wrapper" style={{ marginTop: '20px' }}>
                <table className="smart-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Class</th>
                      <th>Enrolled On</th>
                      <th>Grade Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.students.map(s => (
                      <tr key={s.id}>
                        <td td="true" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.course}</td>
                        <td>{s.enrolledOn}</td>
                        <td style={{ fontWeight: 700, color: 'var(--status-success)' }}>94% Avg</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

        case 'teachers':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Teacher Faculty Directory</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <li style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>Dr. Vivek Sharma</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Senior Professor of Computer Science & Algorithmic Systems</span>
                  </div>
                  <span className="status-pill success">Active</span>
                </li>
                <li style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>Dr. Neha Verma</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Lead Research Scientist in Machine Learning & AI Models</span>
                  </div>
                  <span className="status-pill success">Active</span>
                </li>
              </ul>
            </div>
          );

        case 'enrollments':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Transaction Ledger</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Review all courses tuition, billing registries, and receipts.</p>
            </div>
          );

        case 'assignments':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Coursework Submissions Panel</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Observe homework deadlines, view answers sent by students, and configure grader settings.</p>
            </div>
          );

        case 'quizzes':
          return (
            <AdminQuizManager 
              quizzes={db.quizzes} 
              setQuizzes={setQuizzes} 
            />
          );

        case 'announcements':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Announcements Center</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Broadcast platform-wide updates or schedule alerts directly inside the navigation head.</p>
            </div>
          );

        case 'analytics':
          return <AdminAnalytics />;

        case 'settings':
          return (
            <AdminSettings 
              apiKey={apiKey} 
              setApiKey={setApiKey} 
            />
          );

        default:
          return <div>Administrative Page Coming Soon</div>;
      }
    }
  };

  return (
    <div className="app-container">
      {/* 1. Left Navigation Sidebar Adaptable to portals roles */}
      <Sidebar 
        currentPortal={currentPortal} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* 2. Main content viewport layout */}
      <div className="main-layout">
        <Navbar 
          currentPortal={currentPortal} 
          setCurrentPortal={setCurrentPortal} 
          setActiveTab={setActiveTab} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={db.notifications}
          markAllNotificationsRead={markAllNotificationsRead}
          theme={theme}
          setTheme={handleSetTheme}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        {/* Scrollable workspace */}
        <main className="content-scrollable">
          <div className="dashboard-grid student-layout">
            
            {/* The primary content view based on tabs */}
            <div className="dashboard-main-content">
              {renderContent()}
            </div>

            {/* Right sidebar ONLY mounted on Student Dashboard panel view */}
            {currentPortal === 'student' && activeTab === 'dashboard' && (
              <AiPanel 
                streak={db.streak} 
                overallProgress={db.overallProgress}
                apiKey={apiKey}
                onTriggerQuiz={() => setActiveTab('quizzes')}
              />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
