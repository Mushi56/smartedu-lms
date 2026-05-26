import React, { useState } from 'react';

// 1. Curved Line Chart: Enrollments vs Revenue
export function EnrollmentsRevenueChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  
  const days = ['May 20', 'May 21', 'May 22', 'May 23', 'May 24', 'May 25', 'May 26'];
  // Scaled coordinates for a 400x180 viewport
  // Enrollments data (Blue): [200, 480, 240, 520, 310, 420, 250]
  const enrollmentsY = [130, 60, 120, 50, 100, 70, 110];
  // Revenue data (Green): [$2K, $5K, $3K, $6K, $4K, $8K, $5K]
  const revenueY = [140, 70, 110, 60, 95, 40, 80];

  const getBezierPath = (yPoints) => {
    let path = `M 20,${yPoints[0]}`;
    for (let i = 0; i < yPoints.length - 1; i++) {
      const x1 = 20 + i * 55;
      const y1 = yPoints[i];
      const x2 = 20 + (i + 1) * 55;
      const y2 = yPoints[i + 1];
      const cx1 = x1 + 27;
      const cy1 = y1;
      const cx2 = x2 - 27;
      const cy2 = y2;
      path += ` C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
    }
    return path;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Chart Legends */}
      <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6366f1' }}></span>
          <span>Enrollments</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
          <span>Revenue</span>
        </div>
      </div>

      {/* SVG Container */}
      <svg viewBox="0 0 400 180" width="100%" height="180px">
        {/* Grid lines */}
        <line x1="20" y1="30" x2="360" y2="30" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="75" x2="360" y2="75" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="120" x2="360" y2="120" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="160" x2="360" y2="160" stroke="var(--border-color)" strokeWidth="1" />

        {/* Bezier Lines */}
        <path d={getBezierPath(enrollmentsY)} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        <path d={getBezierPath(revenueY)} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

        {/* Interaction vertical lines and dots */}
        {enrollmentsY.map((ey, idx) => {
          const x = 20 + idx * 55;
          const ry = revenueY[idx];
          const isHovered = hoveredIdx === idx;
          return (
            <g key={idx} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: 'pointer' }}>
              {isHovered && (
                <line x1={x} y1="20" x2={x} y2="160" stroke="var(--primary-color)" strokeOpacity="0.2" strokeWidth="1.5" />
              )}
              {/* Enrollments Dots */}
              <circle cx={x} cy={ey} r={isHovered ? 6 : 4} fill="#6366f1" stroke="white" strokeWidth="2" />
              {/* Revenue Dots */}
              <circle cx={x} cy={ry} r={isHovered ? 6 : 4} fill="#10b981" stroke="white" strokeWidth="2" />
            </g>
          );
        })}

        {/* X-Axis labels */}
        {days.map((day, idx) => (
          <text key={idx} x={20 + idx * 55} y="175" fill="var(--text-muted)" fontSize="9" fontWeight="600" textAnchor="middle">
            {day.split(' ')[1]}
          </text>
        ))}
      </svg>

      {/* Tooltip Overlay */}
      {hoveredIdx !== null && (
        <div className="smart-card glass-effect" style={{
          position: 'absolute',
          left: `${50 + hoveredIdx * 45}px`,
          top: '30px',
          padding: '8px 12px',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-md)',
          fontSize: '11px',
          zIndex: 10,
          border: '1px solid var(--border-color)'
        }}>
          <p style={{ fontWeight: 700, marginBottom: '4px' }}>{days[hoveredIdx]}, 2024</p>
          <p style={{ color: '#6366f1', fontWeight: 600 }}>Enrollments: {Math.round((160 - enrollmentsY[hoveredIdx]) * 4.5)}</p>
          <p style={{ color: '#10b981', fontWeight: 600 }}>Revenue: ${Math.round((160 - revenueY[hoveredIdx]) * 85)}</p>
        </div>
      )}
    </div>
  );
}

// 2. Interactive Donut Chart: Course Status Distribution
export function CourseStatusDonutChart() {
  // Data matching the image exactly:
  // Published (78 - 60.9%), Draft (32 - 25.0%), Pending Review (12 - 9.4%), Archived (6 - 4.7%)
  const segments = [
    { label: 'Published', count: 78, percent: '60.9%', color: '#6366f1', strokeDash: '191 314', strokeOffset: '0' },
    { label: 'Draft', count: 32, percent: '25.0%', color: '#38bdf8', strokeDash: '78 314', strokeOffset: '-191' },
    { label: 'Pending Review', count: 12, percent: '9.4%', color: '#f59e0b', strokeDash: '29 314', strokeOffset: '-269' },
    { label: 'Archived', count: 6, percent: '4.7%', color: '#94a3b8', strokeDash: '16 314', strokeOffset: '-298' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', position: 'relative' }}>
      <div className="donut-chart-wrapper">
        <svg viewBox="0 0 120 120" className="donut-chart-svg" style={{ transform: 'rotate(-90deg)' }}>
          {/* Segments */}
          {segments.map((seg, idx) => (
            <circle
              key={idx}
              cx="60"
              cy="60"
              r="50"
              fill="transparent"
              stroke={seg.color}
              strokeWidth="10"
              strokeDasharray={seg.strokeDash}
              strokeDashoffset={seg.strokeOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-width 0.2s' }}
            />
          ))}
        </svg>

        {/* Center Text Block */}
        <div className="donut-center-label">
          <span className="donut-center-val">128</span>
          <span className="donut-center-text">Total Courses</span>
        </div>
      </div>

      {/* Legend Block */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
        {segments.map((seg, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: seg.color }}></span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{seg.label}</span>
            </div>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {seg.count} ({seg.percent})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Mini Sparkline
export function Sparkline({ color, isPositive = true }) {
  const points = isPositive 
    ? "5,15 15,10 25,12 35,5 45,8 55,2" 
    : "5,2 15,8 25,5 35,12 45,10 55,15";

  return (
    <svg className="sparkline-svg">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
