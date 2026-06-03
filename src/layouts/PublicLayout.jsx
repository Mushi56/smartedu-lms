import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Mail, ArrowUp } from 'lucide-react';

export default function PublicLayout({ children, onGetStarted }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinkStyle = (isActive) => ({
    fontSize: '14px',
    fontWeight: 600,
    color: isScrolled 
      ? (isActive ? 'var(--primary-color)' : 'var(--text-secondary)') 
      : (isActive ? '#ffffff' : 'rgba(255,255,255,0.75)'),
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    cursor: 'pointer'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Sticky Navigation Bar */}
      <nav 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8%',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          backgroundColor: isScrolled ? 'var(--bg-card)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 10px 30px rgba(58, 32, 72, 0.08)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent'
        }}
      >
        {/* Brand Logo Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '10px', 
            background: '#ffffff', 
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            <img src="/logo.png" alt="SURIA TECH Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.1)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ 
              fontSize: '18px', 
              fontWeight: 800, 
              color: isScrolled ? 'var(--primary-color)' : '#ffffff', 
              letterSpacing: '-0.5px', 
              lineHeight: 1.1 
            }}>SURIA TECH</span>
            <span style={{ 
              fontSize: '9px', 
              fontWeight: 700, 
              color: isScrolled ? 'var(--secondary-color)' : 'rgba(255,255,255,0.7)', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>Education</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-only-nav">
          <a href="#" style={navLinkStyle(true)}>Home</a>
          <a href="#" style={navLinkStyle(false)}>Courses</a>
          <a href="#" style={navLinkStyle(false)}>Teachers</a>
          <a href="#" style={navLinkStyle(false)}>Exams</a>
          <a href="#" style={navLinkStyle(false)}>Resources</a>
          <a href="#" style={navLinkStyle(false)}>About</a>
        </div>

        {/* Get Started Button */}
        <div>
          <button 
            onClick={onGetStarted}
            className="click-press"
            style={{
              padding: '12px 26px',
              backgroundColor: 'var(--secondary-color)',
              color: '#ffffff',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 18px rgba(202, 186, 97, 0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Get Started</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* Main workspace */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>

      {/* Premium Deep Purple Footer */}
      <footer style={{ backgroundColor: '#150B1C', color: 'white', padding: '80px 8% 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: '1.2fr repeat(6, 1fr)', 
          gap: '24px', 
          marginBottom: '60px',
          textAlign: 'left'
        }}>
          {/* Logo & Info column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '8px', 
                background: '#ffffff', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img src="/logo.png" alt="SURIA TECH Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>SURIA TECH</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              Your trusted partner in exam preparation and academic success worldwide.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {[
                { icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: '#' },
                { icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>, href: '#' },
                { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: '#' },
                { icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, href: '#' },
                { icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: '#' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  className="click-press"
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s', textDecoration: 'none'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--secondary-color)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Foot links lists */}
          {[
            {
              title: 'Courses',
              links: ['All Courses', 'Featured Courses', 'New Courses', 'Categories', 'Course Bundles']
            },
            {
              title: 'Teachers',
              links: ['All Teachers', 'Featured Teachers', 'Become a Teacher', 'Teacher Resources', 'Community']
            },
            {
              title: 'Exams',
              links: ['Scholarship Exams', 'University Admissions', 'Language Exams', 'Certifications', 'Career Development']
            },
            {
              title: 'Resources',
              links: ['Study Guides', 'Exam Tips', 'Downloadable Notes', 'Learning Materials', 'Articles']
            },
            {
              title: 'Company',
              links: ['About Us', 'Our Mission', 'Careers', 'Press', 'Contact Us']
            },
            {
              title: 'Support',
              links: ['Help Center', 'FAQ', 'Student Support', 'Teacher Support', 'Terms of Service']
            }
          ].map((col, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {col.title}
              </h4>
              {col.links.map((link, lIdx) => (
                <a 
                  key={lIdx} 
                  href="#" 
                  style={{ 
                    fontSize: '12px', 
                    color: 'rgba(255,255,255,0.55)', 
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--secondary-color)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider and Copyright bottom bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '16px', 
          paddingTop: '30px', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            © 2026 SURIA TECH. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '12px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((p, i) => (
              <a 
                key={i} 
                href="#" 
                style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                {p}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="click-press"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--secondary-color)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 16px rgba(202, 186, 97, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-color)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--secondary-color)'}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
