import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, Menu, X } from 'lucide-react';

const NAV_LINKS = ['Home', 'Courses', 'Teachers', 'Exams', 'Resources', 'About'];

export default function PublicLayout({ children, onGetStarted }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navBg = isScrolled ? '#ffffff' : 'transparent';
  const navShadow = isScrolled ? '0 4px 24px rgba(58,32,72,0.08)' : 'none';
  const navBorder = isScrolled ? '1px solid rgba(58,32,72,0.08)' : '1px solid transparent';
  const logoColor = isScrolled ? '#3A2048' : '#ffffff';
  const linkColor = isScrolled ? '#4b5563' : 'rgba(255,255,255,0.85)';
  const linkHoverColor = isScrolled ? '#3A2048' : '#ffffff';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── STICKY TOP NAVBAR ────────────────────────────── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: navBg,
        backdropFilter: isScrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(14px)' : 'none',
        boxShadow: navShadow,
        borderBottom: navBorder,
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '9px',
            background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0
          }}>
            <img src="/logo.png" alt="SURIA TECH Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: logoColor, letterSpacing: '-0.5px', lineHeight: 1.1, whiteSpace: 'nowrap', transition: 'color 0.3s' }}>
              SURIA TECH
            </span>
            <span style={{ fontSize: '9px', fontWeight: 700, color: isScrolled ? '#CABA61' : 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>
              Learn. Grow. Succeed.
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="pub-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className="pub-nav-link"
              style={{
                fontSize: '14px', fontWeight: i === 0 ? 700 : 600,
                color: i === 0 ? (isScrolled ? '#CABA61' : '#CABA61') : linkColor,
                textDecoration: 'none',
                transition: 'color 0.2s',
                borderBottom: i === 0 ? '2px solid #CABA61' : '2px solid transparent',
                paddingBottom: '2px'
              }}
              onMouseEnter={e => { if (i !== 0) e.currentTarget.style.color = linkHoverColor; }}
              onMouseLeave={e => { if (i !== 0) e.currentTarget.style.color = linkColor; }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Get Started + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onGetStarted}
            className="click-press pub-get-started"
            style={{
              padding: '10px 22px', backgroundColor: '#CABA61', color: '#1e1b4b',
              borderRadius: '30px', fontWeight: 700, fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '7px',
              boxShadow: '0 4px 14px rgba(202,186,97,0.35)', border: 'none', cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#3A2048'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#CABA61'; e.currentTarget.style.color = '#1e1b4b'; }}
          >
            <span>Get Started</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="pub-hamburger click-press"
            style={{
              display: 'none', width: '40px', height: '40px', borderRadius: '10px',
              backgroundColor: isScrolled ? 'rgba(58,32,72,0.06)' : 'rgba(255,255,255,0.15)',
              border: isScrolled ? '1px solid rgba(58,32,72,0.1)' : '1px solid rgba(255,255,255,0.2)',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              color: isScrolled ? '#3A2048' : '#ffffff',
              transition: 'all 0.2s'
            }}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE SIDE DRAWER ───────────────────────────── */}
      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 1100, backdropFilter: 'blur(2px)',
            animation: 'fadeIn 0.2s ease'
          }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '280px',
        background: '#3A2048',
        zIndex: 1200,
        display: 'flex', flexDirection: 'column',
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: mobileMenuOpen ? '-8px 0 40px rgba(0,0,0,0.35)' : 'none',
        padding: '0',
        overflowY: 'auto'
      }}>
        {/* Drawer Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/logo.png" alt="SURIA TECH" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '14px', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>SURIA TECH</div>
              <div style={{ fontSize: '9px', color: '#CABA61', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>Learn. Grow. Succeed.</div>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 24px',
                color: i === 0 ? '#CABA61' : 'rgba(255,255,255,0.75)',
                fontSize: '15px', fontWeight: i === 0 ? 700 : 500,
                textDecoration: 'none',
                borderLeft: i === 0 ? '3px solid #CABA61' : '3px solid transparent',
                backgroundColor: i === 0 ? 'rgba(202,186,97,0.06)' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA in drawer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button
            onClick={() => { setMobileMenuOpen(false); onGetStarted(); }}
            style={{
              width: '100%', padding: '13px', backgroundColor: '#CABA61', color: '#1e1b4b',
              borderRadius: '12px', fontWeight: 700, fontSize: '14px',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            <span>Get Started</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* ── PAGE CONTENT ─────────────────────────────────── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '72px' }}>
        {children}
      </main>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#150B1C', color: 'white', padding: '60px 5% 32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr repeat(6, 1fr)',
            gap: '28px',
            marginBottom: '48px',
            textAlign: 'left'
          }}>
            {/* Logo Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src="/logo.png" alt="SURIA TECH" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>SURIA TECH</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                Your trusted partner in exam preparation and academic success worldwide.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  <svg key="fb" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
                  <svg key="tw" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
                  <svg key="ig" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                  <svg key="yt" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
                  <svg key="li" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                ].map((icon, idx) => (
                  <a key={idx} href="#" style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#CABA61'; e.currentTarget.style.color = '#1e1b4b'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {[
              { title: 'Courses', links: ['All Courses', 'Featured Courses', 'New Courses', 'Categories', 'Course Bundles'] },
              { title: 'Teachers', links: ['All Teachers', 'Featured Teachers', 'Become a Teacher', 'Teacher Resources', 'Community'] },
              { title: 'Exams', links: ['Scholarship Exams', 'University Admissions', 'Language Exams', 'Certifications', 'Career Dev'] },
              { title: 'Resources', links: ['Study Guides', 'Exam Tips', 'Downloadable Notes', 'Learning Materials', 'Articles'] },
              { title: 'Company', links: ['About Us', 'Our Mission', 'Careers', 'Press', 'Contact Us'] },
              { title: 'Support', links: ['Help Center', 'FAQ', 'Student Support', 'Teacher Support', 'Terms of Service'] }
            ].map((col) => (
              <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'white', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col.title}</h4>
                {col.links.map((link) => (
                  <a key={link} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#CABA61'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>© 2026 SURIA TECH. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((p) => (
                <a key={p} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                >{p}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="click-press" style={{
          position: 'fixed', bottom: '28px', right: '28px',
          width: '42px', height: '42px', borderRadius: '50%',
          background: '#CABA61', color: '#1e1b4b', border: 'none',
          boxShadow: '0 4px 16px rgba(202,186,97,0.45)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
