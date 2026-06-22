import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUp, Menu, X, Search, ChevronDown, BookOpen, Globe, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PublicLayout({ children, onGetStarted, onGoAdmin, onGoStudent }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const exploreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 992) {
        setShowMobileSearch(false);
      }
    };

    const handleClickOutside = (event) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setShowExplore(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const isDesktop = windowWidth > 992;

  const categories = [
    { id: 'test-prep', title: 'SAT & Test Prep', desc: 'SAT, GRE, TOEFL, IELTS Mastery', icon: Award, color: '#3A2048' },
    { id: 'language', title: 'Languages', desc: 'Academic English & Speaking Coach', icon: Globe, color: '#CABA61' },
    { id: 'writing', title: 'Academic Writing', desc: 'Thesis Statements, Essay Excellence', icon: BookOpen, color: '#5624d0' }
  ];

  const handleCategoryClick = (catId) => {
    setShowExplore(false);
    onGetStarted();
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── STICKY TOP NAVBAR ────────────────────────────── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '76px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        zIndex: 1000,
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: isScrolled ? '#ffffff' : 'transparent',
        boxShadow: isScrolled ? '0 10px 30px rgba(58, 32, 72, 0.08)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(58, 32, 72, 0.05)' : 'none',
      }}>

        {/* --- DESKTOP LAYOUT --- */}
        {isDesktop ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
            
            {/* Left Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #CABA61 0%, #e8d98a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✦</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#3A2048', letterSpacing: '0.5px', lineHeight: 1.1 }}>SURIA <span style={{ color: '#3A2048' }}>TECH</span></div>
                <div style={{ fontSize: '8px', fontWeight: 600, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>Learn. Prepare. Succeed.</div>
              </div>
            </div>

            {/* Center Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ position: 'relative' }} ref={exploreRef}>
                <a href="#" onClick={(e) => { e.preventDefault(); setShowExplore(!showExplore); }} style={{ fontSize: '14px', fontWeight: 600, color: '#3A2048', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Explore <span style={{ fontSize: '10px', color: '#94a3b8' }}>▾</span>
                </a>

                {/* Explore Dropdown Panel */}
                {showExplore && (
                  <div className="smart-card glass-effect animate-scale-up" style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: 0,
                    width: '320px',
                    padding: '16px',
                    borderRadius: '16px',
                    boxShadow: '0 12px 30px rgba(58, 32, 72, 0.15)',
                    border: '1px solid rgba(58, 32, 72, 0.08)',
                    zIndex: 1010
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(58, 32, 72, 0.5)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                      Learning Pathways
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '10px 12px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              borderRadius: '8px',
                              textAlign: 'left',
                              cursor: 'pointer',
                              width: '100%',
                              transition: 'all 0.2s'
                            }}
                            className="hover-bg-app"
                          >
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              backgroundColor: `${cat.color}10`,
                              color: cat.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Icon size={16} />
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 700, color: '#3A2048' }}>{cat.title}</div>
                              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{cat.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }} style={{ fontSize: '14px', fontWeight: 600, color: '#3A2048', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>Exams <span style={{ fontSize: '10px', color: '#94a3b8' }}>▾</span></a>
              <a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }} style={{ fontSize: '14px', fontWeight: 600, color: '#3A2048', textDecoration: 'none' }}>Instructors</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }} style={{ fontSize: '14px', fontWeight: 600, color: '#3A2048', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>Resources <span style={{ fontSize: '10px', color: '#94a3b8' }}>▾</span></a>
              <a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }} style={{ fontSize: '14px', fontWeight: 600, color: '#3A2048', textDecoration: 'none' }}>Pricing</a>
            </div>

            {/* Right: Language + Auth Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#3A2048', cursor: 'pointer' }}>
                <Globe size={16} /> EN <span style={{ fontSize: '10px', color: '#94a3b8' }}>▾</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={handleLoginClick}
                  style={{
                    padding: '9px 22px',
                    backgroundColor: '#3A2048',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '24px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                  className="click-press"
                >
                  Log in
                </button>
                <button
                  onClick={onGetStarted}
                  style={{
                    padding: '9px 22px',
                    backgroundColor: 'transparent',
                    color: '#3A2048',
                    border: '1.5px solid #3A2048',
                    borderRadius: '24px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                  className="click-press"
                >
                  Sign up
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* --- MOBILE / TABLET LAYOUT --- */
          <div style={{ display: 'flex', alignItems: 'center', justifybox: 'space-between', width: '100%', justifyContent: 'space-between' }}>
            
            {/* Left side: Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#3A2048',
                padding: 0
              }}
              className="click-press"
            >
              <Menu size={24} />
            </button>

            {/* Center: Brand Logo */}
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <img src="/logo.svg" alt="SURIA TECH Logo" style={{ height: '32px', width: 'auto' }} />
            </div>

            {/* Right side: Search toggle & login profile shortcuts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#3A2048'
                }}
                className="click-press"
              >
                <Search size={20} />
              </button>
              <button
                onClick={handleLoginClick}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#3A2048'
                }}
                className="click-press"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            </div>

          </div>
        )}
      </nav>

      {/* Mobile search bar overlay */}
      {!isDesktop && showMobileSearch && (
        <div style={{
          position: 'fixed',
          top: '76px',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          padding: '12px 16px',
          boxShadow: '0 8px 20px rgba(58, 32, 72, 0.08)',
          borderBottom: '1px solid rgba(58, 32, 72, 0.05)',
          zIndex: 999,
          display: 'flex',
          gap: '10px'
        }} className="animate-fade-in">
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(58, 32, 72, 0.4)' }} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(58, 32, 72, 0.1)',
                fontSize: '13px',
                fontFamily: "'Montserrat', sans-serif",
                outline: 'none'
              }}
            />
          </div>
          <button 
            onClick={() => setShowMobileSearch(false)}
            style={{
              padding: '0 12px',
              backgroundColor: 'transparent',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              color: '#3A2048',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* ── MOBILE SIDE DRAWER ───────────────────────────── */}
      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(58, 32, 72, 0.4)',
            zIndex: 1100, backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease'
          }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: '280px',
        background: '#3A2048',
        zIndex: 1200,
        display: 'flex', flexDirection: 'column',
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: mobileMenuOpen ? '8px 0 40px rgba(0,0,0,0.3)' : 'none',
        padding: '0',
        overflowY: 'auto'
      }}>
        {/* Drawer Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifybox: 'space-between',
          padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
          justifyContent: 'space-between'
        }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: '18px',
            color: '#ffffff',
            letterSpacing: '-0.5px'
          }}>
            SURIA <span style={{ color: '#CABA61' }}>TECH</span>
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '16px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>


          <div style={{ padding: '8px 24px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Categories
          </div>
          {categories.map(cat => (
            <a
              key={cat.id}
              href="#"
              onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onGetStarted(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '10px 24px',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '14px', fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.15s'
              }}
            >
              {cat.title}
            </a>
          ))}
        </nav>

        {/* CTA in drawer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => { setMobileMenuOpen(false); handleLoginClick(); }}
            style={{
              width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#ffffff',
              borderRadius: '12px', fontWeight: 600, fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            Log In
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onGetStarted(); }}
            style={{
              width: '100%', padding: '12px', backgroundColor: '#CABA61', color: '#1e1b4b',
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

      {/* ── PAGE CONTENT ───────────────────────────────────── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '0' }}>
        {children}
      </main>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ padding: '0 5% 40px', backgroundColor: 'transparent' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', backgroundColor: '#150B1C', borderRadius: '24px', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column' }}>
          
          {/* CTA Banner Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifybox: 'space-between', padding: 'var(--footer-cta-padding, 32px 40px)', background: 'linear-gradient(135deg, #3A2048 0%, #20102b 100%)', gap: '24px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 min-content' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 800, color: '#ffffff', marginBottom: '4px', marginTop: 0 }}>
                  Start Your Learning Journey Today
                </h2>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.5 }}>
                  Join thousands of successful students who achieved their dreams with SURIA TECH
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexShrink: 0 }}>
              <button onClick={onGetStarted} className="click-press" style={{ padding: '12px 24px', background: 'linear-gradient(to right, #F5D365, #E3B446)', color: '#1e1b4b', borderRadius: '30px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(202,186,97,0.3)', transition: 'all 0.2s' }}>
                <span>Browse Courses</span><ArrowRight size={14} />
              </button>
              <button onClick={onGetStarted} className="click-press" style={{ padding: '12px 24px', background: 'transparent', color: '#ffffff', borderRadius: '30px', fontWeight: 600, fontSize: '13px', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
                <span>Find a Teacher</span><ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Footer Grid & Bottom bar container */}
          <div style={{ padding: 'var(--footer-padding, 48px 40px 32px)' }}>
            <div className="footer-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr repeat(6, 1fr)',
              gap: 'var(--footer-gap, 28px)',
              marginBottom: '48px',
              textAlign: 'left'
            }}>
              {/* Logo Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3A2048'
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    </div>
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      fontSize: '18px',
                      color: '#ffffff',
                      letterSpacing: '-0.5px'
                    }}>
                      SURIA <span style={{ color: '#CABA61' }}>TECH</span>
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                  Your trusted partner in exam preparation and academic success worldwide.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    <svg key="fb" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
                    <svg key="tw" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
                    <svg key="ig" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                    <svg key="yt" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
                    <svg key="li" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"/></svg>
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
                { title: 'Teachers', links: ['All Teachers', 'Featured Teachers', 'Become a Teacher', 'Teacher Resources', 'Company'] },
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
