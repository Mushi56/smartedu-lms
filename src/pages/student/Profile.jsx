import React, { useState } from 'react';
import { Sparkles, Shield, User, Key, Sliders, CheckCircle2, Camera } from 'lucide-react';

export default function Profile({ apiKey, setApiKey }) {
  const [name, setName] = useState('Omar Hassan');
  const [email, setEmail] = useState('omar.hassan@example.com');
  const [tempApiKey, setTempApiKey] = useState(apiKey || '');
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
  const [temperature, setTemperature] = useState(0.7);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveAISettings = (e) => {
    e.preventDefault();
    setApiKey(tempApiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const premiumCard = {
    background: '#ffffff',
    borderRadius: '24px',
    border: '1px solid rgba(0,0,0,0.02)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
    padding: '24px',
    position: 'relative'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(0,0,0,0.05)',
    backgroundColor: '#f8fafc',
    fontSize: '13px',
    fontWeight: 500,
    outline: 'none',
    color: 'var(--text-primary)',
    fontFamily: 'inherit',
    transition: 'all 0.2s'
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: 800,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>Profile & Settings</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 550 }}>Configure your profile details and optimize the Gemini AI model parameters</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* 1. Student Personal Information Card */}
        <div style={{ ...premiumCard, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
                style={{ width: '84px', height: '84px', borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'cover' }}
                alt="User big profile" 
              />
              <span style={{ 
                position: 'absolute', bottom: '0px', right: '0px', 
                width: '26px', height: '26px', borderRadius: '50%', 
                backgroundColor: 'var(--primary-color)', color: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                border: '2px solid white', cursor: 'pointer', boxShadow: '0 2px 6px rgba(99,102,241,0.2)' 
              }} className="click-press">
                <Camera size={12} />
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Omar Hassan</h3>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Student ID: ST-90825</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '12.5px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', margin: 0, color: 'var(--text-primary)' }}>
              <User size={16} style={{ color: 'var(--primary-color)' }} />
              <span>Personal Information</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Student Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Gemini AI Developer Settings Center */}
        <div style={{ ...premiumCard }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
            <Sparkles size={16} style={{ color: 'var(--primary-color)' }} />
            <span>AI Tutor & Grader Settings</span>
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5, fontWeight: 550 }}>
            SURIA TECH LMS comes with a realistic local AI simulator. Insert your **Google Gemini API Key** below to unlock a real, state-of-the-art interactive LLM doubt solver!
          </p>

          <form onSubmit={handleSaveAISettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* API Key Input */}
            <div>
              <label style={labelStyle}>
                <Key size={13} style={{ color: 'var(--primary-color)' }} />
                <span>Google Gemini API Key</span>
              </label>
              <input 
                type="password" 
                placeholder="AIzaSy..." 
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '2px' }}
              />
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 500, lineHeight: 1.4 }}>
                Your API Key is saved locally in your browser memory and never uploaded to any external analytics systems.
              </span>
            </div>

            {/* Models Dropdown & Temperature Slider Split */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={labelStyle}>
                  <Shield size={13} style={{ color: 'var(--primary-color)' }} />
                  <span>Select Gemini Model</span>
                </label>
                <select 
                  value={selectedModel} 
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fastest)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Creative)</option>
                </select>
              </div>

              <div>
                <label style={{ ...labelStyle, justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sliders size={13} style={{ color: 'var(--primary-color)' }} />
                    <span>AI Creativity (Temp)</span>
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--primary-color)' }}>{temperature}</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', height: '44px' }}>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.0" 
                    step="0.1" 
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(0,0,0,0.03)', paddingTop: '16px', marginTop: '4px' }}>
              {isSaved && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#10b981' }}>
                  <CheckCircle2 size={14} />
                  <span>Settings Saved!</span>
                </div>
              )}
              <button 
                type="submit" 
                className="click-press"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '14px',
                  fontSize: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.15)'
                }}
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
