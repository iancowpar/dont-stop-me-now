'use client'

import { UserX, CalendarClock, ArrowRight, AlertOctagon } from 'lucide-react'
import type { Employee, SecurityAlert, PipelineFilter } from '@/lib/types'

const TODAY = '2026-04-27'

const RISK_ORDER: Record<Employee['riskLevel'], number> = { high: 0, medium: 1, low: 2, none: 3 }

function daysSince(dateStr: string): string {
  const diff = Math.round((new Date(TODAY).getTime() - new Date(dateStr).getTime()) / 86400000)
  return diff === 1 ? '1 day' : `${diff} days`
}

function daysUntil(dateStr: string): string {
  const diff = Math.round((new Date(dateStr).getTime() - new Date(TODAY).getTime()) / 86400000)
  return diff === 1 ? '1 day' : `${diff} days`
}

interface Props {
  customerEmployees: Employee[]
  customerAlerts: SecurityAlert[]
  onGoTo: (tab: 'pipeline' | 'security', filter?: PipelineFilter) => void
}

export default function RiskSummary({ customerEmployees, customerAlerts, onGoTo }: Props) {
  const deprovisionRisk = customerEmployees.filter(
    (e) => e.status === 'terminated' && (e.blinkSessionActive || e.downstreamSessionsCleared === false)
  )
  const preHireRisk = customerEmployees.filter(
    (e) => e.hireDate > TODAY && e.status === 'active'
  )

  if (deprovisionRisk.length === 0 && preHireRisk.length === 0) return null

  const worstDeprovision = [...deprovisionRisk].sort(
    (a, b) => RISK_ORDER[a.riskLevel] - RISK_ORDER[b.riskLevel]
  )[0]

  const worstPreHire = [...preHireRisk].sort(
    (a, b) => RISK_ORDER[a.riskLevel] - RISK_ORDER[b.riskLevel]
  )[0]

  const actionableDeprovisionAlerts = customerAlerts.filter(
    (a) => a.type === 'deprovisioning_lag' && a.actionRequired
  ).length

  const actionablePreHireAlerts = customerAlerts.filter(
    (a) => a.type === 'prestart_access' && a.actionRequired
  ).length

  const bothVisible = deprovisionRisk.length > 0 && preHireRisk.length > 0

  return (
    <div className={`grid gap-4 ${bothVisible ? 'md:grid-cols-2' : ''}`}>

      {/* ── Deprovision failure card ─────────────────────────────────────────── */}
      {deprovisionRisk.length > 0 && worstDeprovision && (
        <div className="rounded-xl border-2 border-red-200 bg-white overflow-hidden shadow-sm">
          <div className="bg-red-600 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-white">
              <UserX className="w-5 h-5" />
              <span className="font-bold text-sm">SCIM Deprovision Failures</span>
            </div>
            <span className="bg-white text-red-700 text-sm font-bold px-2.5 py-0.5 rounded-full">
              {deprovisionRisk.length}
            </span>
          </div>

          <div className="px-5 py-4 space-y-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              Terminated {deprovisionRisk.length === 1 ? 'employee' : 'employees'} with an active
              Blink session or uncleared downstream app tokens — access persists beyond Blink revoke.
            </p>

            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 space-y-2">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="text-xs font-bold text-red-800">
                  Worst case: {worstDeprovision.name}
                </span>
              </div>
              <p className="text-xs text-red-700">
                {worstDeprovision.customerName} · {worstDeprovision.department}
              </p>
              {worstDeprovision.terminatedDate && (
                <p className="text-xs text-red-700">
                  Terminated {worstDeprovision.terminatedDate}
                  {' '}({daysSince(worstDeprovision.terminatedDate)} ago)
                  {worstDeprovision.blinkSessionActive && ' · Blink session still active'}
                </p>
              )}
              <div className="space-y-1.5 pt-0.5">
                {worstDeprovision.downstreamSessionsCleared === false && (
                  <div className="text-xs text-red-800 flex items-start gap-1.5">
                    <span className="shrink-0 leading-none mt-0.5">⚠</span>
                    <span>
                      Downstream app sessions uncleared — revoking Blink does not terminate
                      connected app tokens (Paystub, Schedule, Benefits each issued their own)
                    </span>
                  </div>
                )}
                {worstDeprovision.customerId === 'hca' && (
                  <div className="text-xs text-red-800 flex items-start gap-1.5">
                    <span className="shrink-0 leading-none mt-0.5">⚠</span>
                    <span>PHI systems accessible post-termination · HIPAA §164.308(a)(3)(ii)(C)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onGoTo('pipeline', 'terminated')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm"
              >
                View Terminated
                <ArrowRight className="w-3 h-3" />
              </button>
              {actionableDeprovisionAlerts > 0 && (
                <button
                  onClick={() => onGoTo('security')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                >
                  {actionableDeprovisionAlerts} Alert{actionableDeprovisionAlerts > 1 ? 's' : ''}
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Pre-hire access card ─────────────────────────────────────────────── */}
      {preHireRisk.length > 0 && worstPreHire && (
        <div className="rounded-xl border-2 border-purple-200 bg-white overflow-hidden shadow-sm">
          <div className="bg-purple-700 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-white">
              <CalendarClock className="w-5 h-5" />
              <span className="font-bold text-sm">Pre-Hire App Access</span>
            </div>
            <span className="bg-white text-purple-700 text-sm font-bold px-2.5 py-0.5 rounded-full">
              {preHireRisk.length}
            </span>
          </div>

          <div className="px-5 py-4 space-y-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              {preHireRisk.length === 1 ? 'Employee' : 'Employees'} provisioned at Workday record
              creation, not start date — access is live before employment is formally active.
            </p>

            <div className="rounded-lg bg-purple-50 border border-purple-200 px-4 py-3 space-y-2">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="text-xs font-bold text-purple-900">
                  Worst case: {worstPreHire.name}
                </span>
              </div>
              <p className="text-xs text-purple-800">
                {worstPreHire.customerName} · {worstPreHire.department}
              </p>
              <p className="text-xs text-purple-800">
                Start date {worstPreHire.hireDate} ({daysUntil(worstPreHire.hireDate)} away) · Access active now
              </p>
              <div className="space-y-1.5 pt-0.5">
                {worstPreHire.customerId === 'hca' ? (
                  <div className="text-xs text-purple-900 flex items-start gap-1.5">
                    <span className="shrink-0 leading-none mt-0.5">⚠</span>
                    <span>
                      Active PHI deep links (Patient Records, Medication Admin) · Background check
                      pending · HIPAA §164.308(a)(4)
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-purple-900 flex items-start gap-1.5">
                    <span className="shrink-0 leading-none mt-0.5">⚠</span>
                    <span>Active access to Schedule and Paystub apps · Background check pending</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onGoTo('pipeline', 'pre-hire')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-colors shadow-sm"
              >
                View Pre-Hire
                <ArrowRight className="w-3 h-3" />
              </button>
              {actionablePreHireAlerts > 0 && (
                <button
                  onClick={() => onGoTo('security')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  {actionablePreHireAlerts} Alert{actionablePreHireAlerts > 1 ? 's' : ''}
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
