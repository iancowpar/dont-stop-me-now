import type { Customer, Employee, SecurityAlert, Metrics } from './types'

export const customers: Customer[] = [
  {
    id: 'walmart',
    name: 'Walmart Distribution',
    industry: 'Retail',
    employeeCount: 5200,
    scimTokenExpiry: '2026-07-15',
    integrationHealth: 91,
    csm: 'Jake Torres',
  },
  {
    id: 'hca',
    name: 'HCA Healthcare',
    industry: 'Healthcare',
    employeeCount: 1800,
    scimTokenExpiry: '2026-06-30',
    integrationHealth: 74,
    csm: 'Priya Mehta',
  },
  {
    id: 'target',
    name: 'Target Corp',
    industry: 'Retail',
    employeeCount: 3100,
    scimTokenExpiry: '2026-05-05',
    integrationHealth: 88,
    csm: 'Jake Torres',
  },
]

const STAGE_NAMES = ['Workday Record', 'SCIM Event', 'Blink Account', 'Identity Verified', 'Apps Connected']

type StageStatus = 'success' | 'failed' | 'pending' | 'warning' | 'idle'

function pipeline(
  statuses: StageStatus[],
  details: (string | undefined)[] = []
): Employee['pipeline'] {
  return STAGE_NAMES.map((name, i) => ({
    name,
    status: statuses[i] ?? 'idle',
    detail: details[i],
  }))
}

