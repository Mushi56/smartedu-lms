import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AiPanel from './components/AiPanel';
import { getDB, saveDB } from './data/mockData';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
import StudentResources from './pages/student/Resources';
import StudentMessages from './pages/student/Messages';
import StudentPayments from './pages/student/Payments';
import StudentFavorites from './pages/student/Favorites';
import StudentNotes from './pages/student/Notes';

// Admin Page Imports
import AdminDashboard from './pages/admin/Dashboard';
import CourseManager from './pages/admin/CourseManager';
import ClassScheduler from './pages/admin/ClassScheduler';
import AdminQuizManager from './pages/admin/QuizManager';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';

// Public Page Imports
import PublicLayout from './layouts/PublicLayout';
import Homepage from './pages/public/Homepage';
import Login from './pages/public/Login';
import AccessDenied from './pages/public/AccessDenied';

import './App.css';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Extract path info
  const pathParts = location.pathname.split('/');
  const rawPortal = pathParts[1] || 'public'; // 'student', 'admin', 'super-admin'
  const currentPortal = (rawPortal === 'super-admin' || rawPortal === 'admin') ? 'admin' : 'student';
  const activeTab = pathParts[2] || 'dashboard';

  const setActiveTab = (tabId) => {
    navigate(`/${rawPortal}/${tabId}`);
  };

  const setCurrentPortal = (portal) => {
    navigate(`/${portal}/dashboard`);
  };

  // 1. Navigation & Search States
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

        case 'resources':
          return <StudentResources />;

        case 'notes':
          return <StudentNotes />;

        case 'progress':
        case 'certificates':
          return (
            <StudentProgress 
              courses={db.courses} 
              streak={db.streak}
              overallProgress={db.overallProgress}
            />
          );

        case 'messages':
          return <StudentMessages />;

        case 'payments':
          return <StudentPayments />;

        case 'favorites':
          return <StudentFavorites courses={db.courses} onSelectCourse={handleSelectCourseFromCard} />;

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
              initialView="list"
            />
          );

        case 'add-course':
          return (
            <CourseManager 
              courses={db.courses} 
              setCourses={setCourses} 
              initialView="create"
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

        case 'users':
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
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.students.map(s => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.course}</td>
                        <td>{s.enrolledOn}</td>
                        <td style={{ fontWeight: 600 }}>{s.amount}</td>
                        <td><span className="status-pill success">{s.status}</span></td>
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
                    <strong style={{ fontSize: '14px', display: 'block' }}>Dr. Ahmed Al-Hassan</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Senior SAT & Test Prep Instructor</span>
                  </div>
                  <span className="status-pill success">Active</span>
                </li>
                <li style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>Ms. Sarah Johnson</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>IELTS Speaking & Writing Coach</span>
                  </div>
                  <span className="status-pill success">Active</span>
                </li>
                <li style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>Ms. Lisa Park</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>TOEFL iBT & Academic English Expert</span>
                  </div>
                  <span className="status-pill success">Active</span>
                </li>
                <li style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>Dr. Michael Chen</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>GRE Quantitative Reasoning Specialist</span>
                  </div>
                  <span className="status-pill success">Active</span>
                </li>
              </ul>
            </div>
          );

        case 'exams':
        case 'quizzes':
          return (
            <AdminQuizManager 
              quizzes={db.quizzes} 
              setQuizzes={setQuizzes} 
            />
          );

        case 'orders':
        case 'enrollments':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Orders & Payments</h3>
              <div className="smart-table-wrapper" style={{ marginTop: '20px' }}>
                <table className="smart-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.students.map(s => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
                        <td>{s.course}</td>
                        <td style={{ fontWeight: 600 }}>{s.amount}</td>
                        <td>{s.enrolledOn}</td>
                        <td><span className="status-pill success">{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

        case 'reports':
        case 'analytics':
          return <AdminAnalytics />;

        case 'reviews':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Course Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {db.students.slice(0, 3).map((s, i) => (
                  <div key={s.id} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '13px' }}>{s.name}</strong>
                      <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 700 }}>{'⭐'.repeat(4 + (i % 2))} {4 + (i % 2)}.0</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                      {s.course} — Excellent course content and well-structured lessons. The instructor explains concepts very clearly.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'coupons':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Coupons & Discounts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {[
                  { code: 'WELCOME25', discount: '25% Off', desc: 'First-time student discount', expires: 'Jun 30, 2026', status: 'Active' },
                  { code: 'SUMMER2026', discount: '15% Off', desc: 'Summer enrollment special', expires: 'Aug 31, 2026', status: 'Active' },
                  { code: 'BUNDLE10', discount: '10% Off', desc: 'Course bundle discount', expires: 'Dec 31, 2026', status: 'Active' },
                ].map((c) => (
                  <div key={c.code} style={{ padding: '16px', border: '1px dashed var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <code style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-color)', backgroundColor: 'rgba(58,32,72,0.06)', padding: '4px 10px', borderRadius: '6px' }}>{c.code}</code>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#2BA84A' }}>{c.discount}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{c.desc} • Expires: {c.expires}</span>
                    </div>
                    <span className="status-pill success">{c.status}</span>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'resources':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Platform Resources</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Manage downloadable course materials and study resources.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['SAT Math Formula Sheet', 'IELTS Writing Samples', 'GRE Quant Formula Sheet', 'TOEFL Vocabulary List'].map((name, i) => (
                  <div key={i} style={{ padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PDF</span>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'assignments':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Assignment Management</h3>
              <div className="smart-table-wrapper" style={{ marginTop: '16px' }}>
                <table className="smart-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Course</th>
                      <th>Due Date</th>
                      <th>Submissions</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.assignments.map(a => (
                      <tr key={a.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</td>
                        <td>{a.course}</td>
                        <td>{a.dueDate}</td>
                        <td>{a.status === 'Graded' ? '5/5' : '3/5'}</td>
                        <td><span className={`status-pill ${a.status === 'Graded' ? 'success' : 'warning'}`}>{a.status === 'Graded' ? 'Graded' : 'Open'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

        case 'announcements':
          return (
            <div className="smart-card text-left" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Announcements Center</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Broadcast platform-wide updates or schedule alerts.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {db.notifications.map(n => (
                  <div key={n.id} style={{ padding: '14px 16px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: n.read ? 'transparent' : 'rgba(58,32,72,0.02)' }}>
                    <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-primary)', fontWeight: n.read ? 400 : 600 }}>{n.text}</p>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          );

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

  const renderPortalContainer = () => {
    return (
      <div className="app-container">
        {/* 1. Left Navigation Sidebar Adaptable to portals roles */}
        <Sidebar 
          currentPortal={rawPortal}
          setCurrentPortal={setCurrentPortal}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          theme={theme}
          setTheme={handleSetTheme}
        />

        {/* 2. Main content viewport layout */}
        <div className="main-layout">
          <Navbar 
            currentPortal={rawPortal} 
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
            <div className="dashboard-main-content" style={{ width: '100%' }}>
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={
        <PublicLayout 
          onGetStarted={() => {
            if (isAuthenticated && user) {
              navigate(user.role === 'super-admin' ? '/super-admin/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
            } else {
              navigate('/login');
            }
          }}
          onGoAdmin={() => navigate('/admin/dashboard')}
          onGoStudent={() => navigate('/student/dashboard')}
        >
          <Homepage onGetStarted={() => {
            if (isAuthenticated && user) {
              navigate(user.role === 'super-admin' ? '/super-admin/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
            } else {
              navigate('/login');
            }
          }} />
        </PublicLayout>
      } />

      <Route path="/login" element={<Login />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      {/* Student Protected Portal */}
      <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/student/:tab" element={
        <ProtectedRoute allowedRoles={['student']}>
          {renderPortalContainer()}
        </ProtectedRoute>
      } />

      {/* Admin Protected Portal */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/:tab" element={
        <ProtectedRoute allowedRoles={['admin']}>
          {renderPortalContainer()}
        </ProtectedRoute>
      } />

      {/* Super Admin Protected Portal */}
      <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
      <Route path="/super-admin/:tab" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          {renderPortalContainer()}
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
