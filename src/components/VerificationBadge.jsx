import React from 'react';
import { Check, AlertCircle, Shield, Star, Award, XCircle } from 'lucide-react';
import { VERIFICATION_STATUSES } from '../data/permissions';

/**
 * Unified verification badge component for teacher verification statuses.
 * Replaces all inline renderVerifiedBadge() implementations across the app.
 * 
 * Also supports legacy role-based badges (admin, super-admin) for backward compatibility.
 * 
 * @param {Object} props
 * @param {'pending'|'verified'|'premium'|'top-educator'|'suspended'|string} props.status - Verification status or legacy role
 * @param {number} [props.size=14] - Badge diameter in pixels
 * @param {boolean} [props.showLabel=false] - Whether to show the label text beside the badge
 * @param {Object} [props.style] - Additional inline styles
 */
export default function VerificationBadge({ status, size = 14, showLabel = false, style = {} }) {
  if (!status) return null;

  // Legacy role-based badges (admin / super-admin)
  const legacyRoles = {
    'admin':       { label: 'Verified Admin',       color: '#ec4899' },
    'super-admin': { label: 'Verified Super Admin', color: '#eab308' }
  };

  // Determine badge config
  let badgeColor, label, IconComponent;

  if (VERIFICATION_STATUSES[status]) {
    const cfg = VERIFICATION_STATUSES[status];
    badgeColor = cfg.color;
    label = cfg.label;

    switch (status) {
      case 'pending':       IconComponent = AlertCircle; break;
      case 'verified':      IconComponent = Check;       break;
      case 'premium':       IconComponent = Star;        break;
      case 'top-educator':  IconComponent = Award;       break;
      case 'suspended':     IconComponent = XCircle;     break;
      default:              IconComponent = Check;       break;
    }
  } else if (legacyRoles[status]) {
    badgeColor = legacyRoles[status].color;
    label = legacyRoles[status].label;
    IconComponent = Shield;
  } else if (status === 'teacher') {
    // Default teacher badge → verified green
    badgeColor = '#22c55e';
    label = 'Verified Teacher';
    IconComponent = Check;
  } else {
    return null;
  }

  return (
    <span
      title={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: showLabel ? '5px' : 0,
        ...style
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: badgeColor,
          color: '#ffffff',
          borderRadius: '50%',
          width: `${size}px`,
          height: `${size}px`,
          flexShrink: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          transition: 'transform 0.2s ease'
        }}
      >
        <IconComponent size={size - 4} strokeWidth={3} style={{ display: 'block' }} />
      </span>
      {showLabel && (
        <span style={{
          fontSize: `${Math.max(size - 4, 9)}px`,
          fontWeight: 700,
          color: badgeColor,
          whiteSpace: 'nowrap'
        }}>
          {label}
        </span>
      )}
    </span>
  );
}