export const employees: Employee[] = [
  // ── Walmart employees ──────────────────────────────────────────────────────
  {
    id: 'e001',
    name: 'Sarah Chen',
    department: 'Warehouse Operations',
    hireDate: '2026-04-27',
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    identityType: 'email',
    identity: 's.chen.personal@gmail.com',
    pipeline: pipeline(
      ['success', 'success', 'success', 'warning', 'idle'],
      [
        'Record created 06:02 AM',
        'SCIM event fired 06:07 AM',
        'Account created 06:08 AM',
        'Verification email sent — unopened after 3h 14m',
        undefined,
      ]
    ),
    status: 'pending',
    riskLevel: 'medium',
    notes: 'Day-1 hire blocked at identity verification. Verification email unopened. Consider SMS fallback trigger.',
  },
  {
    id: 'e002',
    name: 'James Park',
    department: 'Logistics',
    hireDate: '2026-04-26',
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    identityType: 'phone',
    identity: '+1 (555) 203-4471',
    pipeline: pipeline(
      ['success', 'success', 'success', 'success', 'success'],
      [
        'Record created 08:15 AM',
        'SCIM event fired 08:19 AM',
        'Account created 08:21 AM',
        'Phone verified via OTP 10:24 AM',
        'All 5 apps connected 10:31 AM',
      ]
    ),
    status: 'active',
    riskLevel: 'none',
    timeToAccess: 2.3,
  },
  {
    id: 'e003',
    name: 'Maria Santos',
    department: 'Inventory',
    hireDate: '2026-04-27',
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    identityType: 'phone',
    identity: '+1 (555) 847-2910',
    pipeline: pipeline(
      ['success', 'success', 'pending', 'idle', 'idle'],
      [
        'Record created 07:55 AM',
        'SCIM event fired 08:01 AM',
        'Account creation in progress (45m elapsed)',
        undefined,
        undefined,
      ]
    ),
    status: 'pending',
    riskLevel: 'low',
    notes: 'Account creation delayed — SCIM handler queue at 94% capacity. Auto-scaling triggered.',
  },
  {
    id: 'e004',
    name: 'David Kim',
    department: 'HR Operations',
    hireDate: '2026-04-25',
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    identityType: 'email',
    identity: 'd.kim.home@outlook.com',
    pipeline: pipeline(
      ['success', 'success', 'success', 'success', 'warning'],
      [
        'Record created 09:00 AM',
        'SCIM event fired 09:04 AM',
        'Account created 09:06 AM',
        'Email verified 11:22 AM',
        'Benefits deep link failing — SSO audience mismatch (401)',
      ]
    ),
    status: 'active',
    riskLevel: 'low',
    timeToAccess: 2.4,
    notes: 'Benefits app returning 401 on deep link. SAML audience claim mismatch with benefits provider config.',
  },
  {
    id: 'e005',
    name: 'Linda Zhou',
    department: 'Store Management',
    hireDate: '2026-02-14',
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    identityType: 'phone',
    identity: '+1 (555) 614-9902',
    pipeline: pipeline(['success', 'success', 'success', 'success', 'success']),
    status: 'terminated',
    terminatedDate: '2026-04-24',
    blinkSessionActive: true,
    riskLevel: 'high',
    timeToAccess: 1.8,
    notes: 'TERMINATED Apr 24. Nightly reconciliation job detected Apr 27: Workday shows status inactive, Blink session still active. SCIM deprovision event was sent but failed to process (504 timeout in SCIM handler at 17:31). Payroll and schedule data accessible.',
  },
  {
    id: 'e006',
    name: 'Antonio Rivera',
    department: 'Supply Chain',
    hireDate: '2026-04-23',
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    identityType: 'phone',
    identity: '+1 (555) 330-7751',
    pipeline: pipeline(
      ['success', 'success', 'success', 'success', 'success'],
      [
        'Record created 07:30 AM',
        'SCIM event fired 07:34 AM',
        'Account created 07:36 AM',
        'Phone verified 10:41 AM',
        'All 5 apps connected 10:47 AM',
      ]
    ),
    status: 'active',
    riskLevel: 'none',
    timeToAccess: 3.3,
  },

  // ── HCA Healthcare employees ───────────────────────────────────────────────
  {
    id: 'e007',
    name: 'Dr. Patricia Wu',
    department: 'Emergency Medicine',
    hireDate: '2026-04-26',
    customerId: 'hca',
    customerName: 'HCA Healthcare',
    identityType: 'email',
    identity: 'p.wu.md@gmail.com',
    pipeline: pipeline(
      ['success', 'success', 'success', 'success', 'success'],
      [
        'Record created 08:00 AM',
        'SCIM event fired 08:03 AM',
        'Account created 08:05 AM',
        'Email verified 09:54 AM',
        'All 5 apps connected 09:58 AM',
      ]
    ),
    status: 'active',
    riskLevel: 'none',
    timeToAccess: 1.9,
  },
  {
    id: 'e008',
    name: 'Robert Nguyen',
    department: 'Nursing — ICU',
    hireDate: '2026-04-27',
    customerId: 'hca',
    customerName: 'HCA Healthcare',
    identityType: 'phone',
    identity: 'Unverified (+1 (555) 702-8814)',
    pipeline: pipeline(
      ['success', 'success', 'success', 'warning', 'idle'],
      [
        'Record created 07:00 AM',
        'SCIM event fired 07:04 AM',
        'Account created 07:06 AM',
        'OTP not delivered — possible VOIP number, 4h elapsed',
        undefined,
      ]
    ),
    status: 'pending',
    riskLevel: 'medium',
    notes: 'OTP undeliverable. Likely VOIP number. Recommend email fallback or manual identity verification.',
  },
  {
    id: 'e009',
    name: 'Casey Morgan',
    department: 'Administration',
    hireDate: '2026-04-14',
    customerId: 'hca',
    customerName: 'HCA Healthcare',
    identityType: 'email',
    identity: 'c.morgan@hotmail.com',
    pipeline: pipeline(['success', 'success', 'success', 'success', 'success']),
    status: 'terminated',
    terminatedDate: '2026-04-25',
    blinkSessionActive: true,
    riskLevel: 'high',
    timeToAccess: 2.7,
    notes: 'TERMINATED Apr 25. Nightly reconciliation job detected Apr 27: Workday shows status inactive, Blink session still active. No SCIM deprovision event received — delivery failure suspected. Patient schedule and admin data accessible. HIPAA compliance risk.',
  },

  // ── Target Corp employees ──────────────────────────────────────────────────
  {
    id: 'e010',
    name: 'Olivia Brennan',
    department: 'Floor Operations',
    hireDate: '2026-04-27',
    customerId: 'target',
    customerName: 'Target Corp',
    identityType: 'email',
    identity: 'o.brennan@yahoo.com',
    pipeline: pipeline(
      ['success', 'success', 'success', 'success', 'success'],
      [
        'Record created 06:45 AM',
        'SCIM event fired 06:49 AM',
        'Account created 06:51 AM',
        'Email verified 08:46 AM',
        'All 5 apps connected 08:50 AM',
      ]
    ),
    status: 'active',
    riskLevel: 'none',
    timeToAccess: 2.1,
  },
  {
    id: 'e011',
    name: 'Marcus Webb',
    department: 'Fulfillment',
    hireDate: '2026-04-26',
    customerId: 'target',
    customerName: 'Target Corp',
    identityType: 'phone',
    identity: '+1 (555) 481-3329',
    pipeline: pipeline(
      ['success', 'success', 'success', 'success', 'success'],
      [
        'Record created 09:10 AM',
        'SCIM event fired 09:14 AM',
        'Account created 09:15 AM',
        'Phone verified 11:06 AM',
        'All 5 apps connected 11:11 AM',
      ]
    ),
    status: 'active',
    riskLevel: 'none',
    timeToAccess: 2.0,
  },
]

