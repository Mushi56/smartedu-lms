import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, Loader2, BookOpen, Crown, User, ShieldAlert } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Find where user was redirected from (default to respective dashboard based on login role)
  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        // Successful login: redirect
        const role = res.user.role;
        let redirectPath = '/student/dashboard';
        if (role === 'super-admin') redirectPath = '/super-admin/dashboard';
        else if (role === 'admin') redirectPath = '/admin/dashboard';

        navigate(from || redirectPath, { replace: true });
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (quickEmail, quickPassword) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
    setError('');
    setIsSubmitting(true);

    try {
      const res = await login(quickEmail, quickPassword);
      if (res.success) {
        const role = res.user.role;
        let redirectPath = '/student/dashboard';
        if (role === 'super-admin') redirectPath = '/super-admin/dashboard';
        else if (role === 'admin') redirectPath = '/admin/dashboard';

        navigate(from || redirectPath, { replace: true });
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #4A2B5C 0%, #291435 100%)',
      color: '#ffffff',
      padding: '24px',
      fontFamily: "'Montserrat', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '960px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)'
      }} className="desktop-login-grid">
        
        {/* Left pane: Brand & Quick logins */}
        <div style={{
          backgroundColor: '#3A2048',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--secondary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1e1b4b'
              }}>
                <BookOpen size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '18px', color: '#ffffff', letterSpacing: '0.5px' }}>
                SURIA <span style={{ color: 'var(--secondary-color)' }}>TECH</span>
              </span>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--secondary-color)', marginBottom: '10px' }}>
              Welcome Back
            </h2>
            <p style={{ fontSize: '13px', color: '#b9bbcf', lineHeight: 1.6, marginBottom: '32px' }}>
              Access your personalized learning environment and progress tracker.
            </p>
          </div>

          {/* Quick tester access */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '1px', marginBottom: '12px' }}>
              Quick Tester Access
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              
              <button 
                onClick={() => handleQuickLogin('superadmin@suriatech.test', '123456')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                className="hover-bg-app click-press"
              >
                <Crown size={16} style={{ color: 'var(--secondary-color)' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700 }}>Super Admin Portal</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>superadmin@suriatech.test</div>
                </div>
              </button>

              <button 
                onClick={() => handleQuickLogin('admin@suriatech.test', '123456')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                className="hover-bg-app click-press"
              >
                <User size={16} style={{ color: 'var(--secondary-color)' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700 }}>Admin Portal</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>admin@suriatech.test</div>
                </div>
              </button>

              <button 
                onClick={() => handleQuickLogin('student@suriatech.test', '123456')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                className="hover-bg-app click-press"
              >
                <User size={16} style={{ color: '#60a5fa' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700 }}>Student Portal</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>student@suriatech.test</div>
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* Right pane: Auth form */}
        <div style={{
          backgroundColor: '#2D153A',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#ffffff' }}>Sign In</h3>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              color: '#f87171',
              fontSize: '12px',
              marginBottom: '20px'
            }}>
              <ShieldAlert size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#b9bbcf', textTransform: 'uppercase' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@suriatech.test" 
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    color: '#ffffff',
                    fontSize: '13px',
                    transition: 'border-color 0.2s'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#b9bbcf', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    color: '#ffffff',
                    fontSize: '13px',
                    transition: 'border-color 0.2s'
                  }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'var(--secondary-color)',
                color: '#1e1b4b',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                marginTop: '10px'
              }}
              className="click-press"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
