import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Sun, Moon, Menu } from 'lucide-react';

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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadCount = currentPortal === 'student' ? 3 : 7; // Matching mockup badge values

  const handlePortalSwitch = (portal) => {
    setCurrentPortal(portal);
    setActiveTab('dashboard'); // Reset active tab when switching portals
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  if (currentPortal === 'student') {
    return (
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 24px 12px 24px',
        backgroundColor: 'transparent',
        borderBottom: 'none',
        height: 'auto',
        position: 'sticky',
        top: 0,
        zIndex: 99,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}>
        {/* Left Side: Hamburger & Welcoming Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setMobileSidebarOpen(true)} 
            className="mobile-menu-toggle click-press"
            title="Open Menu"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              flexShrink: 0
            }}
          >
            <Menu size={18} />
          </button>
          
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Welcome back, Omar! 👋</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>Let's continue your learning journey.</p>
          </div>
        </div>

        {/* Right Side: Simple circular search & notification controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>



          {/* Search trigger */}
          <button 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)'
            }}
            className="click-press"
            title="Search"
          >
            <Search size={18} />
          </button>

          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)'
              }}
              className="click-press"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '9px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff'
                }}>{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="smart-card glass-effect animate-fade-in" style={{
                position: 'absolute',
                right: 0,
                top: '52px',
                width: '320px',
                zIndex: 1000,
                padding: '16px',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>Notifications</span>
                  <button 
                    onClick={() => { markAllNotificationsRead(); setShowNotifications(false); }}
                    style={{ fontSize: '11px', color: 'var(--primary-color)', fontWeight: 600 }}
                  >
                    Clear all
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {notifications.map((notif) => (
                    <div key={notif.id} style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', textAlign: 'left' }}>
                      <p style={{ fontSize: '11px', margin: 0, color: 'var(--text-primary)' }}>{notif.text}</p>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Admin Portal Header
  return (
    <header className="navbar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      height: '70px',
      position: 'sticky',
      top: 0,
      zIndex: 99
    }}>
      {/* Left side: Hamburger toggle & page identifier */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => setMobileSidebarOpen(true)} 
          className="mobile-menu-toggle click-press"
          title="Open Menu"
          style={{ color: 'var(--text-primary)' }}
        >
          <Menu size={20} />
        </button>
        <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Admin Dashboard</span>
      </div>

      {/* Middle/Right: Search bar */}
      <div style={{ flex: 1, maxWidth: '400px', margin: '0 24px', position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search anything..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '10px 14px 10px 40px', 
            borderRadius: '24px', 
            border: '1px solid var(--border-color)', 
            backgroundColor: '#f8fafc',
            fontSize: '13px'
          }}
        />
      </div>

      {/* Right side: Bell icon and Admin Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>


        {/* Notification bell */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)'
            }}
            className="click-press"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                color: 'white',
                fontSize: '8px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff'
              }}>{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="smart-card glass-effect animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '46px',
              width: '300px',
              zIndex: 1000,
              padding: '16px',
              maxHeight: '350px',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px' }}>Notifications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((notif) => (
                  <div key={notif.id} style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', textAlign: 'left' }}>
                    <p style={{ fontSize: '11px', margin: 0, color: 'var(--text-primary)' }}>{notif.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Details layout */}
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px 8px', borderRadius: '8px' }}
          className="hover-bg-app click-press"
        >
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" 
            className="user-avatar" 
            alt="Admin Profile" 
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-color)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>Admin User</span>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>Super Admin</span>
          </div>
        </div>

        {showProfileMenu && (
          <div className="smart-card glass-effect animate-fade-in" style={{
            position: 'absolute',
            right: '24px',
            top: '72px',
            width: '200px',
            zIndex: 1000,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <button 
              onClick={() => handlePortalSwitch('student')}
              style={{ textAlign: 'left', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text-primary)', width: '100%' }}
              className="hover-bg-app"
            >
              Switch to Student Portal
            </button>
            <button 
              onClick={() => { setActiveTab('settings'); setShowProfileMenu(false); }}
              style={{ textAlign: 'left', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text-primary)', width: '100%' }}
              className="hover-bg-app"
            >
              Settings
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
