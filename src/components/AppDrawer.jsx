import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Video, Calendar, FileText, Notebook, 
  MessageCircle, TrendingUp, CreditCard, Award, Heart, Crown, Settings,
  Users, CheckSquare, BarChart2, Star, Ticket, Volume2, ChevronRight, ChevronDown, X,
  Sun, Moon, ShieldAlert
} from 'lucide-react';

export default function AppDrawer({ 
  isOpen, 
  onClose, 
  user, 
  currentPortal, 
  setCurrentPortal, 
  activeTab, 
  setActiveTab, 
  theme, 
  setTheme, 
  logout 
}) {
  const [openSubmenu, setOpenSubmenu] = useState(null); // 'courses' or 'live-classes' or null

  const isStudent = currentPortal === 'student';
  const hasAdminPrivileges = user?.role === 'admin' || user?.role === 'super-admin';

  const studentLinks = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', name: 'My Courses', icon: BookOpen },
    { id: 'live-classes', name: 'Live Classes', icon: Video },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'resources', name: 'My Resources', icon: Notebook },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'progress', name: 'My Progress', icon: TrendingUp },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'certificates', name: 'Certificates', icon: Award },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'become-instructor', name: 'Become an Instructor', icon: Crown },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const adminLinks = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'Users', icon: Users, hasChevron: true },
    { id: 'teachers', name: 'Teachers', icon: Users, hasChevron: true },
    { 
      id: 'courses-parent', 
      name: 'Courses', 
      icon: BookOpen,
      submenu: [
        { id: 'courses', name: 'All Courses' },
        { id: 'add-course', name: 'Add New Course' },
        { id: 'categories', name: 'Categories' },
        { id: 'tags', name: 'Tags' },
        { id: 'levels', name: 'Levels' }
      ]
    },
    { 
      id: 'live-classes-parent', 
      name: 'Live Classes', 
      icon: Video,
      submenu: [
        { id: 'live-classes', name: 'All Live Classes' },
        { id: 'schedule-class', name: 'Schedule a Class' },
        { id: 'class-recordings', name: 'Class Recordings' },
        { id: 'live-categories', name: 'Categories' },
        { id: 'live-settings', name: 'Settings' }
      ]
    },
    { id: 'exams', name: 'Exams', icon: CheckSquare },
    { id: 'orders', name: 'Orders & Payments', icon: CreditCard },
    { id: 'reports', name: 'Reports', icon: BarChart2, hasChevron: true },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'coupons', name: 'Coupons', icon: Ticket },
    { id: 'resources', name: 'Resources', icon: Notebook },
    { id: 'announcements', name: 'Announcements', icon: Volume2 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const activeLinks = isStudent ? studentLinks : adminLinks;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  const toggleSubmenu = (menuId) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  const handlePortalSwitch = () => {
    const nextPortal = currentPortal === 'student' ? 'admin' : 'student';
    setCurrentPortal(nextPortal);
    setActiveTab('dashboard'); // Reset tab to dashboard on switch
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="drawer-overlay" 
          onClick={onClose}
        />
      )}

      {/* Sliding app drawer */}
      <div className={`app-drawer ${isOpen ? 'drawer-open' : ''}`}>
        
        {/* Drawer Header & Profile Summary */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <img 
              src={user?.avatar || (isStudent ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100")} 
              alt="Profile" 
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-color)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {user?.name || (isStudent ? 'Omar Hassan' : 'Admin User')}
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 600 }}>
                {user?.role === 'super-admin' ? 'Super Admin' : user?.role === 'admin' ? 'Admin' : 'Student'}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
            className="drawer-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Body */}
        <div className="drawer-body hide-scrollbar">
          
          {/* Quick Tab Options for Mobile Compatibility */}
          <div className="drawer-section-title">Quick Views</div>
          <button
            onClick={() => handleTabClick('home')}
            className={`drawer-link ${activeTab === 'home' ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LayoutDashboard size={16} />
              <span>Mobile Home</span>
            </div>
          </button>
          <button
            onClick={() => handleTabClick('explore')}
            className={`drawer-link ${activeTab === 'explore' ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BookOpen size={16} />
              <span>Mobile Discover</span>
            </div>
          </button>

          {/* Main Portal Specific Options */}
          <div className="drawer-section-title">
            {isStudent ? 'Student Dashboard Modules' : 'Admin Operations'}
          </div>

          {activeLinks.map((link) => {
            const Icon = link.icon;
            const hasSubmenu = !!link.submenu;
            const isSubmenuOpen = openSubmenu === link.id || (hasSubmenu && link.submenu.some(sub => sub.id === activeTab));
            const isActiveParent = !hasSubmenu && activeTab === link.id;

            return (
              <div key={link.id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleSubmenu(link.id);
                    } else {
                      handleTabClick(link.id);
                    }
                  }}
                  className={`drawer-link ${isActiveParent || isSubmenuOpen ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={16} />
                    <span>{link.name}</span>
                  </div>
                  {hasSubmenu ? (
                    isSubmenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                  ) : (
                    link.hasChevron && <ChevronRight size={14} />
                  )}
                </button>

                {/* Submenu renders */}
                {hasSubmenu && isSubmenuOpen && (
                  <div className="drawer-submenu">
                    {link.submenu.map((sub) => {
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleTabClick(sub.id)}
                          className={`drawer-sublink ${isSubActive ? 'active' : ''}`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="drawer-footer">
          {/* Portal Quick Switcher (If allowed) */}
          {hasAdminPrivileges && (
            <button
              onClick={handlePortalSwitch}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(124, 58, 237, 0.08)',
                color: '#7c3aed',
                border: '1px solid rgba(124, 58, 237, 0.15)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              className="click-press"
            >
              <span>Switch to {isStudent ? 'Admin' : 'Student'} Portal</span>
            </button>
          )}

          <div className="drawer-footer-actions">
            {/* Sign Out Button */}
            <button 
              onClick={() => {
                logout();
                onClose();
              }}
              style={{
                flex: 1,
                fontSize: '12px',
                fontWeight: 700,
                padding: '10px 14px',
                borderRadius: '20px',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                cursor: 'pointer'
              }}
              className="click-press"
            >
              Sign Out
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={() => {
                const nextTheme = theme === 'light' ? 'dark' : 'light';
                setTheme(nextTheme);
              }} 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-input)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                flexShrink: 0,
                cursor: 'pointer'
              }}
              className="click-press"
              title="Toggle Dark/Light Mode"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
