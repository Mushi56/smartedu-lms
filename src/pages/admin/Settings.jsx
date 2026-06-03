import React, { useState } from 'react';
import { Sliders, Key, Shield, CheckCircle2, Lock } from 'lucide-react';

export default function Settings({ apiKey, setApiKey }) {
  const [siteName, setSiteName] = useState('SURIA TECH');
  const [currency, setCurrency] = useState('USD ($)');
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(tempKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700 }}>System Settings</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Configure global LMS preferences, payment settings, and developer AI credentials</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* General Preferences */}
        <div className="smart-card" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Sliders size={16} style={{ color: 'var(--primary-color)' }} />
            <span>General Platform Preferences</span>
          </h3>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label>Platform Name</label>
                <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Billing Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>INR (₹)</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Global Gemini Credentials */}
        <div className="smart-card" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Lock size={16} style={{ color: 'var(--primary-color)' }} />
            <span>Institutional Gemini AI Key</span>
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Provide a global Google Gemini API credential to power interactive conversational doubt solving and auto-grading modules for all students across the entire institution.
          </p>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label>API Key String</label>
              <input 
                type="password" 
                placeholder="AIzaSy..." 
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--mono)', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              {isSaved && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--status-success)' }}>
                  <CheckCircle2 size={14} />
                  <span>Platform Credentials Saved!</span>
                </div>
              )}
              <button type="submit" className="btn-primary click-press">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
