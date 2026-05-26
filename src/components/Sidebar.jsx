import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  Calendar, 
  FileText, 
  CheckSquare, 
  MessageSquare, 
  Notebook, 
  TrendingUp, 
  Award, 
  MessageCircle, 
  Settings,
  Users,
  GraduationCap,
  Volume2,
  BarChart2,
  Clock,
  Activity,
  CreditCard,
  Crown,
  X
} from 'lucide-react';

export default function Sidebar({ currentPortal, activeTab, setActiveTab, mobileSidebarOpen, setMobileSidebarOpen }) {
  const isStudent = currentPortal === 'student';

  const studentLinks = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', name: 'My Courses', icon: BookOpen },
    { id: 'live-classes', name: 'Live Classes', icon: Video },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'quizzes', name: 'Quizzes', icon: CheckSquare },
    { id: 'ai-tutor', name: 'AI Tutor', icon: MessageSquare, badge: 'New' },
    { id: 'notes', name: 'Notes', icon: Notebook },
    { id: 'progress', name: 'Progress', icon: TrendingUp },
    { id: 'certificates', name: 'Certificates', icon: Award },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const adminLinks = [
    { group: 'MANAGE', items: [
      { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
      { id: 'courses', name: 'Courses', icon: BookOpen },
      { id: 'live-classes', name: 'Live Classes', icon: Video },
      { id: 'students', name: 'Students', icon: Users },
      { id: 'teachers', name: 'Teachers', icon: Users },
      { id: 'enrollments', name: 'Enrollments', icon: CreditCard },
      { id: 'assignments', name: 'Assignments', icon: FileText },
      { id: 'quizzes', name: 'Quizzes', icon: CheckSquare },
      { id: 'certificates', name: 'Certificates', icon: Award }
    ]},
    { group: 'COMMUNICATION', items: [
      { id: 'messages', name: 'Messages', icon: MessageCircle },
      { id: 'announcements', name: 'Announcements', icon: Volume2 }
    ]},
    { group: 'REPORTS & ANALYTICS', items: [
      { id: 'analytics', name: 'Analytics', icon: BarChart2 },
      { id: 'attendance', name: 'Attendance', icon: Clock },
      { id: 'performance', name: 'Performance', icon: Activity }
    ]},
    { group: 'SETTINGS', items: [
      { id: 'settings', name: 'Settings', icon: Settings },
      { id: 'subscription', name: 'Subscription', icon: CreditCard }
    ]}
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (setMobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Background backdrop overlay for mobile view */}
      {mobileSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${!isStudent ? 'dark-bg' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Brand Header */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            {isStudent ? <MessageSquare size={20} /> : <GraduationCap size={20} />}
          </div>
          <div className="logo-text-wrapper">
            <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>EduSmart</span>
            <span className="logo-subtitle">
              {isStudent ? 'Learn. Grow. Succeed.' : 'Admin Panel'}
            </span>
          </div>

          {/* Close button inside sidebar on mobile */}
          <button 
            onClick={() => setMobileSidebarOpen(false)} 
            className="sidebar-close-btn click-press"
            title="Close Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu">
          {isStudent ? (
            // Student Simple Menu
            studentLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`nav-link click-press ${activeTab === link.id ? 'active' : ''}`}
                >
                  <div className="nav-link-content">
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && <span className="nav-badge new">{link.badge}</span>}
                </button>
              );
            })
          ) : (
            // Admin Grouped Menu
            adminLinks.map((group, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="menu-group-label">{group.group}</span>
                {group.items.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleTabClick(link.id)}
                      className={`nav-link click-press ${activeTab === link.id ? 'active' : ''}`}
                    >
                      <div className="nav-link-content">
                        <Icon size={16} />
                        <span style={{ fontSize: '13px' }}>{link.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </nav>

        {/* Upgrade Banner hidden per user request
        <div className="upgrade-card animate-fade-in">
          <Crown size={22} style={{ color: '#7c3aed', marginBottom: '8px' }} />
          <h4>Upgrade to Premium</h4>
          <p>Unlock all premium features and get unlimited access.</p>
          <button className="upgrade-btn click-press">Upgrade Now</button>
        </div>
        */}
      </aside>
    </>
  );
}
