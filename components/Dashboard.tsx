'use client'

import { useState } from 'react'
import Header from './Header'
import KPICards from './KPICards'
import ProvisioningPipeline from './ProvisioningPipeline'
import SecurityGuardrails from './SecurityGuardrails'
import ZeroFrictionMetrics from './ZeroFrictionMetrics'
import { customers, employees, securityAlerts, metricsData } from '@/lib/mock-data'

type Tab = 'pipeline' | 'security' | 'metrics'

const TABS: { id: Tab; label: string }[] = [
  { id: 'pipeline', label: 'Provisioning Pipeline' },
  { id: 'security', label: 'Security Guardrails' },
  { id: 'metrics', label: 'Zero-Friction Metrics' },
]

export default function Dashboard() {
  const [customerId, setCustomerId] = useState('walmart')
  const [tab, setTab] = useState<Tab>('pipeline')

  const customerEmployees = employees.filter((e) => e.customerId === customerId)
  const customerAlerts = securityAlerts.filter((a) => a.customerId === customerId)
  const metrics = metricsData[customerId]

  const highAlertCount = customerAlerts.filter((a) => a.severity === 'high').length
  const actionableAlertCount = customerAlerts.filter((a) => a.actionRequired).length

  const tabBadge: Record<Tab, number | null> = {
    pipeline: customerEmployees.filter(
      (e) => e.status === 'pending' || e.riskLevel === 'high' || e.riskLevel === 'medium'
    ).length || null,
    security: actionableAlertCount || null,
    metrics: null,
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        customers={customers}
        selectedCustomerId={customerId}
        onCustomerChange={(id) => { setCustomerId(id); setTab('pipeline') }}
        alertCount={actionableAlertCount}
        highAlertCount={highAlertCount}
      />

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <KPICards
          metrics={metrics}
          alertCount={actionableAlertCount}
          highAlertCount={highAlertCount}
        />

        {/* Tab nav */}
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex gap-1">
            {TABS.map((t) => {
              const badge = tabBadge[t.id]
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                    active
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {t.label}
                  {badge != null && badge > 0 && (
                    <span
                      className={`ml-2 px-1.5 py-0.5 text-xs rounded-full font-semibold ${
                        active
                          ? 'bg-blue-100 text-blue-700'
                          : t.id === 'security' && highAlertCount > 0
                          ? 'bg-red-100 text-red-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab content */}
        {tab === 'pipeline' && <ProvisioningPipeline employees={customerEmployees} />}
        {tab === 'security' && <SecurityGuardrails alerts={customerAlerts} />}
        {tab === 'metrics' && <ZeroFrictionMetrics metrics={metrics} />}
      </main>
    </div>
  )
}
