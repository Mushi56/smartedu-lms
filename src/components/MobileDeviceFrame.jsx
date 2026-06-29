import React from 'react';

export default function MobileDeviceFrame({ children }) {
  return (
    <div className="desktop-wrapper">
      <div className="device-frame" style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Device Screen Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
