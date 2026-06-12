import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AccessDenied() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDashboardRedirect = () => {
    if (!user) return '/';
    if (user.role === 'super-admin') return '/super-admin/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/student/dashboard';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #4A2B5C 0%, #291435 100%)',
      color: '#ffffff',
      padding: '24px',
      fontFamily: "'Montserrat', sans-serif",
      textAlign: 'center'
    }}>
      <div className="smart-card glass-effect animate-scale-up" style={{
        maxWidth: '480px',
        padding: '40px 32px',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        border: '1px solid rgba(202, 186, 97, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #ef4444',
          color: '#ef4444',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
        }}>
          <ShieldAlert size={40} />
        </div>

        <div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--secondary-color)',
            marginBottom: '12px',
            letterSpacing: '-0.5px'
          }}>
            Access Denied
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#b9bbcf',
            lineHeight: 1.6,
            margin: 0
          }}>
            You do not have the required permissions to view this page. If you believe this is an error, please contact your administrator.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          marginTop: '8px'
        }}>
          <button
            onClick={() => navigate(getDashboardRedirect())}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--secondary-color)',
              color: '#1e1b4b',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(202, 186, 97, 0.2)'
            }}
            className="click-press hover-bg-gold"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#ffffff',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '14px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            className="click-press"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
