import React, { useState } from 'react';
import { Lock, Bell, Shield, Eye, Smartphone, Key, Save, CheckCircle2 } from 'lucide-react';

export default function TeacherSettings() {
  const [activeSection, setActiveSection] = useState('password');
  const [isSaved, setIsSaved] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    emailEnrollment: true, emailReview: true, emailPayout: false,
    pushLiveClass: true, pushMessage: true, pushAnnouncement: false
  });
  const [privacy, setPrivacy] = useState({ showEmail: false, showPhone: false, showEarnings: false });
  const [twoFA, setTwoFA] = useState(false);

  const sections = [
    { id: 'password', name: 'Password', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Eye },
    { id: 'security', name: '2FA', icon: Shield }
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className="click-press"
      style={{
        width: '40px', height: '22px', borderRadius: '11px', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
        backgroundColor: checked ? '#22c55e' : '#e5e7eb'
      }}
    >
      <span style={{
        position: 'absolute', top: '2px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        left: checked ? '20px' : '2px'
      }} />
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Settings</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Manage your account security and preferences</p>
      </div>

      {/* Section Tabs */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {sections.map(s => {
          const Icon = s.icon;
          return (
            <button key={s.id} onClick={() => setActiveSection(s.id)} className="click-press"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', border: 'none',
                backgroundColor: activeSection === s.id ? '#37123c' : '#f0ecf4', color: activeSection === s.id ? '#ffffff' : '#1e0926'
              }}
            >
              <Icon size={13} /> {s.name}
            </button>
          );
        })}
      </div>

      <div className="smart-card" style={{ padding: '20px', textAlign: 'left' }}>
        {/* Password */}
        {activeSection === 'password' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Lock size={15} style={{ color: '#7c3aed' }} /> Change Password</h4>
            <div className="form-group">
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>Current Password</label>
              <input type="password" value={passwordForm.current} onChange={e => setPasswordForm(f => ({ ...f, current: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>New Password</label>
              <input type="password" value={passwordForm.newPass} onChange={e => setPasswordForm(f => ({ ...f, newPass: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>Confirm Password</label>
              <input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm(f => ({ ...f, confirm: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
            </div>
            <button onClick={handleSave} className="btn-primary click-press" style={{ fontSize: '12px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Save size={14} /> Update Password
            </button>
          </div>
        )}

        {/* Notifications */}
        {activeSection === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={15} style={{ color: '#7c3aed' }} /> Email Notifications</h4>
            {[
              { key: 'emailEnrollment', label: 'New student enrollment' },
              { key: 'emailReview', label: 'New review received' },
              { key: 'emailPayout', label: 'Payout processed' }
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{item.label}</span>
                <ToggleSwitch checked={notifications[item.key]} onChange={val => setNotifications(n => ({ ...n, [item.key]: val }))} />
              </div>
            ))}
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}><Smartphone size={15} style={{ color: '#7c3aed' }} /> Push Notifications</h4>
            {[
              { key: 'pushLiveClass', label: 'Live class reminders' },
              { key: 'pushMessage', label: 'New messages' },
              { key: 'pushAnnouncement', label: 'Platform announcements' }
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{item.label}</span>
                <ToggleSwitch checked={notifications[item.key]} onChange={val => setNotifications(n => ({ ...n, [item.key]: val }))} />
              </div>
            ))}
          </div>
        )}

        {/* Privacy */}
        {activeSection === 'privacy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Eye size={15} style={{ color: '#7c3aed' }} /> Privacy Settings</h4>
            {[
              { key: 'showEmail', label: 'Show email to students' },
              { key: 'showPhone', label: 'Show phone to students' },
              { key: 'showEarnings', label: 'Show earnings publicly' }
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{item.label}</span>
                <ToggleSwitch checked={privacy[item.key]} onChange={val => setPrivacy(p => ({ ...p, [item.key]: val }))} />
              </div>
            ))}
          </div>
        )}

        {/* 2FA */}
        {activeSection === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', padding: '20px 0' }}>
            <Shield size={40} style={{ color: twoFA ? '#22c55e' : '#d1d5db' }} />
            <h4 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Two-Factor Authentication</h4>
            <p style={{ fontSize: '11px', color: '#8c7f94', textAlign: 'center', maxWidth: '240px', margin: 0 }}>
              Add an extra layer of security to your account with 2FA via authenticator app.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>2FA Status</span>
              <ToggleSwitch checked={twoFA} onChange={setTwoFA} />
            </div>
            {twoFA && (
              <div style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#22c55e' }}>2FA is enabled and active</span>
              </div>
            )}
          </div>
        )}

        {isSaved && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', color: '#22c55e', fontSize: '12px', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Settings saved!
          </div>
        )}
      </div>
    </div>
  );
}
