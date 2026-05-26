import React, { useState } from 'react';
import { Sparkles, Shield, User, Key, Sliders, CheckCircle2 } from 'lucide-react';

export default function Profile({ apiKey, setApiKey }) {
  const [name, setName] = useState('Arjun Kumar');
  const [email, setEmail] = useState('arjun.k@student.com');
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Profile & Platform Settings</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Configure your profile details and optimize the Gemini AI model parameters</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* 1. Student Personal Information Card */}
        <div className="smart-card" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', textAlign: 'left' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid var(--border-color)', objectFit: 'cover' }}
              alt="User big profile" 
            />
            <span style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', border: '2px solid white' }}>
              📸
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} style={{ color: 'var(--primary-color)' }} />
              <span>Personal Information</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label>Student Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Gemini AI Developer Settings Center */}
        <div className="smart-card" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={16} style={{ color: 'var(--primary-color)' }} />
            <span>AI Tutor & Grader Settings</span>
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            SmartEdu LMS comes with a realistic local AI simulator. Insert your **Google Gemini API Key** below to unlock a real, state-of-the-art interactive LLM doubt solver!
          </p>

          <form onSubmit={handleSaveAISettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* API Key Input */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Key size={14} />
                <span>Google Gemini API Key</span>
              </label>
              <input 
                type="password" 
                placeholder="AIzaSy..." 
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--mono)', fontSize: '13px' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Your API Key is saved locally in your browser memory and never uploaded to any external analytics systems.
              </span>
            </div>

            {/* Models Dropdown & Temperature Slider Split */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={14} />
                  <span>Select Gemini Model</span>
                </label>
                <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fastest & recommended)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Extremely creative)</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sliders size={14} />
                    <span>AI Creativity (Temperature)</span>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{temperature}</span>
                </label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1.0" 
                  step="0.1" 
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  style={{ cursor: 'pointer', padding: 0 }}
                />
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              {isSaved && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--status-success)' }}>
                  <CheckCircle2 size={14} />
                  <span>Settings Saved Successfully!</span>
                </div>
              )}
              <button 
                type="submit" 
                className="btn-primary click-press"
              >
                Save Developer Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
