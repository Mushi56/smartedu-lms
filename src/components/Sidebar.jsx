import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Video, Calendar, FileText, CheckSquare, 
  MessageSquare, Notebook, TrendingUp, Award, MessageCircle, Settings,
  Users, Volume2, BarChart2, Clock, Activity, CreditCard, Crown, 
  Heart, HelpCircle, Megaphone, Coins, Star, Ticket, ChevronRight, ChevronDown, X
} from 'lucide-react';

export default function Sidebar({ currentPortal, activeTab, setActiveTab, mobileSidebarOpen, setMobileSidebarOpen }) {
  const isStudent = currentPortal === 'student';

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
    { id: 'live-classes', name: 'Live Classes', icon: Video },
    { id: 'exams', name: 'Exams', icon: CheckSquare },
    { id: 'orders', name: 'Orders & Payments', icon: CreditCard },
    { id: 'reports', name: 'Reports', icon: BarChart2, hasChevron: true },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'coupons', name: 'Coupons', icon: Ticket },
    { id: 'resources', name: 'Resources', icon: Notebook },
    { id: 'announcements', name: 'Announcements', icon: Volume2 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (setMobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  const activeLinks = isStudent ? studentLinks : adminLinks;

  return (
    <>
      {/* Background backdrop overlay for mobile view */}
      {mobileSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar dark-bg${mobileSidebarOpen ? ' sidebar-open' : ''}`} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        background: '#3A2048',
        width: '260px',
        flexShrink: 0
      }}>
        {/* Sidebar Brand Header */}
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '24px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ 
            width: '38px', 
            height: '38px', 
            borderRadius: '10px', 
            background: '#ffffff', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            <img src="/logo.png" alt="SURIA TECH Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
          </div>
          <div className="logo-text-wrapper" style={{ textAlign: 'left', overflow: 'hidden', minWidth: 0 }}>
            <span style={{ fontWeight: 800, letterSpacing: '-0.5px', color: '#ffffff', fontSize: '15px', display: 'block', whiteSpace: 'nowrap' }}>SURIA TECH</span>
            <span className="logo-subtitle" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9.5px', display: 'block', whiteSpace: 'nowrap', letterSpacing: '0.2px' }}>
              {isStudent ? 'Learn. Grow. Succeed.' : 'Admin Panel'}
            </span>
          </div>


          {/* Close button inside sidebar — visible on mobile via CSS */}
          <button 
            onClick={() => setMobileSidebarOpen(false)} 
            className="sidebar-close-btn click-press"
            title="Close Menu"
            style={{ color: '#ffffff', marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu" style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {activeLinks.map((link) => {
            const Icon = link.icon;
            
            // Check if this link has submenu and if one of subtabs is active
            const hasSubmenu = !!link.submenu;
            const isSubmenuOpen = hasSubmenu && (activeTab === link.id || link.submenu.some(sub => sub.id === activeTab));
            const isActiveParent = !hasSubmenu && activeTab === link.id;

            return (
              <div key={link.id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      // Click on parent with submenu goes to the first submenu tab
                      handleTabClick(link.submenu[0].id);
                    } else {
                      handleTabClick(link.id);
                    }
                  }}
                  className={`nav-link click-press ${isActiveParent || isSubmenuOpen ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    color: (isActiveParent || isSubmenuOpen) ? 'var(--secondary-color)' : '#b9bbcf',
                    borderLeft: (isActiveParent || isSubmenuOpen) ? '3px solid var(--secondary-color)' : '3px solid transparent',
                    backgroundColor: (isActiveParent || isSubmenuOpen) ? 'rgba(202, 186, 97, 0.05)' : 'transparent',
                    borderRadius: 0,
                    width: '100%',
                    textAlign: 'left',
                    fontWeight: (isActiveParent || isSubmenuOpen) ? 600 : 500,
                    transition: 'all 0.2s ease',
                    background: 'none',
                    border: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={18} style={{ color: (isActiveParent || isSubmenuOpen) ? 'var(--secondary-color)' : '#b9bbcf' }} />
                    <span style={{ fontSize: '13px' }}>{link.name}</span>
                  </div>
                  {hasSubmenu ? (
                    isSubmenuOpen ? <ChevronDown size={14} style={{ color: 'var(--secondary-color)' }} /> : <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  ) : (
                    link.hasChevron && <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  )}
                </button>

                {/* Submenu rendering */}
                {hasSubmenu && isSubmenuOpen && (
                  <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '16px', background: 'rgba(0,0,0,0.1)' }}>
                    {link.submenu.map((sub) => {
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleTabClick(sub.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 24px',
                            color: isSubActive ? 'var(--secondary-color)' : '#b9bbcf',
                            borderLeft: isSubActive ? '2px solid var(--secondary-color)' : '2px solid transparent',
                            background: isSubActive ? 'rgba(202, 186, 97, 0.03)' : 'transparent',
                            textAlign: 'left',
                            fontSize: '12px',
                            fontWeight: isSubActive ? 600 : 500,
                            borderTop: 'none',
                            borderBottom: 'none',
                            borderRight: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            transition: 'all 0.15s ease'
                          }}
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
        </nav>

        {/* Action Promotion Card */}
        <div style={{
          padding: '16px',
          margin: '16px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(58, 32, 72, 0.4) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(202, 186, 97, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px auto'
          }}>
            <Crown size={18} style={{ color: 'var(--secondary-color)' }} />
          </div>
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
            {isStudent ? 'Premium Student' : 'Platform Plan'}
          </h4>
          <p style={{ fontSize: '10px', color: '#8a8d9a', marginBottom: '12px' }}>
            {isStudent ? 'Valid until 24 Dec, 2025' : 'Enterprise'}
          </p>
          <button style={{
            width: '100%',
            padding: '8px',
            backgroundColor: 'var(--secondary-color)',
            color: '#1e1b4b',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '11px',
            border: 'none',
            cursor: 'pointer'
          }} className="click-press">
            {isStudent ? 'Upgrade Now' : 'View Details'}
          </button>
        </div>

        {/* Profile Footer only on Student Panel */}
        {isStudent && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            backgroundColor: 'rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{ position: 'relative', width: '38px', height: '38px', flexShrink: 0 }}>
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" 
                alt="Omar Hassan Profile" 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
              />
              <span style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-success)',
                border: '2px solid #3A2048'
              }}></span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>Omar Hassan</span>
              <span style={{ fontSize: '10px', color: '#8a8d9a' }}>Student</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
