import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, Compass, Cpu, CheckSquare, User, 
  Bell, LogOut, X, Sun, Moon, Sparkles, MessageSquare, Menu,
  Users, ShoppingBag, BookOpen
} from 'lucide-react';
import MobileDeviceFrame from './components/MobileDeviceFrame';
import { getMobileDB, saveMobileDB } from './data/mobileData';

// Mobile Screens
import Onboarding from './pages/mobile/Onboarding';
import Auth from './pages/mobile/Auth';
import Home from './pages/mobile/Home';
import Explore from './pages/mobile/Explore';
import AiTutor from './pages/mobile/AiTutor';
import Tasks from './pages/mobile/Tasks';
import Profile from './pages/mobile/Profile';

// App Drawer Component
import AppDrawer from './components/AppDrawer';

// Student Portal Views
import StudentDashboard from './pages/student/Dashboard';
import MyCourses from './pages/student/MyCourses';
import Schedule from './pages/student/Schedule';
import Assignments from './pages/student/Assignments';
import Resources from './pages/student/Resources';
import Messages from './pages/student/Messages';
import Progress from './pages/student/Progress';
import Payments from './pages/student/Payments';
import Favorites from './pages/student/Favorites';
import BecomeInstructor from './pages/student/BecomeInstructor';

// Admin Portal Views
import AdminDashboard from './pages/admin/Dashboard';
import CourseManager from './pages/admin/CourseManager';
import ClassScheduler from './pages/admin/ClassScheduler';
import QuizManager from './pages/admin/QuizManager';
import CategoryTagManager from './pages/admin/CategoryTagManager';
import Analytics from './pages/admin/Analytics';
import TeacherManager from './pages/admin/TeacherManager';
import Settings from './pages/admin/Settings';

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    return localStorage.getItem('suriatech_mobile_onboarded') === 'true';
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('suriatech_mobile_authenticated') === 'true';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('suriatech_mobile_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  
  // App Drawer & Portal State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPortal, setCurrentPortal] = useState(() => {
    const saved = localStorage.getItem('suriatech_mobile_user');
    if (saved) {
      const u = JSON.parse(saved);
      return u.role === 'admin' || u.role === 'super-admin' ? 'admin' : 'student';
    }
    return 'student';
  });

  // Mock states for quizzes, assignments, and students
  const [quizzes, setQuizzes] = useState([
    {
      topic: 'Recursion Basics',
      questions: [
        {
          question: `What is the base case in a recursive function?`,
          options: [
            "The condition that terminates the recursive loop",
            "The main block of code executing recursive calls",
            "The initial function parameter value",
            "The memory address of the recursion stack"
          ],
          answer: 0,
          explanation: "The base case is the essential condition in a recursive function that stops further recursive calls, preventing infinite loops and stack overflow."
        }
      ]
    }
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 'a1',
      title: 'Assignment 1: Singly Linked List Reversal',
      course: 'Python for Beginners & Data Science',
      dueDate: 'June 30, 2026',
      status: 'Pending',
      problemDescription: 'Implement a function reverse_linked_list(head) that reverses a singly linked list in-place with O(1) auxiliary space complexity.',
      aiNotes: 'Hint: Keep track of three pointers: prev, curr, and next.',
      grade: null,
      aiFeedback: null
    },
    {
      id: 'a2',
      title: 'Assignment 2: SAT Quadratic Assessment',
      course: 'SAT Math Mastery Accelerator',
      dueDate: 'July 05, 2026',
      status: 'Graded',
      problemDescription: 'Solve ax^2 + bx + c = 0 for various parameter settings, validating real roots and outputs.',
      aiNotes: 'Excellent work. Time complexity checks passed.',
      grade: 'A (96%)',
      aiFeedback: 'Your solution is correct.'
    }
  ]);

  const [students, setStudents] = useState([
    { id: 's1', name: 'Aisha Al-Otaibi', email: 'aisha@example.com', role: 'Student', time: '5 mins ago', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=100' },
    { id: 's2', name: 'Khalid Mansoor', email: 'khalid@example.com', role: 'Student', time: '1 hour ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
    { id: 's3', name: 'Dr. Vivek Sharma', email: 'vivek@example.com', role: 'Teacher', time: '3 hours ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' }
  ]);
  
  // Mobile Reactive Database
  const [db, setDb] = useState(() => getMobileDB());
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('suriatech_mobile_apikey') || '');

  // Sub-navigation state for Explore tab
  const [currentCourse, setCurrentCourse] = useState(null);
  const [exploreViewState, setExploreViewState] = useState('list'); // 'list', 'detail', 'player'
  
  // Custom notifications modal
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sync DB state to LocalStorage
  useEffect(() => {
    saveMobileDB(db);
  }, [db]);

  // Sync theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('suriatech_mobile_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleSetTheme = (nextTheme) => {
    setTheme(nextTheme);
    localStorage.setItem('suriatech_mobile_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPortal(userData.role === 'admin' || userData.role === 'super-admin' ? 'admin' : 'student');
    localStorage.setItem('suriatech_mobile_authenticated', 'true');
    localStorage.setItem('suriatech_mobile_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPortal('student');
    localStorage.removeItem('suriatech_mobile_authenticated');
    localStorage.removeItem('suriatech_mobile_user');
    setActiveTab('home');
    setDrawerOpen(false);
  };

  const handleCompleteOnboarding = () => {
    setOnboardingComplete(true);
    localStorage.setItem('suriatech_mobile_onboarded', 'true');
  };

  const handleSelectCourse = (course) => {
    setCurrentCourse(course);
    setExploreViewState('detail');
    setActiveTab('explore');
  };

  const handleSelectLiveClass = (liveClass) => {
    alert(`Connecting to Live Stream webinar for: ${liveClass.title}\nHost: ${liveClass.teacher}\nStatus: Launching stream viewer.`);
  };

  const markAllNotificationsRead = () => {
    setDb(prev => {
      const updated = prev.notifications.map(n => ({ ...n, read: true }));
      return { ...prev, notifications: updated };
    });
  };

  // Render current active tab viewport
  const renderTabContent = () => {
    switch (activeTab) {
      // Mobile Tab Bar default views
      case 'home':
        return (
          <Home 
            db={db}
            user={user}
            currentPortal={currentPortal}
            onSelectCourse={handleSelectCourse}
            onSelectLiveClass={handleSelectLiveClass}
            onSelectTab={setActiveTab}
            onOpenDrawer={() => setDrawerOpen(true)}
          />
        );
      case 'explore':
        return (
          <Explore 
            db={db}
            setDb={setDb}
            currentCourse={currentCourse}
            onCourseSelect={setCurrentCourse}
            viewState={exploreViewState}
            setViewState={setExploreViewState}
          />
        );
      case 'ai':
        return (
          <AiTutor 
            apiKey={apiKey}
          />
        );
      case 'tasks':
        return (
          <Tasks 
            db={db}
            setDb={setDb}
          />
        );
      case 'profile':
        return (
          <Profile 
            db={db}
            setDb={setDb}
            apiKey={apiKey}
            setApiKey={(key) => {
              setApiKey(key);
              localStorage.setItem('suriatech_mobile_apikey', key);
            }}
            theme={theme}
            setTheme={handleSetTheme}
          />
        );

      // Student sidebar views
      case 'dashboard':
        return currentPortal === 'admin' ? (
          <AdminDashboard 
            courses={db.courses} 
            classes={db.classes} 
            students={students} 
            setActiveTab={setActiveTab} 
          />
        ) : (
          <StudentDashboard 
            courses={db.courses} 
            classes={db.classes} 
            streak={db.streak} 
            overallProgress={db.overallProgress} 
            setActiveTab={setActiveTab} 
            onSelectCourse={handleSelectCourse} 
          />
        );
      case 'courses':
        return currentPortal === 'admin' ? (
          <CourseManager 
            courses={db.courses} 
            setDb={setDb} 
          />
        ) : (
          <MyCourses 
            courses={db.courses} 
            onSelectCourse={handleSelectCourse} 
          />
        );
      case 'live-classes':
      case 'schedule-class':
      case 'class-recordings':
      case 'live-categories':
      case 'live-settings':
        return currentPortal === 'admin' ? (
          <ClassScheduler 
            classes={db.classes} 
            setClasses={(newClasses) => {
              setDb(prev => ({ ...prev, classes: typeof newClasses === 'function' ? newClasses(prev.classes) : newClasses }));
            }} 
            courses={db.courses} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        ) : (
          <Schedule 
            classes={db.classes} 
            onSelectCourse={handleSelectCourse} 
          />
        );
      case 'schedule':
        return (
          <Schedule 
            classes={db.classes} 
            onSelectCourse={handleSelectCourse} 
          />
        );
      case 'assignments':
        return (
          <Assignments 
            assignments={assignments} 
            setAssignments={setAssignments} 
            setOverallProgress={(newProgress) => {
              setDb(prev => {
                const nextVal = typeof newProgress === 'function' ? newProgress(prev.overallProgress) : newProgress;
                return { ...prev, overallProgress: nextVal };
              });
            }} 
          />
        );
      case 'resources':
        return (
          <Resources />
        );
      case 'messages':
        return (
          <Messages />
        );
      case 'progress':
      case 'certificates':
        return (
          <Progress 
            courses={db.courses} 
            streak={db.streak} 
            overallProgress={db.overallProgress} 
          />
        );
      case 'payments':
        return (
          <Payments />
        );
      case 'favorites':
        return (
          <Favorites />
        );
      case 'become-instructor':
        return (
          <BecomeInstructor db={db} setDb={setDb} />
        );
      case 'settings':
        return currentPortal === 'admin' ? (
          <Settings 
            apiKey={apiKey} 
            setApiKey={(key) => {
              setApiKey(key);
              localStorage.setItem('suriatech_mobile_apikey', key);
            }} 
          />
        ) : (
          <Profile 
            db={db}
            setDb={setDb}
            apiKey={apiKey}
            setApiKey={(key) => {
              setApiKey(key);
              localStorage.setItem('suriatech_mobile_apikey', key);
            }}
            theme={theme}
            setTheme={handleSetTheme}
          />
        );

      // Admin specific sidebar views
      case 'users':
      case 'teachers':
        return (
          <TeacherManager db={db} setDb={setDb} />
        );
      case 'categories':
        return (
          <CategoryTagManager />
        );
      case 'exams':
        return (
          <QuizManager 
            quizzes={quizzes} 
            setQuizzes={setQuizzes} 
          />
        );
      case 'orders':
        return (
          <div className="smart-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Orders & Payments History</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Track sales transactions, refund requests, and invoice records.</p>
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', border: '1.5px dashed var(--border-color)', borderRadius: '12px', marginTop: '20px' }}>
              No orders registered this period.
            </div>
          </div>
        );
      case 'reports':
        return (
          <Analytics />
        );
      case 'reviews':
        return (
          <div className="smart-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Reviews & Feedback</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Moderate course reviews and student feedback ratings.</p>
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', border: '1.5px dashed var(--border-color)', borderRadius: '12px', marginTop: '20px' }}>
              No review moderation requests active.
            </div>
          </div>
        );
      case 'coupons':
        return (
          <div className="smart-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Coupons & Promotions</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Manage promotional discount codes, validity dates and discount values.</p>
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', border: '1.5px dashed var(--border-color)', borderRadius: '12px', marginTop: '20px' }}>
              No active promotion campaigns configured.
            </div>
          </div>
        );
      case 'announcements':
        return (
          <div className="smart-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Announcements & Broadcasts</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Broadcast announcements to specific student classes or teacher circles.</p>
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', border: '1.5px dashed var(--border-color)', borderRadius: '12px', marginTop: '20px' }}>
              No announcements active.
            </div>
          </div>
        );

      default:
        return <div>Portal Coming Soon</div>;
    }
  };

  // Unread notifications counter
  const unreadCount = db.notifications?.filter(n => !n.read).length || 0;

  return (
    <MobileDeviceFrame>
      <div className="mobile-app-viewport">
        
        {/* Onboarding Flow */}
        {!onboardingComplete ? (
          <Onboarding onComplete={handleCompleteOnboarding} />
        ) : !isAuthenticated ? (
          // Auth Gate Flow
          <Auth onLoginSuccess={handleLoginSuccess} />
        ) : (
          // Main App Viewport
          <div className="app-layout-container">
            {/* App Drawer Component */}
            <AppDrawer
              isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              user={user}
              currentPortal={currentPortal}
              setCurrentPortal={setCurrentPortal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              theme={theme}
              setTheme={handleSetTheme}
              logout={handleLogout}
            />

            <div className="app-main-layout">
              {/* Top Toolbar / Status Bar Area */}
              {activeTab !== 'home' && (
                <header style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-card)',
                  borderBottom: '1px solid var(--border-color)',
                  height: '52px',
                  zIndex: 90
                }}>
                  {/* Profile overview indicator with hamburger menu trigger */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => setDrawerOpen(true)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '4px', display: 'flex', alignItems: 'center' }}
                      className="click-press header-hamburger"
                      title="Open Navigation Menu"
                    >
                      <Menu size={20} />
                    </button>
                    <img 
                      src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"} 
                      alt="Avatar" 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {user?.name || 'Omar'}
                    </span>
                  </div>

                  {/* Alert & Logout actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Notification bell */}
                    <button 
                      onClick={() => {
                        setNotificationsOpen(true);
                        markAllNotificationsRead();
                      }}
                      className="click-press"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', color: 'var(--text-primary)' }}
                    >
                      <Bell size={18} />
                      {unreadCount > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '-4px',
                          background: 'var(--accent-red)',
                          color: '#fff',
                          fontSize: '8px',
                          fontWeight: 800,
                          borderRadius: '50%',
                          width: '14px',
                          height: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Logout trigger */}
                    <button
                      onClick={handleLogout}
                      className="click-press"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                      title="Sign Out"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                </header>
              )}

              {/* Core scrollable panel views */}
              <main className="mobile-content-container">
                {renderTabContent()}
              </main>

              {/* Bottom Nav Bar */}
              <nav className="bottom-nav">
                {currentPortal === 'admin' ? (
                  <>
                    <button
                      onClick={() => {
                        setActiveTab('home');
                      }}
                      className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <HomeIcon size={18} />
                      </div>
                      <span>Home</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('courses');
                      }}
                      className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <BookOpen size={18} />
                      </div>
                      <span>Courses</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('users');
                      }}
                      className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <Users size={18} />
                      </div>
                      <span>Students</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('orders');
                      }}
                      className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <ShoppingBag size={18} />
                      </div>
                      <span>Orders</span>
                    </button>

                    <button
                      onClick={() => {
                        setDrawerOpen(true);
                      }}
                      className="nav-item"
                    >
                      <div className="nav-icon-wrapper">
                        <Menu size={18} />
                      </div>
                      <span>More</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setActiveTab('home');
                      }}
                      className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <HomeIcon size={18} />
                      </div>
                      <span>Home</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('explore');
                        setExploreViewState('list'); // reset internal state
                      }}
                      className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <Compass size={18} />
                      </div>
                      <span>Discover</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('ai');
                      }}
                      className={`nav-item ${activeTab === 'ai' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <Cpu size={18} />
                        <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: 'var(--secondary-color)', width: '6px', height: '6px', borderRadius: '50%' }} />
                      </div>
                      <span>AI Tutor</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('tasks');
                      }}
                      className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <CheckSquare size={18} />
                      </div>
                      <span>Tasks</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setCurrentCourse(null); // Reset cert viewer
                      }}
                      className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    >
                      <div className="nav-icon-wrapper">
                        <User size={18} />
                      </div>
                      <span>Profile</span>
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}

        {/* Sliding Bottom Sheet Notifications Drawer */}
        {notificationsOpen && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          className="animate-fade-in"
          onClick={() => setNotificationsOpen(false)}
          >
            <div style={{
              width: '100%',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px 24px 0 0',
              padding: '20px 16px calc(24px + var(--safe-bottom)) 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: '70%',
              textAlign: 'left'
            }}
            className="animate-slide-up"
            onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 850, color: 'var(--text-primary)' }}>System Notifications</h3>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }} className="hide-scrollbar">
                {db.notifications?.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      padding: '12px', 
                      borderRadius: '10px', 
                      border: '1px solid var(--border-color)', 
                      backgroundColor: 'var(--bg-app)' 
                    }}
                  >
                    <p style={{ fontSize: '11.5px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                      {item.text}
                    </p>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </MobileDeviceFrame>
  );
}
