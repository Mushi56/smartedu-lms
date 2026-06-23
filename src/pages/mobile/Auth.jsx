import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldAlert, Check } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock Success Callback
      let determinedRole = 'student';
      let userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
      let displayName = isLogin ? (email.split('@')[0]) : name;

      if (email.toLowerCase().includes('superadmin')) {
        determinedRole = 'super-admin';
        userAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
        if (isLogin) displayName = 'Super Admin';
      } else if (email.toLowerCase().includes('admin')) {
        determinedRole = 'admin';
        userAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
        if (isLogin) displayName = 'Sarah Johnson';
      } else if (email.toLowerCase().includes('teacher')) {
        determinedRole = 'teacher';
        userAvatar = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80';
        if (isLogin) displayName = 'Dr. Ahmed Al-Hassan';
      } else {
        if (isLogin && email.toLowerCase().includes('student')) displayName = 'Omar Hassan';
      }

      // Assign verification status based on role
      let verificationStatus = null;
      if (determinedRole === 'teacher') verificationStatus = 'verified';
      else if (determinedRole === 'admin') verificationStatus = 'admin';
      else if (determinedRole === 'super-admin') verificationStatus = 'super-admin';

      const mockUser = {
        name: displayName,
        email: email,
        avatar: userAvatar,
        role: determinedRole,
        verificationStatus: verificationStatus
      };
      onLoginSuccess(mockUser);
    }, 800);
  };

  const fillQuickCredentials = (role) => {
    if (role === 'student') {
      setEmail('student@suriatech.com');
      setPassword('password123');
      setName('Omar Hassan');
    } else if (role === 'teacher') {
      setEmail('teacher@suriatech.com');
      setPassword('password123');
      setName('Dr. Ahmed Al-Hassan');
    } else if (role === 'admin') {
      setEmail('admin@suriatech.com');
      setPassword('password123');
      setName('Sarah Johnson');
    } else if (role === 'super-admin') {
      setEmail('superadmin@suriatech.com');
      setPassword('password123');
      setName('Super Admin');
    }
    setIsLogin(true);
    setError('');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: 'var(--bg-app)',
      textAlign: 'left'
    }} className="animate-fade-in">
      
      {/* Welcome Title */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>
          {isLogin ? 'Sign in to access your course streak & AI study companion.' : 'Register to unlock dynamic modular study plans.'}
        </p>
      </div>

      {/* Auth Card */}
      <div className="mobile-card" style={{ padding: '24px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: 'var(--accent-red)',
              fontSize: '11.5px'
            }}>
              <ShieldAlert size={15} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {!isLogin && (
            <div className="mobile-input-group">
              <label>Full Name</label>
              <input
                type="text"
                className="mobile-input"
                placeholder="Omar Hassan"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mobile-input-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Mail size={16} /></span>
              <input
                type="email"
                className="mobile-input"
                placeholder="email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </div>

          <div className="mobile-input-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="mobile-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingLeft: '38px', paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mobile-btn-primary click-press"
            disabled={loading}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Option */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontWeight: 700, cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>

      {/* Quick Access bypass */}
      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
          Quick Demo Bypass
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 8px' }}>
          <button
            type="button"
            onClick={() => fillQuickCredentials('student')}
            className="click-press"
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Student Account
          </button>
          
          <button
            type="button"
            onClick={() => fillQuickCredentials('teacher')}
            className="click-press"
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Teacher Account
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3b82f6', // blue
              color: '#ffffff',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              padding: '2px',
              flexShrink: 0
            }}>
              <Check size={10} strokeWidth={4} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => fillQuickCredentials('admin')}
            className="click-press"
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Admin Account
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ec4899', // pink
              color: '#ffffff',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              padding: '2px',
              flexShrink: 0
            }}>
              <Check size={10} strokeWidth={4} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => fillQuickCredentials('super-admin')}
            className="click-press"
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Super Admin
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#eab308', // golden
              color: '#ffffff',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              padding: '2px',
              flexShrink: 0
            }}>
              <Check size={10} strokeWidth={4} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
