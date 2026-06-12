import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Sun, Moon, Menu, ArrowLeft, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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

  const isStudent = currentPortal === 'student';

  const dummyResults = [
    { id: 1, title: 'React Masterclass', type: 'Course • Development' },
    { id: 2, title: 'UI/UX Fundamentals', type: 'Course • Design' },
    { id: 3, title: 'System Design Interview', type: 'Book • Engineering' }
  ];

  const renderSearchResults = () => {
    if (!searchQuery) return null;
    return (
      <div className="smart-card glass-effect animate-fade-in" style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        right: 0,
        maxHeight: '300px',
        overflowY: 'auto',
        zIndex: 1000,
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
          Search Results for "{searchQuery}"
        </div>
        {dummyResults.map(result => (
          <button key={result.id} onClick={() => { setSearchQuery(''); setIsMobileSearchOpen(false); }} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text-primary)', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }} className="hover-bg-app click-press">
            <div style={{ fontWeight: 600 }}>{result.title}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{result.type}</div>
          </button>
        ))}
      </div>
    );
  };

  if (isMobileSearchOpen) {
    return (
      <header className="navbar animate-fade-in" style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        height: '70px',
        position: 'sticky',
        top: 0,
        zIndex: 99,
        gap: '12px'
      }}>
        <button 
          onClick={() => setIsMobileSearchOpen(false)}
          style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="click-press"
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1, position: 'relative', width: '100%', display: 'flex' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1 }} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            style={{ 
              width: '100%', 
              padding: '10px 36px', 
              borderRadius: '24px', 
              border: '1px solid var(--border-color)', 
              backgroundColor: '#f8fafc',
              fontSize: '14px'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            >
              <X size={16} />
            </button>
          )}
          {renderSearchResults()}
        </div>
      </header>
    );
  }

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
      {/* Left side: Profile toggle & page identifier */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => setMobileSidebarOpen(true)} 
          className="mobile-menu-toggle click-press"
          title="Open Menu"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <img 
            src={user?.avatar || (isStudent ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100")} 
            className="user-avatar" 
            alt="User Profile" 
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-color)' }}
          />
        </button>
        <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
          {isStudent ? 'Student Dashboard' : 'Admin Dashboard'}
        </span>
      </div>

      {/* Middle/Right: Search bar */}
      <div className="desktop-search-bar" style={{ flex: 1, maxWidth: '400px', margin: '0 24px', position: 'relative' }}>
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
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <X size={14} />
          </button>
        )}
        {renderSearchResults()}
      </div>

      {/* Right side: Bell icon and Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

        {/* Mobile Search Trigger */}
        <button 
          onClick={() => setIsMobileSearchOpen(true)}
          className="mobile-only-btn click-press"
          title="Search"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#f8fafc',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)'
          }}
        >
          <Search size={16} />
        </button>

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

      </div>
    </header>
  );
}
