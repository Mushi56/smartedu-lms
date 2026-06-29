// ─── RBAC Permissions Configuration ─────────────────────────────────────────
// Central authority for role-based access control across the SURIA TECH LMS.

/**
 * Role hierarchy: super-admin > admin > teacher > student
 * Higher roles inherit lower role tab access where applicable.
 */
export const ROLE_HIERARCHY = ['student', 'teacher', 'admin', 'super-admin'];

/**
 * Map each role to the portal it opens by default after login.
 */
export const getPortalForRole = (role) => {
  switch (role) {
    case 'super-admin': return 'super-admin';
    case 'admin':       return 'admin';
    case 'teacher':     return 'teacher';
    default:            return 'student';
  }
};

/**
 * Tabs each portal is allowed to render.
 * The key is the portal name, value is a Set of allowed activeTab ids.
 */
const PORTAL_TABS = {
  student: new Set([
    'home', 'explore', 'ai', 'tasks', 'profile',
    'dashboard', 'courses', 'live-classes', 'schedule',
    'assignments', 'resources', 'messages', 'progress',
    'certificates', 'payments', 'favorites',
    'become-instructor', 'settings', 'quizzes', 'notes',
    'video-player', 'course-detail'
  ]),

  teacher: new Set([
    'home', 'explore', 'ai', 'tasks', 'profile',
    'teacher-dashboard', 'teacher-courses', 'teacher-create-course',
    'teacher-live-classes', 'teacher-students', 'teacher-earnings',
    'teacher-reviews', 'teacher-profile', 'teacher-settings',
    'teacher-messages', 'messages',
    // Teachers can also browse courses as students
    'dashboard', 'courses', 'live-classes', 'schedule',
    'assignments', 'resources', 'progress',
    'certificates', 'payments', 'favorites', 'settings'
  ]),

  admin: new Set([
    'home', 'explore', 'ai', 'tasks', 'profile',
    'dashboard', 'courses', 'add-course', 'categories', 'tags', 'levels',
    'live-classes', 'schedule-class', 'class-recordings', 'live-categories', 'live-settings',
    'users', 'teachers', 'exams', 'orders', 'reports',
    'reviews', 'coupons', 'resources', 'announcements', 'settings',
    'messages',
    // Admin can also view student views
    'schedule', 'assignments', 'progress', 'certificates', 'payments', 'favorites'
  ]),

  'super-admin': new Set([
    // Super Admin gets everything admin has, plus platform-level controls
    'home', 'explore', 'ai', 'tasks', 'profile',
    'dashboard', 'courses', 'add-course', 'categories', 'tags', 'levels',
    'live-classes', 'schedule-class', 'class-recordings', 'live-categories', 'live-settings',
    'users', 'teachers', 'exams', 'orders', 'reports',
    'reviews', 'coupons', 'resources', 'announcements', 'settings',
    'messages',
    // Super Admin exclusive
    'super-admin-panel', 'platform-settings', 'financial-settings',
    'integrations', 'security', 'system', 'audit-logs',
    // Student / teacher views for testing
    'schedule', 'assignments', 'progress', 'certificates', 'payments', 'favorites',
    'teacher-dashboard', 'teacher-courses', 'teacher-create-course',
    'teacher-live-classes', 'teacher-students', 'teacher-earnings',
    'teacher-reviews', 'teacher-profile', 'teacher-settings', 'teacher-messages'
  ])
};

/**
 * Check if a portal is allowed to access a specific tab.
 * @param {string} portal - Current portal ('student' | 'teacher' | 'admin' | 'super-admin')
 * @param {string} tabId  - The activeTab id to check
 * @returns {boolean}
 */
export const canAccess = (portal, tabId) => {
  const allowedTabs = PORTAL_TABS[portal];
  if (!allowedTabs) return false;
  return allowedTabs.has(tabId);
};

/**
 * Get portals a user role is allowed to switch between.
 * @param {string} role - User's role
 * @returns {string[]} Array of portal identifiers the user can switch to
 */
export const getAvailablePortals = (role) => {
  switch (role) {
    case 'super-admin':
      return ['student', 'teacher', 'admin', 'super-admin'];
    case 'admin':
      return ['student', 'admin'];
    case 'teacher':
      return ['student', 'teacher'];
    case 'student':
    default:
      return ['student'];
  }
};

/**
 * Teacher verification statuses with display metadata.
 */
export const VERIFICATION_STATUSES = {
  pending:       { label: 'Pending Verification', color: '#eab308', bgColor: 'rgba(234, 179, 8, 0.1)',  icon: '🟡' },
  verified:      { label: 'Verified Teacher',     color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)',  icon: '🟢' },
  premium:       { label: 'Premium Instructor',   color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)', icon: '🔵' },
  'top-educator':{ label: 'Top Educator',         color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.1)', icon: '🟣' },
  suspended:     { label: 'Suspended',            color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)',  icon: '🔴' }
};

/**
 * Actions restricted to specific roles.
 */
export const ROLE_ACTIONS = {
  canCreateCourse:        ['teacher', 'admin', 'super-admin'],
  canApproveTeacher:      ['admin', 'super-admin'],
  canManageUsers:         ['admin', 'super-admin'],
  canDeleteUsers:         ['super-admin'],
  canViewPlatformAnalytics: ['admin', 'super-admin'],
  canManagePlatformSettings: ['super-admin'],
  canManagePaymentGateways: ['super-admin'],
  canAccessApiKeys:       ['super-admin'],
  canManageSecurity:      ['super-admin'],
  canDeleteSuperAdmin:    [], // No one can delete super admin
  canChangeBranding:      ['super-admin'],
  canBecomeInstructor:    ['student'],
  canSwitchPortal:        ['teacher', 'admin', 'super-admin']
};

/**
 * Check if a role can perform a specific action.
 * @param {string} role   - User role
 * @param {string} action - Key from ROLE_ACTIONS
 * @returns {boolean}
 */
export const canPerformAction = (role, action) => {
  const allowedRoles = ROLE_ACTIONS[action];
  if (!allowedRoles) return false;
  return allowedRoles.includes(role);
};
