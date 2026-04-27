'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Circle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertOctagon,
  Clock,
  Loader2,
} from 'lucide-react'
import type { Employee, ProvisioningStatus } from '@/lib/types'

// ── Pipeline stage dot ────────────────────────────────────────────────────────

function StageDot({ status, stageName, detail }: { status: ProvisioningStatus; stageName: string; detail?: string }) {
  const icon = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    failed: <XCircle className="w-5 h-5 text-red-500" />,
    pending: <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    idle: <Circle className="w-5 h-5 text-slate-200" />,
  }[status]

  return (
    <div className="relative group">
      {icon}
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block z-20 pointer-events-none">
        <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl max-w-[220px]">
          <div className="font-semibold text-slate-100">{stageName}</div>
          {detail && <div className="text-slate-400 mt-0.5 text-[11px] whitespace-normal">{detail}</div>}
          {!detail && <div className="text-slate-500 mt-0.5 capitalize">{status === 'idle' ? 'Not started' : status}</div>}
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-slate-900" />
      </div>
    </div>
  )
}

function PipelineViz({ stages }: { stages: Employee['pipeline'] }) {
  return (
    <div className="flex items-center">
      {stages.map((stage, i) => (
        <div key={stage.name} className="flex items-center">
          <StageDot status={stage.status} stageName={stage.name} detail={stage.detail} />
          {i < stages.length - 1 && (
            <div
              className={`w-5 h-0.5 ${
                stages[i + 1].status === 'idle' ? 'bg-slate-100' : 'bg-green-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<Employee['status'], string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-blue-100 text-blue-700',
  failed: 'bg-red-100 text-red-700',
  terminated: 'bg-red-100 text-red-800 font-semibold',
}

const STATUS_LABELS: Record<Employee['status'], string> = {
  active: 'Active',
  pending: 'Pending',
  failed: 'Failed',
  terminated: 'Terminated',
}

// ── Filter bar ────────────────────────────────────────────────────────────────

type Filter = 'all' | 'today' | 'pending' | 'at-risk' | 'terminated'

const TODAY = '2026-04-27'

function matchesFilter(emp: Employee, f: Filter): boolean {
  if (f === 'all') return true
  if (f === 'today') return emp.hireDate === TODAY
  if (f === 'pending') return emp.status === 'pending'
  if (f === 'at-risk') return emp.riskLevel === 'high' || emp.riskLevel === 'medium'
  if (f === 'terminated') return emp.status === 'terminated'
  return true
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProvisioningPipeline({ employees }: { employees: Employee[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filterDefs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'today', label: "Today's Hires" },
    { id: 'pending', label: 'Pending' },
    { id: 'at-risk', label: 'At Risk' },
    { id: 'terminated', label: 'Terminated' },
  ]

  const filtered = employees.filter((e) => matchesFilter(e, filter))

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        {filterDefs.map((f) => {
          const count = employees.filter((e) => matchesFilter(e, f.id)).length
          const active = filter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              {f.label}
              <span className={`ml-2 text-xs ${active ? 'text-blue-200' : 'text-slate-400'}`}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Column header */}
        <div className="grid grid-cols-[1fr_215px_130px_100px_36px] gap-4 px-5 py-2.5 bg-slate-50 border-b border-slate-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Employee</div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">Pipeline</div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">Status</div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">Access In</div>
          <div />
        </div>

        {/* Pipeline stage sub-labels */}
        <div className="grid grid-cols-[1fr_215px_130px_100px_36px] gap-4 px-5 py-1 bg-slate-50 border-b border-slate-100">
          <div />
          <div className="flex justify-between px-0.5 text-[10px] text-slate-400">
            <span>WD</span>
            <span>SCIM</span>
            <span>Acct</span>
            <span>ID</span>
            <span>Apps</span>
          </div>
          <div />
          <div />
          <div />
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">No employees match this filter.</div>
        ) : (
          filtered.map((emp, idx) => (
            <div key={emp.id}>
              {/* Row */}
              <div
                onClick={() => setExpandedId(expandedId === emp.id ? null : emp.id)}
                className={[
                  'grid grid-cols-[1fr_215px_130px_100px_36px] gap-4 px-5 py-3 items-center cursor-pointer transition-colors',
                  idx < filtered.length - 1 ? 'border-b border-slate-100' : '',
                  emp.riskLevel === 'high'
                    ? 'bg-red-50/60 hover:bg-red-50'
                    : emp.riskLevel === 'medium'
                    ? 'bg-amber-50/40 hover:bg-amber-50/70'
                    : 'hover:bg-slate-50',
                ].join(' ')}
              >
                {/* Employee info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  {emp.riskLevel === 'high' && <AlertOctagon className="w-4 h-4 text-red-500 shrink-0" />}
                  {emp.riskLevel === 'medium' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                  {(emp.riskLevel === 'none' || emp.riskLevel === 'low') && <div className="w-4 shrink-0" />}
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">{emp.name}</div>
                    <div className="text-xs text-slate-400 truncate">
                      {emp.department} · {emp.identityType === 'email' ? '✉' : '📱'} {emp.identity}
                    </div>
                  </div>
                </div>

                {/* Pipeline dots */}
                <div className="flex justify-center">
                  <PipelineViz stages={emp.pipeline} />
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <span className={`px-2.5 py-0.5 text-xs rounded-full ${STATUS_STYLES[emp.status]}`}>
                    {emp.status === 'terminated' ? '⚠ ' : ''}
                    {STATUS_LABELS[emp.status]}
                  </span>
                </div>

                {/* Time to access */}
                <div className="flex justify-center">
                  {emp.timeToAccess !== undefined ? (
                    <span className="text-sm font-semibold text-slate-700">{emp.timeToAccess}h</span>
                  ) : emp.status === 'pending' ? (
                    <span className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                      <Clock className="w-3 h-3" />
                      In progress
                    </span>
                  ) : (
                    <span className="text-slate-300 text-sm">—</span>
                  )}
                </div>

                {/* Expand toggle */}
                <div className="flex justify-center text-slate-300">
                  {expandedId === emp.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded detail */}
              {expandedId === emp.id && (
                <div
                  className={`px-5 py-4 border-b border-slate-100 ${
                    emp.riskLevel === 'high' ? 'bg-red-50' : emp.riskLevel === 'medium' ? 'bg-amber-50/60' : 'bg-slate-50'
                  }`}
                >
                  {/* Stage breakdown */}
                  <div className="grid grid-cols-5 gap-3 mb-3">
                    {emp.pipeline.map((stage) => (
                      <div key={stage.name} className="space-y-1">
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                          {stage.name}
                        </div>
                        <div
                          className={`text-xs leading-snug ${
                            stage.status === 'success'
                              ? 'text-green-700'
                              : stage.status === 'failed'
                              ? 'text-red-700'
                              : stage.status === 'warning'
                              ? 'text-amber-700'
                              : stage.status === 'pending'
                              ? 'text-blue-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {stage.detail || (stage.status === 'idle' ? 'Not started' : stage.status)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  {emp.notes && (
                    <div
                      className={`text-xs rounded-lg px-3 py-2 mt-2 ${
                        emp.riskLevel === 'high'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : emp.riskLevel === 'medium'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span className="font-semibold">Note: </span>
                      {emp.notes}
                    </div>
                  )}

                  {/* Action buttons */}
                  {(emp.riskLevel === 'high' || emp.riskLevel === 'medium' || emp.status === 'pending') && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {emp.riskLevel === 'high' && (
                        <button className="px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm">
                          Revoke Session Now
                        </button>
                      )}
                      {emp.status === 'pending' && (
                        <>
                          <button className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm flex items-center gap-1.5">
                            <RefreshCw className="w-3 h-3" />
                            Retry Provision
                          </button>
                          <button className="px-3.5 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg transition-colors">
                            Send Verification SMS
                          </button>
                        </>
                      )}
                      <button className="px-3.5 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg transition-colors">
                        View Audit Log
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
