import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function MobileDeviceFrame({ children }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="desktop-wrapper">
      <div className="device-frame">
        {/* Device Status Bar */}
        <div className="device-status-bar simulator-only">
          <span>{time}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={13} style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>

        {/* Device Screen Content */}
        {children}

        {/* Home Navigation Indicator Bar */}
        <div className="device-home-bar simulator-only" />
      </div>
    </div>
  );
}
