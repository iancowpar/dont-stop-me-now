'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, TrendingDown, Minus, CheckCircle2 } from 'lucide-react'
import type { Metrics } from '@/lib/types'

function MetricStat({
  label,
  value,
  target,
  unit = '',
  higherIsBetter = true,
}: {
  label: string
  value: number
  target: number
  unit?: string
  higherIsBetter?: boolean
}) {
  const onTarget = higherIsBetter ? value >= target : value <= target
  const diff = Math.abs(value - target).toFixed(1)

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="flex items-end gap-2 mt-1">
        <span className={`text-3xl font-bold ${onTarget ? 'text-green-700' : 'text-amber-600'}`}>
          {value}{unit}
        </span>
        {onTarget ? (
          <span className="flex items-center gap-1 text-xs text-green-600 font-medium mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> On target
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-amber-600 font-medium mb-1">
            {higherIsBetter ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
            {diff}{unit} {higherIsBetter ? 'below' : 'above'} target
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 mt-1">Target: {target}{unit}</p>
    </div>
  )
}

const CHART_COLORS = {
  activations: '#3b82f6',
  failures: '#f87171',
  successGood: '#22c55e',
  successWarn: '#f59e0b',
  successDanger: '#ef4444',
}

function DeepLinkChart({ deepLinks }: { deepLinks: Metrics['deepLinks'] }) {
  const data = [...deepLinks]
    .sort((a, b) => a.successRate - b.successRate)
    .map((d) => ({
      name: d.name,
      rate: d.successRate,
      fill:
        d.successRate >= 97
          ? CHART_COLORS.successGood
          : d.successRate >= 93
          ? CHART_COLORS.successWarn
          : CHART_COLORS.successDanger,
      failureReason: d.failureReason,
    }))

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800">Deep Link Success Rates</h3>
        <p className="text-xs text-slate-400 mt-0.5">% of deep link clicks that successfully open the target app</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis
            type="number"
            domain={[85, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: '#475569' }}
            axisLine={false}
            tickLine={false}
            width={110}
          />
          <Tooltip
            formatter={(value: number, _name, props) => [
              `${value}%`,
              props.payload.failureReason ? `⚠ ${props.payload.failureReason}` : 'Success rate',
            ]}
            contentStyle={{
              background: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Bar dataKey="rate" radius={[0, 4, 4, 0]} maxBarSize={28}>
            {data.map((entry, i) => (
              <rect key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex gap-4 mt-3 justify-end text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> ≥97% healthy
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> 93–97% watch
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-400 inline-block" /> &lt;93% action needed
        </span>
      </div>
    </div>
  )
}

function WeeklyTrendChart({ weeklyTrend }: { weeklyTrend: Metrics['weeklyTrend'] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800">Weekly Provisioning Activity</h3>
        <p className="text-xs text-slate-400 mt-0.5">New hire activations vs provisioning failures per day</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyTrend} margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            cursor={{ fill: '#f8fafc40' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
            formatter={(value) => (value === 'activations' ? 'Activations' : 'Failures')}
          />
          <Bar dataKey="activations" fill={CHART_COLORS.activations} radius={[3, 3, 0, 0]} maxBarSize={32} />
          <Bar dataKey="failures" fill={CHART_COLORS.failures} radius={[3, 3, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function TimeToAccessChart({ weeklyTrend }: { weeklyTrend: Metrics['weeklyTrend'] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800">Avg Time-to-Access Trend</h3>
        <p className="text-xs text-slate-400 mt-0.5">Hours from Workday hire date → first successful deep link</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyTrend} margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 5]}
            tickFormatter={(v) => `${v}h`}
          />
          <Tooltip
            formatter={(v: number) => [`${v}h`, 'Avg time-to-access']}
            contentStyle={{
              background: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            cursor={{ fill: '#f8fafc40' }}
          />
          {/* Target line reference */}
          <Bar dataKey="avgHours" fill="#818cf8" radius={[3, 3, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
        <div className="w-6 h-px border-t-2 border-dashed border-slate-300" />
        Target ceiling: 4h
      </div>
    </div>
  )
}

export default function ZeroFrictionMetrics({ metrics }: { metrics: Metrics }) {
  return (
    <div className="space-y-4">
      {/* Top stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricStat
          label="Day-1 Activation Rate"
          value={metrics.day1ActivationRate}
          target={95}
          unit="%"
          higherIsBetter
        />
        <MetricStat
          label="Avg Time-to-Access"
          value={metrics.avgTimeToAccess}
          target={4}
          unit="h"
          higherIsBetter={false}
        />
        <MetricStat
          label="Self-Service Recovery"
          value={metrics.selfServiceRecoveryRate}
          target={80}
          unit="%"
          higherIsBetter
        />
        <MetricStat
          label="Provisioning Success"
          value={metrics.provisioningSuccessRate}
          target={99}
          unit="%"
          higherIsBetter
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklyTrendChart weeklyTrend={metrics.weeklyTrend} />
        <TimeToAccessChart weeklyTrend={metrics.weeklyTrend} />
      </div>

      <DeepLinkChart deepLinks={metrics.deepLinks} />
    </div>
  )
}
