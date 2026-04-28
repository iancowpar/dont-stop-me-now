import {
  UserX,
  Key,
  UserCheck,
  Link2Off,
  Clock,
  CheckCircle2,
  ArrowRight,
  AlertOctagon,
  AlertTriangle,
  Info,
  Loader2,
  Smartphone,
  CalendarClock,
} from 'lucide-react'
import type { SecurityAlert, AlertSeverity, AlertType, ActionHandlers } from '@/lib/types'

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  { label: string; border: string; bg: string; badge: string; icon: React.ReactNode }
> = {
  high: {
    label: 'High',
    border: 'border-l-red-500',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    icon: <AlertOctagon className="w-4 h-4 text-red-500" />,
  },
  medium: {
    label: 'Medium',
    border: 'border-l-amber-400',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  },
  low: {
    label: 'Low',
    border: 'border-l-blue-400',
    bg: 'bg-blue-50/60',
    badge: 'bg-blue-100 text-blue-700',
    icon: <Info className="w-4 h-4 text-blue-400" />,
  },
}

const TYPE_ICONS: Record<AlertType, React.ReactNode> = {
  deprovisioning_lag: <UserX className="w-5 h-5" />,
  token_expiry: <Key className="w-5 h-5" />,
  identity_unverified: <UserCheck className="w-5 h-5" />,
  deep_link_failure: <Link2Off className="w-5 h-5" />,
  provisioning_delay: <Clock className="w-5 h-5" />,
  phone_recycling_risk: <Smartphone className="w-5 h-5" />,
  prestart_access: <CalendarClock className="w-5 h-5" />,
}

const TYPE_LABELS: Record<AlertType, string> = {
  deprovisioning_lag: 'Deprovisioning Lag',
  token_expiry: 'Token Expiry',
  identity_unverified: 'Unverified Identity',
  deep_link_failure: 'Deep Link Failure',
  provisioning_delay: 'Provisioning Delay',
  phone_recycling_risk: 'Phone Recycling Risk',
  prestart_access: 'Pre-Hire Access',
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function AlertCard({ alert, handlers }: { alert: SecurityAlert; handlers: ActionHandlers }) {
  const sev = SEVERITY_CONFIG[alert.severity]
  const isLoading = !!handlers.loadingActions[alert.id]
  return (
    <div
      className={`rounded-xl border border-slate-200 border-l-4 ${sev.border} ${sev.bg} p-5 shadow-sm`}
    >
      <div className="flex items-start gap-4">
        {/* Type icon */}
        <div
          className={`p-2 rounded-lg ${
            alert.severity === 'high' ? 'bg-red-100 text-red-500' : alert.severity === 'medium' ? 'bg-amber-100 text-amber-500' : 'bg-blue-100 text-blue-400'
          } shrink-0`}
        >
          {TYPE_ICONS[alert.type]}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${sev.badge}`}>
                  {sev.label}
                </span>
                <span className="text-xs text-slate-400 bg-white/70 border border-slate-200 px-2 py-0.5 rounded-full">
                  {TYPE_LABELS[alert.type]}
                </span>
                {alert.actionRequired && (
                  <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    Action Required
                  </span>
                )}
              </div>
              <h3 className="mt-1.5 text-sm font-bold text-slate-900">{alert.title}</h3>
            </div>
            <span className="text-xs text-slate-400 shrink-0">{formatTimestamp(alert.timestamp)}</span>
          </div>

          {/* Message */}
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{alert.message}</p>

          {/* Remediation */}
          <div className="mt-3 flex items-start gap-2 text-xs bg-white/70 border border-slate-200 rounded-lg px-3 py-2">
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <span className="text-slate-600">
              <span className="font-semibold text-slate-700">Recommended action: </span>
              {alert.remediation}
            </span>
          </div>

          {/* Action buttons */}
          {alert.actionRequired && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  if (alert.type === 'deprovisioning_lag' && alert.affectedEmployeeIds[0]) {
                    handlers.revokeSession(alert.affectedEmployeeIds[0])
                  } else {
                    handlers.resolveAlert(alert.id)
                  }
                }}
                disabled={isLoading}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-60 ${
                  alert.severity === 'high'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                {isLoading ? 'Working…' :
                  alert.type === 'deprovisioning_lag' ? 'Revoke Session' :
                  alert.type === 'phone_recycling_risk' ? 'Purge Identity' :
                  alert.type === 'prestart_access' ? 'Suspend PHI Access' :
                  'Take Action'
                }
              </button>
              <button className="px-3.5 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                View Details
              </button>
              <button
                onClick={() => handlers.dismissAlert(alert.id)}
                className="px-3.5 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SecurityGuardrails({ alerts, handlers }: { alerts: SecurityAlert[]; handlers: ActionHandlers }) {
  const highCount = alerts.filter((a) => a.severity === 'high').length
  const medCount = alerts.filter((a) => a.severity === 'medium').length
  const lowCount = alerts.filter((a) => a.severity === 'low').length
  const actionCount = alerts.filter((a) => a.actionRequired).length

  const sorted = [...alerts].sort((a, b) => {
    const order: Record<AlertSeverity, number> = { high: 0, medium: 1, low: 2 }
    return order[a.severity] - order[b.severity]
  })

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-16 text-center shadow-sm">
        <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <p className="text-slate-600 font-semibold">No active security alerts</p>
        <p className="text-slate-400 text-sm mt-1">All guardrails are healthy for this customer.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 shadow-sm">
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Active Alerts</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{alerts.length}</p>
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div className="flex gap-4">
            {highCount > 0 && (
              <div className="text-center">
                <span className="text-lg font-bold text-red-600">{highCount}</span>
                <p className="text-xs text-slate-400">High</p>
              </div>
            )}
            {medCount > 0 && (
              <div className="text-center">
                <span className="text-lg font-bold text-amber-600">{medCount}</span>
                <p className="text-xs text-slate-400">Medium</p>
              </div>
            )}
            {lowCount > 0 && (
              <div className="text-center">
                <span className="text-lg font-bold text-blue-500">{lowCount}</span>
                <p className="text-xs text-slate-400">Low</p>
              </div>
            )}
          </div>
          {actionCount > 0 && (
            <>
              <div className="h-8 w-px bg-slate-100" />
              <div className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{actionCount} alert{actionCount > 1 ? 's' : ''}</span>{' '}
                require immediate action
              </div>
            </>
          )}
        </div>
      </div>

      {/* Alert cards */}
      <div className="space-y-3">
        {sorted.map((alert) => (
          <AlertCard key={alert.id} alert={alert} handlers={handlers} />
        ))}
      </div>

      {/* Guardrails coverage footer */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 px-5 py-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Guardrails Coverage</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Deprovisioning watchdog', status: 'active' },
            { label: 'Identity verification gate', status: 'active' },
            { label: 'SCIM token monitoring', status: 'active' },
            { label: 'Deep link health checks', status: 'active' },
            { label: 'Session anomaly detection', status: 'active' },
            { label: 'Bulk provisioning alerts', status: 'active' },
            { label: 'Provisioning queue monitor', status: 'active' },
            { label: 'SSO audience validation', status: 'active' },
          ].map((g) => (
            <div key={g.label} className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
              {g.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
