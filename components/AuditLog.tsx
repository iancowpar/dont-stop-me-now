import { CheckCircle2, XCircle, ClipboardList } from 'lucide-react'
import type { AuditEntry } from '@/lib/types'

const ACTION_CATEGORIES: Record<string, string> = {
  'Session revoked': 'session',
  'Session revocation failed': 'session',
  'Provisioning retry': 'provisioning',
  'Verification SMS sent': 'provisioning',
  'Alert resolved': 'alert',
  'Alert dismissed': 'alert',
}

function categoryOf(action: string): string {
  for (const [key, cat] of Object.entries(ACTION_CATEGORIES)) {
    if (action.startsWith(key)) return cat
  }
  return 'other'
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const CATEGORY_BADGE: Record<string, string> = {
  session: 'bg-red-100 text-red-700',
  provisioning: 'bg-blue-100 text-blue-700',
  alert: 'bg-amber-100 text-amber-700',
  other: 'bg-slate-100 text-slate-600',
}

export default function AuditLog({ entries }: { entries: AuditEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-16 text-center shadow-sm">
        <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 font-semibold text-sm">No actions taken yet</p>
        <p className="text-slate-400 text-xs mt-1">
          Actions taken this session — session revocations, provisioning retries,
          alert resolutions — will appear here with a full audit trail.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Summary bar */}
      <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 shadow-sm flex items-center gap-6 flex-wrap">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Actions This Session</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{entries.length}</p>
        </div>
        <div className="h-8 w-px bg-slate-100" />
        <div className="flex gap-4 text-sm">
          <span className="text-green-600 font-semibold">
            {entries.filter(e => e.result === 'success').length} succeeded
          </span>
          {entries.filter(e => e.result === 'failure').length > 0 && (
            <span className="text-red-600 font-semibold">
              {entries.filter(e => e.result === 'failure').length} failed
            </span>
          )}
        </div>
      </div>

      {/* Log table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-[80px_1fr_180px_130px_110px_80px] gap-4 px-5 py-2.5 bg-slate-50 border-b border-slate-200">
          {['Time', 'Action', 'Target', 'Customer', 'Actor', 'Result'].map(h => (
            <div key={h} className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{h}</div>
          ))}
        </div>

        {entries.map((entry, idx) => (
          <div
            key={entry.id}
            className={`grid grid-cols-[80px_1fr_180px_130px_110px_80px] gap-4 px-5 py-3 items-start text-sm ${
              idx < entries.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <div className="text-xs text-slate-400 font-mono pt-0.5">{formatTime(entry.timestamp)}</div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${CATEGORY_BADGE[categoryOf(entry.action)]}`}>
                  {categoryOf(entry.action)}
                </span>
                <span className="font-medium text-slate-800">{entry.action}</span>
              </div>
              {entry.details && (
                <p className="text-xs text-slate-400 mt-0.5">{entry.details}</p>
              )}
            </div>

            <div className="text-slate-700 truncate pt-0.5">{entry.target}</div>
            <div className="text-slate-500 truncate pt-0.5">{entry.customerName}</div>
            <div className="text-slate-500 truncate pt-0.5">{entry.actor}</div>

            <div className="flex items-center gap-1.5 pt-0.5">
              {entry.result === 'success' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-green-700 font-medium">Success</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="text-xs text-red-700 font-medium">Failed</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
