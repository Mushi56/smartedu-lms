import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Video, Calendar, FileText, Notebook, 
  MessageCircle, TrendingUp, CreditCard, Award, Heart, Crown, Settings,
  Users, CheckSquare, BarChart2, Star, Ticket, Volume2, ChevronRight, ChevronDown, X,
  Sun, Moon, ShieldAlert, DollarSign, Shield, User, Plus, Tag
} from 'lucide-react';
import VerificationBadge from './VerificationBadge';
import { getAvailablePortals } from '../data/permissions';

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
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const isStudent = currentPortal === 'student';
  const isTeacher = currentPortal === 'teacher';
  const isAdmin = currentPortal === 'admin' || currentPortal === 'super-admin';
  const isSuperAdmin = currentPortal === 'super-admin';

  const availablePortals = getAvailablePortals(user?.role);
  const canSwitchPortal = availablePortals.length > 1;

  // ─── Filtered Navigation Links (Removing tabs that exist in bottom nav) ───
  // Student Bottom Nav: Home, Explore, Courses, Schedule, Profile
  const studentLinks = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'resources', name: 'My Resources', icon: Notebook },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'progress', name: 'My Progress', icon: TrendingUp },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'certificates', name: 'Certificates', icon: Award },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    ...(user?.role === 'student' ? [{ id: 'become-instructor', name: 'Become an Instructor', icon: Crown }] : []),
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  // Teacher Bottom Nav: Home, Courses (teacher-courses), Students (teacher-students), Earnings (teacher-earnings)
  const teacherLinks = [
    { id: 'teacher-dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'teacher-profile', name: 'My Profile', icon: User },
    { id: 'teacher-create-course', name: 'Create Course', icon: Plus },
    { id: 'teacher-live-classes', name: 'Live Classes', icon: Video },
    { id: 'teacher-reviews', name: 'Reviews', icon: Star },
    { id: 'teacher-messages', name: 'Messages', icon: MessageCircle },
    { id: 'teacher-settings', name: 'Settings', icon: Settings }
  ];

  // Admin Bottom Nav: Home, Courses (courses), Users (users), Orders (orders)
  const adminLinks = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'teachers', name: 'Teachers', icon: Users, hasChevron: true },
    { 
      id: 'courses-setup-parent', 
      name: 'Course Setup', 
      icon: BookOpen,
      submenu: [
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
    { id: 'reports', name: 'Reports', icon: BarChart2, hasChevron: true },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'coupons', name: 'Coupons', icon: Ticket },
    { id: 'resources', name: 'Resources', icon: Notebook },
    { id: 'announcements', name: 'Announcements', icon: Volume2 },
    { id: 'settings', name: 'Settings', icon: Settings },
    ...(isSuperAdmin ? [{ id: 'super-admin-panel', name: 'Platform Control', icon: Shield }] : [])
  ];

  const activeLinks = isStudent ? studentLinks : isTeacher ? teacherLinks : adminLinks;
  const sectionTitle = isStudent ? 'Student Menu' : isTeacher ? 'Teacher Menu' : (isSuperAdmin ? 'Platform Management' : 'Admin Operations');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  const toggleSubmenu = (menuId) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  const handlePortalSwitch = (targetPortal) => {
    setCurrentPortal(targetPortal);
    if (targetPortal === 'teacher') setActiveTab('teacher-dashboard');
    else if (targetPortal === 'admin' || targetPortal === 'super-admin') setActiveTab('dashboard');
    else setActiveTab('home');
    onClose();
  };

  const getPortalLabel = (portal) => {
    switch (portal) {
      case 'student': return 'Student';
      case 'teacher': return 'Teacher';
      case 'admin': return 'Admin';
      case 'super-admin': return 'Super Admin';
      default: return portal;
    }
  };

  const getPortalColor = (portal) => {
    switch (portal) {
      case 'teacher': return '#3b82f6';
      case 'admin': return '#ec4899';
      case 'super-admin': return '#eab308';
      default: return '#6366f1';
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(6px)',
            zIndex: 101,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Sliding app drawer */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.05)',
          zIndex: 102,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          borderTopRightRadius: '24px',
          borderBottomRightRadius: '24px',
          overflow: 'hidden'
        }}
      >
        
        {/* Drawer Header & Profile Summary */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f8fafc 0%, #fff 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"} 
              alt="Profile" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {user?.name || 'Aisha Rahman'}
                </span>
                <VerificationBadge status={user?.verificationStatus || user?.role} size={13} />
              </div>
              <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {user?.role === 'super-admin' ? 'Super Admin' : user?.role === 'admin' ? 'Admin' : user?.role === 'teacher' ? 'Teacher' : 'Student'}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="click-press"
            style={{ 
              background: '#f1f5f9', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', 
              width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }} className="hide-scrollbar">
          
          <div style={{ 
            fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', 
            textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '8px' 
          }}>
            {sectionTitle}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                    className="click-press"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '12.5px',
                      fontWeight: isActiveParent || isSubmenuOpen ? 800 : 600,
                      backgroundColor: isActiveParent ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                      color: isActiveParent ? 'var(--primary-color)' : 'var(--text-secondary)',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon size={16} style={{ color: isActiveParent ? 'var(--primary-color)' : 'var(--text-secondary)' }} />
                      <span>{link.name}</span>
                    </div>
                    {hasSubmenu ? (
                      isSubmenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    ) : (
                      link.hasChevron && <ChevronRight size={14} />
                    )}
                  </button>

                  {/* Submenu */}
                  {hasSubmenu && isSubmenuOpen && (
                    <div style={{ 
                      display: 'flex', flexDirection: 'column', gap: '2px', 
                      paddingLeft: '32px', margin: '4px 0 8px 0', borderLeft: '1px solid rgba(0,0,0,0.04)' 
                    }}>
                      {link.submenu.map((sub) => {
                        const isSubActive = activeTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleTabClick(sub.id)}
                            className="click-press"
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              textAlign: 'left',
                              border: 'none',
                              borderRadius: '8px',
                              background: isSubActive ? 'rgba(99, 102, 241, 0.06)' : 'transparent',
                              color: isSubActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                              fontSize: '12px',
                              fontWeight: isSubActive ? 800 : 550,
                              cursor: 'pointer',
                              transition: 'all 0.2s'
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
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid rgba(0, 0, 0, 0.03)',
          background: 'linear-gradient(to top, #f8fafc 0%, #fff 100%)'
        }}>
          {/* Portal Switcher */}
          {canSwitchPortal && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Switch Portal</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {availablePortals.map(portal => {
                  const isActive = currentPortal === portal;
                  const pColor = getPortalColor(portal);
                  return (
                    <button
                      key={portal}
                      onClick={() => !isActive && handlePortalSwitch(portal)}
                      style={{
                        flex: '1 0 auto',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        backgroundColor: isActive ? `${pColor}12` : '#fff',
                        color: isActive ? pColor : 'var(--text-secondary)',
                        border: isActive ? `1.5px solid ${pColor}` : '1px solid rgba(0,0,0,0.05)',
                        fontWeight: 800,
                        fontSize: '10.5px',
                        cursor: isActive ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        boxShadow: isActive ? 'none' : '0 2px 6px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s'
                      }}
                      className={isActive ? '' : 'click-press'}
                    >
                      {getPortalLabel(portal)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Sign Out */}
            <button 
              onClick={() => {
                logout();
                onClose();
              }}
              className="click-press"
              style={{
                flex: 1,
                fontSize: '12px',
                fontWeight: 800,
                padding: '10px 16px',
                borderRadius: '14px',
                backgroundColor: 'rgba(239, 68, 68, 0.06)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              Sign Out
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
              className="click-press"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                border: '1px solid rgba(0,0,0,0.04)',
                flexShrink: 0,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
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
