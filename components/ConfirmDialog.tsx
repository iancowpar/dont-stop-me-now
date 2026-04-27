'use client'

import { AlertTriangle, AlertOctagon } from 'lucide-react'
import type { ConfirmConfig } from '@/lib/types'

interface Props {
  config: ConfirmConfig | null
  onCancel: () => void
}

export default function ConfirmDialog({ config, onCancel }: Props) {
  if (!config) return null

  const isDanger = config.severity === 'danger'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 fade-in duration-150">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${
          isDanger ? 'bg-red-100' : 'bg-amber-100'
        }`}>
          {isDanger
            ? <AlertOctagon className="w-5 h-5 text-red-600" />
            : <AlertTriangle className="w-5 h-5 text-amber-600" />
          }
        </div>

        <h2 className="text-base font-bold text-slate-900">{config.title}</h2>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">{config.message}</p>

        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={config.onConfirm}
            className={`px-4 py-2 text-sm font-semibold rounded-lg text-white transition-colors shadow-sm ${
              isDanger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-amber-500 hover:bg-amber-600'
            }`}
          >
            {config.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
