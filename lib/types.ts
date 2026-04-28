export type ProvisioningStatus = 'success' | 'failed' | 'pending' | 'warning' | 'idle'

export type PipelineStage = {
  name: string
  status: ProvisioningStatus
  detail?: string
}

export type Employee = {
  id: string
  name: string
  department: string
  hireDate: string
  customerId: string
  customerName: string
  identityType: 'email' | 'phone'
  identity: string
  pipeline: PipelineStage[]
  status: 'active' | 'pending' | 'failed' | 'terminated'
  riskLevel: 'none' | 'low' | 'medium' | 'high'
  timeToAccess?: number
  terminatedDate?: string
  blinkSessionActive?: boolean
  downstreamSessionsCleared?: boolean
  notes?: string
}

export type AlertSeverity = 'high' | 'medium' | 'low'
export type AlertType =
  | 'deprovisioning_lag'
  | 'token_expiry'
  | 'identity_unverified'
  | 'deep_link_failure'
  | 'provisioning_delay'
  | 'phone_recycling_risk'
  | 'prestart_access'

export type SecurityAlert = {
  id: string
  severity: AlertSeverity
  type: AlertType
  title: string
  message: string
  affectedEmployeeIds: string[]
  customerId: string
  customerName: string
  timestamp: string
  actionRequired: boolean
  remediation: string
}

export type DeepLinkApp = {
  name: string
  successRate: number
  totalAttempts: number
  trend: 'up' | 'down' | 'stable'
  failureReason?: string
}

export type WeeklyTrend = {
  day: string
  activations: number
  failures: number
  avgHours: number
}

export type Metrics = {
  avgTimeToAccess: number
  day1ActivationRate: number
  selfServiceRecoveryRate: number
  provisioningSuccessRate: number
  activeEmployees: number
  newHiresThisWeek: number
  deepLinks: DeepLinkApp[]
  weeklyTrend: WeeklyTrend[]
}

export type Customer = {
  id: string
  name: string
  industry: string
  employeeCount: number
  scimTokenExpiry: string
  integrationHealth: number
  csm: string
}

export type AuditEntry = {
  id: string
  timestamp: string
  action: string
  target: string
  customerId: string
  customerName: string
  actor: string
  result: 'success' | 'failure'
  details?: string
}

export type ToastMessage = {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export type ConfirmConfig = {
  title: string
  message: string
  confirmLabel: string
  severity: 'danger' | 'warning'
  onConfirm: () => void
}

export type ActionHandlers = {
  revokeSession: (employeeId: string) => void
  retryProvision: (employeeId: string) => void
  sendVerificationSms: (employeeId: string) => void
  resolveAlert: (alertId: string) => void
  dismissAlert: (alertId: string) => void
  loadingActions: Record<string, string>
}
