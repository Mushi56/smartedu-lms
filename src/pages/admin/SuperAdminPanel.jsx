import React, { useState } from 'react';
import {
  Shield, Users, Palette, DollarSign, Link2, Lock, Server,
  Trash2, RotateCcw, Plus, Edit3, Check, X, Eye, AlertTriangle,
  Settings, Globe, Mail, Database, Key, ToggleRight, ChevronRight, 
  CheckCircle2, Smartphone
} from 'lucide-react';

export default function SuperAdminPanel({ user }) {
  const [activeSection, setActiveSection] = useState('users');

  const sections = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'branding', name: 'Platform Branding', icon: Palette },
    { id: 'financial', name: 'Financial Settings', icon: DollarSign },
    { id: 'integrations', name: 'Integrations', icon: Link2 },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'system', name: 'System', icon: Server }
  ];

  // Mock data
  const [admins] = useState([
    { id: 'a1', name: 'Sarah Johnson', email: 'admin@suriatech.com', role: 'admin', status: 'active', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&q=80' },
    { id: 'a2', name: 'James Lee', email: 'james@suriatech.com', role: 'admin', status: 'active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80' }
  ]);

  const [brandingForm, setBrandingForm] = useState({ siteName: 'SURIA TECH', tagline: 'Smart Learning Platform', primaryColor: '#37123c', accentColor: '#caba61' });
  const [financialForm, setFinancialForm] = useState({ commission: '15', currency: 'USD', taxRate: '6', paymentGateway: 'Stripe' });
  const [integrations, setIntegrations] = useState({
    firebase: true, supabase: false, s3: true, sendgrid: true, twilio: false
  });
  const [securitySettings, setSecuritySettings] = useState({
    maintenanceMode: false, enforce2FA: false, maxLoginAttempts: '5', sessionTimeout: '30'
  });
  const [features, setFeatures] = useState({
    aiTutor: true, liveClasses: true, certificates: true, gamification: false, marketplace: false
  });

  const ToggleSwitch = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className="click-press"
      style={{ width: '40px', height: '22px', borderRadius: '11px', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
        backgroundColor: checked ? '#22c55e' : '#e5e7eb' }}
    >
      <span style={{ position: 'absolute', top: '2px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        left: checked ? '20px' : '2px' }} />
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={20} style={{ color: '#eab308' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Super Admin Panel</h2>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Full platform control — handle with care</p>
      </div>

      {/* Warning */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)' }}>
        <AlertTriangle size={14} style={{ color: '#eab308', flexShrink: 0 }} />
        <span style={{ fontSize: '10.5px', color: '#92400e', fontWeight: 600 }}>Changes here affect the entire platform. Proceed with caution.</span>
      </div>

      {/* Section Tabs */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {sections.map(s => {
          const Icon = s.icon;
          return (
            <button key={s.id} onClick={() => setActiveSection(s.id)} className="click-press"
              style={{
                display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', border: 'none',
                backgroundColor: activeSection === s.id ? '#37123c' : '#f0ecf4', color: activeSection === s.id ? '#fff' : '#1e0926'
              }}
            >
              <Icon size={12} /> {s.name}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="smart-card" style={{ padding: '20px', textAlign: 'left' }}>

        {/* USER MANAGEMENT */}
        {activeSection === 'users' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Admin Accounts</h4>
              <button className="btn-primary click-press" style={{ fontSize: '10px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Plus size={11} /> Create Admin
              </button>
            </div>
            {admins.map(admin => (
              <div key={admin.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <img src={admin.avatar} alt={admin.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, display: 'block' }}>{admin.name}</span>
                  <span style={{ fontSize: '10px', color: '#8c7f94' }}>{admin.email} · {admin.role}</span>
                </div>
                <button className="click-press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', padding: '4px' }}><Edit3 size={13} /></button>
                <button className="click-press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}><Trash2 size={13} /></button>
              </div>
            ))}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '6px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>Dangerous Actions</h4>
              <button className="click-press" style={{ width: '100%', fontSize: '11px', padding: '10px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)', color: '#ef4444', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={() => alert('Account deletion requires email confirmation.')}
              >
                <Trash2 size={13} /> Delete Account (Requires Confirmation)
              </button>
              <button className="click-press" style={{ width: '100%', fontSize: '11px', padding: '10px', borderRadius: '8px', border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.04)', color: '#22c55e', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}
                onClick={() => alert('Restore deleted accounts from archive.')}
              >
                <RotateCcw size={13} /> Restore Deleted Accounts
              </button>
            </div>
          </div>
        )}

        {/* BRANDING */}
        {activeSection === 'branding' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={15} style={{ color: '#7c3aed' }} /> Platform Branding
            </h4>
            {[
              { label: 'Platform Name', key: 'siteName' },
              { label: 'Tagline', key: 'tagline' }
            ].map(f => (
              <div key={f.key} className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>{f.label}</label>
                <input type="text" value={brandingForm[f.key]} onChange={e => setBrandingForm(bf => ({ ...bf, [f.key]: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['primaryColor', 'accentColor'].map(key => (
                <div key={key} className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>{key === 'primaryColor' ? 'Primary Color' : 'Accent Color'}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="color" value={brandingForm[key]} onChange={e => setBrandingForm(bf => ({ ...bf, [key]: e.target.value }))} style={{ width: '36px', height: '36px', border: 'none', cursor: 'pointer', borderRadius: '8px' }} />
                    <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'var(--mono)' }}>{brandingForm[key]}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary click-press" style={{ fontSize: '12px', padding: '10px' }}><Check size={14} /> Save Branding</button>
          </div>
        )}

        {/* FINANCIAL */}
        {activeSection === 'financial' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={15} style={{ color: '#22c55e' }} /> Financial Configuration
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>Commission %</label>
                <input type="number" value={financialForm.commission} onChange={e => setFinancialForm(f => ({ ...f, commission: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>Tax Rate %</label>
                <input type="number" value={financialForm.taxRate} onChange={e => setFinancialForm(f => ({ ...f, taxRate: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              </div>
            </div>
            <div className="form-group">
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>Currency</label>
              <select value={financialForm.currency} onChange={e => setFinancialForm(f => ({ ...f, currency: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                <option>USD</option><option>EUR</option><option>MYR</option><option>INR</option><option>GBP</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>Payment Gateway</label>
              <select value={financialForm.paymentGateway} onChange={e => setFinancialForm(f => ({ ...f, paymentGateway: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                <option>Stripe</option><option>PayPal</option><option>Razorpay</option><option>Manual</option>
              </select>
            </div>
            <button className="btn-primary click-press" style={{ fontSize: '12px', padding: '10px' }}>Save Financial Settings</button>
          </div>
        )}

        {/* INTEGRATIONS */}
        {activeSection === 'integrations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link2 size={15} style={{ color: '#3b82f6' }} /> Third-Party Integrations
            </h4>
            {[
              { key: 'firebase', label: 'Firebase', desc: 'Authentication & Realtime DB', icon: Database },
              { key: 'supabase', label: 'Supabase', desc: 'Backend as a Service', icon: Server },
              { key: 's3', label: 'AWS S3 / Storage', desc: 'File & media storage', icon: Database },
              { key: 'sendgrid', label: 'SendGrid', desc: 'Transactional email service', icon: Mail },
              { key: 'twilio', label: 'Twilio SMS', desc: 'SMS notifications', icon: Smartphone }
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59,130,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={14} style={{ color: '#3b82f6' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 700, display: 'block' }}>{item.label}</span>
                      <span style={{ fontSize: '9px', color: '#8c7f94' }}>{item.desc}</span>
                    </div>
                  </div>
                  <ToggleSwitch checked={integrations[item.key]} onChange={val => setIntegrations(i => ({ ...i, [item.key]: val }))} />
                </div>
              );
            })}
            <div className="form-group" style={{ marginTop: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94', display: 'flex', alignItems: 'center', gap: '4px' }}><Key size={12} /> API Key Management</label>
              <input type="password" placeholder="Enter API key..." style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px', fontFamily: 'var(--mono)' }} />
            </div>
          </div>
        )}

        {/* SECURITY */}
        {activeSection === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={15} style={{ color: '#ef4444' }} /> Security & Access Control
            </h4>
            {[
              { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Take the platform offline temporarily' },
              { key: 'enforce2FA', label: 'Enforce 2FA for All', desc: 'Require two-factor authentication' }
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, display: 'block' }}>{item.label}</span>
                  <span style={{ fontSize: '10px', color: '#8c7f94' }}>{item.desc}</span>
                </div>
                <ToggleSwitch checked={securitySettings[item.key]} onChange={val => setSecuritySettings(s => ({ ...s, [item.key]: val }))} />
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>Max Login Attempts</label>
                <input type="number" value={securitySettings.maxLoginAttempts} onChange={e => setSecuritySettings(s => ({ ...s, maxLoginAttempts: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94' }}>Session Timeout (min)</label>
                <input type="number" value={securitySettings.sessionTimeout} onChange={e => setSecuritySettings(s => ({ ...s, sessionTimeout: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button className="click-press" style={{ flex: 1, fontSize: '11px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', fontWeight: 700 }}>
                View Audit Logs
              </button>
              <button className="click-press" style={{ flex: 1, fontSize: '11px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', fontWeight: 700 }}>
                Create Backup
              </button>
            </div>
          </div>
        )}

        {/* SYSTEM */}
        {activeSection === 'system' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={15} style={{ color: '#a855f7' }} /> Feature Flags & System
            </h4>
            {[
              { key: 'aiTutor', label: 'AI Tutor Module' },
              { key: 'liveClasses', label: 'Live Classes Feature' },
              { key: 'certificates', label: 'Certificate Generation' },
              { key: 'gamification', label: 'Gamification / XP System' },
              { key: 'marketplace', label: 'Course Marketplace' }
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{item.label}</span>
                <ToggleSwitch checked={features[item.key]} onChange={val => setFeatures(f => ({ ...f, [item.key]: val }))} />
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '6px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>System Info</h4>
              {[
                { label: 'App Version', value: '2.4.1' },
                { label: 'Last Backup', value: 'Jun 22, 2026 at 3:00 AM' },
                { label: 'Storage Used', value: '12.4 GB / 50 GB' },
                { label: 'Active Users', value: '4,821' }
              ].map((info, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '12px' }}>
                  <span style={{ color: '#8c7f94', fontWeight: 600 }}>{info.label}</span>
                  <span style={{ fontWeight: 700, color: '#1e0926' }}>{info.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