export const securityAlerts: SecurityAlert[] = [
  {
    id: 'sa001',
    severity: 'high',
    type: 'deprovisioning_lag',
    title: 'Reconciliation drift detected — terminated employee session active',
    message:
      'Nightly reconciliation job flagged Linda Zhou (Walmart Distribution): Workday employment status is inactive as of Apr 24, but her Blink session remains active 3 days later. Root cause: SCIM deprovision event was sent but failed with a 504 timeout in the handler at 17:31. Payroll and schedule data still accessible.',
    affectedEmployeeIds: ['e005'],
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    timestamp: '2026-04-24T17:30:00',
    actionRequired: true,
    remediation:
      'Force-revoke session immediately. Re-process the failed SCIM deprovision event or trigger manual deprovision. Audit 72h of post-termination data access. Investigate SCIM handler 504 — may indicate queue saturation.',
  },
  {
    id: 'sa002',
    severity: 'high',
    type: 'deprovisioning_lag',
    title: 'Reconciliation drift detected — terminated employee, HIPAA risk',
    message:
      'Nightly reconciliation job flagged Casey Morgan (HCA Healthcare): Workday employment status is inactive as of Apr 25, but Blink session remains active 2 days later. No SCIM deprovision event received — likely a delivery failure. Patient scheduling and admin records remain accessible. Potential HIPAA violation.',
    affectedEmployeeIds: ['e009'],
    customerId: 'hca',
    customerName: 'HCA Healthcare',
    timestamp: '2026-04-25T09:15:00',
    actionRequired: true,
    remediation:
      'Immediate session revocation. Pull full audit log of post-termination data access. Notify HCA compliance team. Investigate SCIM delivery failure and replay deprovision event.',
  },
  {
    id: 'sa003',
    severity: 'medium',
    type: 'token_expiry',
    title: 'SCIM provisioning token expiring in 8 days',
    message:
      "Target Corp's SCIM API token expires May 5. 47 new hires are scheduled for next week. If the token lapses before rotation, all new Workday records will fail to provision in Blink.",
    affectedEmployeeIds: [],
    customerId: 'target',
    customerName: 'Target Corp',
    timestamp: '2026-04-27T08:00:00',
    actionRequired: true,
    remediation:
      "Coordinate with Target IT admin to rotate the SCIM token before May 3 to maintain a buffer. Update token in Blink's integration config.",
  },
  {
    id: 'sa004',
    severity: 'medium',
    type: 'identity_unverified',
    title: '2 employees using unverified phone numbers as SSO',
    message:
      'Robert Nguyen and 1 other employee at HCA Healthcare have unverified phone numbers set as their SSO identity. OTP delivery failed — likely VOIP numbers. Accounts were created without completed verification.',
    affectedEmployeeIds: ['e008'],
    customerId: 'hca',
    customerName: 'HCA Healthcare',
    timestamp: '2026-04-27T06:45:00',
    actionRequired: true,
    remediation:
      'Suspend SSO until re-verified, or trigger email fallback verification. Consider blocking VOIP numbers at identity collection.',
  },
  {
    id: 'sa005',
    severity: 'low',
    type: 'deep_link_failure',
    title: 'Benefits deep link degraded — 8.7% failure rate',
    message:
      "Approximately 452 Walmart employees are receiving errors when accessing the Benefits app via Blink deep link. Root cause: SAML audience claim mismatch between Blink's SSO config and the benefits provider.",
    affectedEmployeeIds: ['e004'],
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    timestamp: '2026-04-26T14:00:00',
    actionRequired: false,
    remediation:
      "Update SAML audience URI in Benefits app SSO configuration to match Blink's issuer claim. Estimated fix time: 2 hours.",
  },
  {
    id: 'sa006',
    severity: 'low',
    type: 'provisioning_delay',
    title: 'SCIM handler queue at 94% — provisioning delays expected',
    message:
      "Walmart's SCIM ingest queue is at 94% capacity due to a morning hire surge. Day-1 hires are experiencing 30–60 minute provisioning delays. Auto-scaling has been triggered.",
    affectedEmployeeIds: ['e003'],
    customerId: 'walmart',
    customerName: 'Walmart Distribution',
    timestamp: '2026-04-27T08:30:00',
    actionRequired: false,
    remediation: 'Monitor queue depth. Auto-scaling should resolve within 2h. No manual action required unless queue exceeds 99%.',
  },
]

