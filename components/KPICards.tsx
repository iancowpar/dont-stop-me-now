import { Users, ShieldAlert, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import type { Metrics } from '@/lib/types'

interface Props {
  metrics: Metrics
  alertCount: number
  highAlertCount: number
}

function Card({
  label,
  value,
  subtitle,
  icon,
  iconBg,
  valueColor,
}: {
  label: string
  value: string
  subtitle: string
  icon: React.ReactNode
  iconBg: string
  valueColor?: string
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
          <p className={`text-2xl font-bold mt-1 ${valueColor ?? 'text-slate-900'}`}>{value}</p>
          <p className="text-xs text-slate-500 mt-1 leading-snug">{subtitle}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${iconBg} shrink-0`}>{icon}</div>
      </div>
    </div>
  )
}

export default function KPICards({ metrics, alertCount, highAlertCount }: Props) {
  const timeOnTarget = metrics.avgTimeToAccess < 4
  const activationOnTarget = metrics.day1ActivationRate >= 95
  const activationGap = 95 - metrics.day1ActivationRate

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        label="Active Employees"
        value={metrics.activeEmployees.toLocaleString()}
        subtitle={`↑ ${metrics.newHiresThisWeek} new hires this week`}
        icon={<Users className="w-5 h-5 text-blue-600" />}
        iconBg="bg-blue-50"
      />

      <Card
        label="Security Alerts"
        value={alertCount === 0 ? 'All clear' : String(alertCount)}
        subtitle={
          highAlertCount > 0
            ? `${highAlertCount} require immediate action`
            : alertCount > 0
            ? `${alertCount} medium / low priority`
            : 'No active alerts'
        }
        icon={<ShieldAlert className={`w-5 h-5 ${highAlertCount > 0 ? 'text-red-500' : alertCount > 0 ? 'text-amber-500' : 'text-green-500'}`} />}
        iconBg={highAlertCount > 0 ? 'bg-red-50' : alertCount > 0 ? 'bg-amber-50' : 'bg-green-50'}
        valueColor={highAlertCount > 0 ? 'text-red-600' : alertCount > 0 ? 'text-amber-600' : 'text-green-600'}
      />

      <Card
        label="Avg Time-to-Access"
        value={`${metrics.avgTimeToAccess}h`}
        subtitle={
          timeOnTarget
            ? `Target <4h · ✓ On track`
            : `Target <4h · ✗ ${(metrics.avgTimeToAccess - 4).toFixed(1)}h over`
        }
        icon={
          timeOnTarget ? (
            <Clock className="w-5 h-5 text-green-600" />
          ) : (
            <Clock className="w-5 h-5 text-red-500" />
          )
        }
        iconBg={timeOnTarget ? 'bg-green-50' : 'bg-red-50'}
        valueColor={timeOnTarget ? 'text-green-700' : 'text-red-600'}
      />

      <Card
        label="Day-1 Activation Rate"
        value={`${metrics.day1ActivationRate}%`}
        subtitle={
          activationOnTarget
            ? `Target 95% · ✓ On track`
            : `Target 95% · ↓ ${activationGap}pp below`
        }
        icon={
          activationOnTarget ? (
            <TrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <TrendingDown className="w-5 h-5 text-amber-500" />
          )
        }
        iconBg={activationOnTarget ? 'bg-green-50' : 'bg-amber-50'}
        valueColor={activationOnTarget ? 'text-green-700' : 'text-amber-700'}
      />
    </div>
  )
}
