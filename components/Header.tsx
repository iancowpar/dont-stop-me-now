import { Bell, Zap, ChevronDown } from 'lucide-react'
import type { Customer } from '@/lib/types'

interface Props {
  customers: Customer[]
  selectedCustomerId: string
  onCustomerChange: (id: string) => void
  alertCount: number
  highAlertCount: number
}

export default function Header({ customers, selectedCustomerId, onCustomerChange, alertCount, highAlertCount }: Props) {
  const selected = customers.find((c) => c.id === selectedCustomerId)!

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="leading-tight">
            <span className="text-sm font-bold text-slate-900 tracking-tight">blink</span>
            <span className="text-xs text-slate-400 ml-2 font-normal">Integration Control Center</span>
          </div>
        </div>

        {/* Customer selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Customer</span>
          <div className="relative">
            <select
              value={selectedCustomerId}
              onChange={(e) => onCustomerChange(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-300 transition-colors"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.employeeCount.toLocaleString()} employees
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
          {/* Health badge */}
          <span
            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
              selected.integrationHealth >= 90
                ? 'bg-green-100 text-green-700'
                : selected.integrationHealth >= 75
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {selected.integrationHealth}% health
          </span>
        </div>

        {/* Right: live status + alerts + user */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live · synced 2m ago
          </div>

          <button className="relative p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell className="w-5 h-5" />
            {alertCount > 0 && (
              <span
                className={`absolute -top-0.5 -right-0.5 min-w-[1rem] h-4 text-xs font-bold rounded-full flex items-center justify-center text-white px-1 ${
                  highAlertCount > 0 ? 'bg-red-500' : 'bg-amber-500'
                }`}
              >
                {alertCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 pl-4 border-l border-slate-100">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
              {selected.csm.split(' ').map((n) => n[0]).join('')}
            </div>
            <span className="text-sm font-medium text-slate-700">{selected.csm}</span>
            <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">CSM</span>
          </div>
        </div>
      </div>
    </header>
  )
}