export const metricsData: Record<string, Metrics> = {
  walmart: {
    avgTimeToAccess: 2.4,
    day1ActivationRate: 87,
    selfServiceRecoveryRate: 73,
    provisioningSuccessRate: 94,
    activeEmployees: 5200,
    newHiresThisWeek: 47,
    deepLinks: [
      { name: 'Paystub', successRate: 94.2, totalAttempts: 12840, trend: 'stable' },
      { name: 'Schedule', successRate: 98.7, totalAttempts: 31200, trend: 'up' },
      { name: 'Benefits', successRate: 91.3, totalAttempts: 8920, trend: 'down', failureReason: 'SSO audience mismatch' },
      { name: 'Directory', successRate: 99.1, totalAttempts: 18600, trend: 'stable' },
      { name: 'Time & Attendance', successRate: 97.4, totalAttempts: 22100, trend: 'stable' },
    ],
    weeklyTrend: [
      { day: 'Mon', activations: 12, failures: 1, avgHours: 2.8 },
      { day: 'Tue', activations: 9, failures: 0, avgHours: 2.1 },
      { day: 'Wed', activations: 14, failures: 2, avgHours: 3.2 },
      { day: 'Thu', activations: 7, failures: 1, avgHours: 2.4 },
      { day: 'Fri', activations: 5, failures: 0, avgHours: 1.9 },
      { day: 'Mon', activations: 11, failures: 1, avgHours: 2.6 },
      { day: 'Tue', activations: 8, failures: 2, avgHours: 2.4 },
    ],
  },
  hca: {
    avgTimeToAccess: 3.1,
    day1ActivationRate: 79,
    selfServiceRecoveryRate: 61,
    provisioningSuccessRate: 88,
    activeEmployees: 1800,
    newHiresThisWeek: 18,
    deepLinks: [
      { name: 'Paystub', successRate: 97.1, totalAttempts: 4200, trend: 'stable' },
      { name: 'Schedule', successRate: 95.4, totalAttempts: 6100, trend: 'stable' },
      { name: 'Benefits', successRate: 93.8, totalAttempts: 2800, trend: 'stable' },
      { name: 'Patient Records', successRate: 99.4, totalAttempts: 11200, trend: 'up' },
      { name: 'Time & Attendance', successRate: 96.2, totalAttempts: 5400, trend: 'stable' },
    ],
    weeklyTrend: [
      { day: 'Mon', activations: 4, failures: 1, avgHours: 3.4 },
      { day: 'Tue', activations: 3, failures: 0, avgHours: 2.9 },
      { day: 'Wed', activations: 5, failures: 1, avgHours: 3.1 },
      { day: 'Thu', activations: 3, failures: 1, avgHours: 3.8 },
      { day: 'Fri', activations: 2, failures: 0, avgHours: 2.7 },
      { day: 'Mon', activations: 4, failures: 2, avgHours: 3.2 },
      { day: 'Tue', activations: 2, failures: 1, avgHours: 3.1 },
    ],
  },
  target: {
    avgTimeToAccess: 2.1,
    day1ActivationRate: 92,
    selfServiceRecoveryRate: 81,
    provisioningSuccessRate: 97,
    activeEmployees: 3100,
    newHiresThisWeek: 31,
    deepLinks: [
      { name: 'Paystub', successRate: 98.1, totalAttempts: 7900, trend: 'stable' },
      { name: 'Schedule', successRate: 99.2, totalAttempts: 14800, trend: 'up' },
      { name: 'Benefits', successRate: 96.4, totalAttempts: 4100, trend: 'stable' },
      { name: 'Directory', successRate: 98.7, totalAttempts: 9200, trend: 'stable' },
      { name: 'Time & Attendance', successRate: 98.9, totalAttempts: 11400, trend: 'stable' },
    ],
    weeklyTrend: [
      { day: 'Mon', activations: 8, failures: 0, avgHours: 2.2 },
      { day: 'Tue', activations: 6, failures: 1, avgHours: 2.0 },
      { day: 'Wed', activations: 9, failures: 0, avgHours: 2.1 },
      { day: 'Thu', activations: 5, failures: 0, avgHours: 1.9 },
      { day: 'Fri', activations: 3, failures: 0, avgHours: 2.3 },
      { day: 'Mon', activations: 7, failures: 0, avgHours: 2.1 },
      { day: 'Tue', activations: 4, failures: 0, avgHours: 2.0 },
    ],
  },
}
