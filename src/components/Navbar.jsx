import React, { useState } from 'react';
import { Search, Bell, MessageSquare, ArrowRightLeft, Check, Sun, Moon, Menu } from 'lucide-react';

export default function Navbar({ 
  currentPortal, 
  setCurrentPortal, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery,
  notifications,
  markAllNotificationsRead,
  theme,
  setTheme,
  setMobileSidebarOpen
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handlePortalSwitch = (portal) => {
    setCurrentPortal(portal);
    setActiveTab('dashboard'); // Always reset active sidebar tab to dashboard when switching portals
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header className="navbar">
      {/* Search Input Box */}
      <div className="nav-left">
        <button 
          onClick={() => setMobileSidebarOpen(true)} 
          className="mobile-menu-toggle click-press"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        <div className="search-bar-wrapper">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder={currentPortal === 'student' ? "Search for courses, topics or anything..." : "Search for students, courses, classes..."} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-kbd">Ctrl + K</span>
        </div>
      </div>

      {/* Action Buttons, Dark Mode Toggle, Portal Switcher & User Profile */}
      <div className="nav-right">
        {/* Quick Portal Switcher Selector */}
        <div className="portal-switcher">
          <button 
            onClick={() => handlePortalSwitch('student')}
            className={`portal-switch-btn click-press ${currentPortal === 'student' ? 'active' : ''}`}
          >
            Student View
          </button>
          <button 
            onClick={() => handlePortalSwitch('admin')}
            className={`portal-switch-btn click-press ${currentPortal === 'admin' ? 'active' : ''}`}
          >
            Admin Panel
          </button>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="nav-action-btn click-press"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Messages Shortcut */}
        <button 
          onClick={() => setActiveTab('messages')} 
          className="nav-action-btn click-press"
          title="Messages"
        >
          <MessageSquare size={18} />
          {currentPortal === 'admin' && <span className="btn-badge">12</span>}
        </button>

        {/* Notifications Icon with Dropdown Menu */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className="nav-action-btn click-press"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="btn-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="smart-card glass-effect animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '50px',
              width: '320px',
              zIndex: 1000,
              padding: '16px',
              maxHeight: '400px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px' }}>Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => {
                      markAllNotificationsRead();
                      setShowNotifications(false);
                    }}
                    style={{ fontSize: '11px', color: 'var(--primary-color)', fontWeight: 600 }}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notifications.length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '16px 0' }}>No new notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '2px', 
                        padding: '8px', 
                        borderRadius: '6px', 
                        backgroundColor: notif.read ? 'transparent' : 'var(--primary-glow)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <p style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: notif.read ? 400 : 500 }}>
                        {notif.text}
                      </p>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{notif.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown block */}
        <div className="user-profile-menu click-press" onClick={() => setActiveTab('settings')}>
          <img 
            src={currentPortal === 'student' 
              ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
              : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"} 
            className="user-avatar" 
            alt="User profile" 
          />
          <div className="user-meta">
            <span className="user-name">
              {currentPortal === 'student' ? 'Arjun' : 'Dr. Arjun Sharma'}
            </span>
            <span className="user-role">
              {currentPortal === 'student' ? 'Student' : 'Super Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
