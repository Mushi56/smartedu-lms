import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function MobileDeviceFrame({ children, activeTab, currentPortal, scrolled }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const isHomeHeaderDark = activeTab === 'home' && !scrolled;
  const isPurpleTheme = currentPortal !== 'admin' && currentPortal !== 'super-admin';
  
  const statusBarBg = isHomeHeaderDark 
    ? (isPurpleTheme ? '#4f46e5' : '#1e1b4b') 
    : '#ffffff';
    
  const statusBarColor = isHomeHeaderDark ? '#ffffff' : '#475569';

  return (
    <div className="desktop-wrapper">
      <div className="device-frame" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Device Status Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px 4px 24px',
          background: statusBarBg,
          color: statusBarColor,
          fontSize: '11px',
          fontWeight: 800,
          zIndex: 100,
          height: '34px',
          transition: 'all 0.3s ease',
          fontFamily: 'sans-serif'
        }}>
          <span>{time}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={14} />
          </div>
        </div>

        {/* Device Screen Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>

        {/* Home Navigation Indicator Bar */}
        <div style={{
          height: '24px',
          background: '#ffffff',
          position: 'relative',
          zIndex: 100,
          borderBottomLeftRadius: '36px',
          borderBottomRightRadius: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid rgba(0,0,0,0.02)'
        }}>
          <div style={{
            width: '120px',
            height: '4.5px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px'
          }} />
        </div>
      </div>
    </div>
  );
}
