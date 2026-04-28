'use client'

import { useEffect } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import type { ToastMessage } from '@/lib/types'

interface Props {
  toast: ToastMessage | null
  onDismiss: () => void
}

const CONFIG = {
  success: {
    icon: <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />,
    bar: 'bg-green-500',
    bg: 'bg-white border-slate-200',
  },
  error: {
    icon: <XCircle className="w-4 h-4 text-red-500 shrink-0" />,
    bar: 'bg-red-500',
    bg: 'bg-white border-slate-200',
  },
  info: {
    icon: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
    bar: 'bg-blue-500',
    bg: 'bg-white border-slate-200',
  },
}

export default function Toast({ toast, onDismiss }: Props) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [toast, onDismiss])

  if (!toast) return null

  const { icon, bar, bg } = CONFIG[toast.type]

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
      <div className={`flex items-center gap-3 rounded-xl border shadow-lg px-4 py-3 min-w-[280px] max-w-sm ${bg} overflow-hidden relative`}>
        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${bar} rounded-l-xl`} />
        <div className="ml-2 flex items-center gap-3 flex-1">
          {icon}
          <span className="text-sm font-medium text-slate-800">{toast.message}</span>
        </div>
        <button
          onClick={onDismiss}
          className="ml-2 text-slate-300 hover:text-slate-500 transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
