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
      if (email.toLowerCase().includes('superadmin')) {
        determinedRole = 'super-admin';
      } else if (email.toLowerCase().includes('admin')) {
        determinedRole = 'admin';
      }

      const mockUser = {
        name: isLogin ? (email.split('@')[0]) : name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        role: determinedRole
      };
      onLoginSuccess(mockUser);
    }, 800);
  };

  const fillQuickCredentials = (role) => {
    if (role === 'student') {
      setEmail('student@suriatech.com');
      setPassword('password123');
      setName('Omar Hassan');
    } else {
      setEmail('guest@suriatech.com');
      setPassword('guestPass');
      setName('Guest User');
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
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => fillQuickCredentials('student')}
            className="click-press"
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Check size={11} /> Student Account
          </button>
          <button
            onClick={() => fillQuickCredentials('guest')}
            className="click-press"
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Check size={11} /> Guest Account
          </button>
        </div>
      </div>
    </div>
  );
}
