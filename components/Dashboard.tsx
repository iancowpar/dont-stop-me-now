'use client'

import { useState, useCallback } from 'react'
import Header from './Header'
import KPICards from './KPICards'
import ProvisioningPipeline from './ProvisioningPipeline'
import SecurityGuardrails from './SecurityGuardrails'
import ZeroFrictionMetrics from './ZeroFrictionMetrics'
import AuditLog from './AuditLog'
import Toast from './Toast'
import ConfirmDialog from './ConfirmDialog'
import { customers, employees as initialEmployees, securityAlerts as initialAlerts, metricsData } from '@/lib/mock-data'
import { simulateApiCall, generateId } from '@/lib/actions'
import type { Employee, SecurityAlert, AuditEntry, ToastMessage, ConfirmConfig, ActionHandlers } from '@/lib/types'

type Tab = 'pipeline' | 'security' | 'metrics' | 'audit'

const TABS: { id: Tab; label: string }[] = [
  { id: 'pipeline', label: 'Provisioning Pipeline' },
  { id: 'security', label: 'Security Guardrails' },
  { id: 'metrics', label: 'Zero-Friction Metrics' },
  { id: 'audit', label: 'Audit Log' },
]

export default function Dashboard() {
  const [customerId, setCustomerId] = useState('walmart')
  const [tab, setTab] = useState<Tab>('pipeline')

  // Mutable data state — actions update these directly
  const [allEmployees, setAllEmployees] = useState<Employee[]>(initialEmployees)
  const [allAlerts, setAllAlerts] = useState<SecurityAlert[]>(initialAlerts)
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([])
  const [loadingActions, setLoadingActions] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [confirm, setConfirm] = useState<ConfirmConfig | null>(null)

  const customer = customers.find((c) => c.id === customerId)!
  const customerEmployees = allEmployees.filter((e) => e.customerId === customerId)
  const customerAlerts = allAlerts.filter((a) => a.customerId === customerId)
  const metrics = metricsData[customerId]

  const highAlertCount = customerAlerts.filter((a) => a.severity === 'high').length
  const actionableAlertCount = customerAlerts.filter((a) => a.actionRequired).length

  // ── Helpers ───────────────────────────────────────────────────────────────

  const showToast = useCallback((type: ToastMessage['type'], message: string) => {
    setToast({ id: generateId(), type, message })
  }, [])

  const addAudit = useCallback((entry: Omit<AuditEntry, 'id' | 'timestamp'>) => {
    setAuditEntries((prev) => [{ id: generateId(), timestamp: new Date().toISOString(), ...entry }, ...prev])
  }, [])

  const setLoading = useCallback((id: string, action: string | null) => {
    setLoadingActions((prev) => {
      const next = { ...prev }
      if (action === null) delete next[id]
      else next[id] = action
      return next
    })
  }, [])

  const updateEmployee = useCallback((id: string, patch: Partial<Employee>) => {
    setAllEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }, [])

  const updateAlert = useCallback((id: string, patch: Partial<SecurityAlert>) => {
    setAllAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)))
  }, [])

  // ── Action: Revoke terminated employee session ────────────────────────────

  const revokeSession = useCallback((employeeId: string) => {
    const emp = allEmployees.find((e) => e.id === employeeId)
    if (!emp) return

    setConfirm({
      title: 'Revoke active session',
      message: `This will immediately terminate ${emp.name}'s Blink session and revoke all deep link access. The action is logged and cannot be undone.`,
      confirmLabel: 'Revoke Session',
      severity: 'danger',
      onConfirm: async () => {
        setConfirm(null)
        setLoading(employeeId, 'revoking')
        await simulateApiCall(1200)
        updateEmployee(employeeId, {
          blinkSessionActive: false,
          riskLevel: 'none',
          notes: `Session revoked at ${new Date().toLocaleTimeString()}. Deprovisioning confirmed.`,
        })
        // Resolve the deprovisioning alert for this employee
        setAllAlerts((prev) =>
          prev.map((a) =>
            a.type === 'deprovisioning_lag' && a.affectedEmployeeIds.includes(employeeId)
              ? { ...a, actionRequired: false }
              : a
          )
        )
        addAudit({
          action: 'Session revoked',
          target: emp.name,
          customerId: emp.customerId,
          customerName: emp.customerName,
          actor: customer.csm,
          result: 'success',
          details: 'Blink session terminated. SCIM deprovision event confirmed.',
        })
        showToast('success', `Session revoked for ${emp.name}. Access terminated.`)
        setLoading(employeeId, null)
      },
    })
  }, [allEmployees, customer.csm, setLoading, updateEmployee, addAudit, showToast])

  // ── Action: Retry provisioning ────────────────────────────────────────────

  const retryProvision = useCallback(async (employeeId: string) => {
    const emp = allEmployees.find((e) => e.id === employeeId)
    if (!emp) return

    setLoading(employeeId, 'retrying')
    await simulateApiCall(1500)

    // Advance the first stalled/pending/warning stage to success
    const newPipeline = emp.pipeline.map((stage) =>
      stage.status === 'pending' || stage.status === 'warning'
        ? { ...stage, status: 'success' as const, detail: `Resolved via manual retry at ${new Date().toLocaleTimeString()}` }
        : stage
    )
    const allDone = newPipeline.every((s) => s.status === 'success')

    updateEmployee(employeeId, {
      pipeline: newPipeline,
      status: allDone ? 'active' : 'pending',
      riskLevel: 'none',
      ...(allDone ? { timeToAccess: parseFloat(((Date.now() - new Date(emp.hireDate).getTime()) / 3_600_000).toFixed(1)) } : {}),
    })
    addAudit({
      action: 'Provisioning retry',
      target: emp.name,
      customerId: emp.customerId,
      customerName: emp.customerName,
      actor: customer.csm,
      result: 'success',
      details: allDone ? 'All stages complete. Employee now active.' : 'Stage advanced. Provisioning continuing.',
    })
    showToast('success', `Provisioning retry succeeded for ${emp.name}.`)
    setLoading(employeeId, null)
  }, [allEmployees, customer.csm, setLoading, updateEmployee, addAudit, showToast])

  // ── Action: Send verification SMS ─────────────────────────────────────────

  const sendVerificationSms = useCallback(async (employeeId: string) => {
    const emp = allEmployees.find((e) => e.id === employeeId)
    if (!emp) return

    setLoading(employeeId, 'sms')
    await simulateApiCall(800)

    const time = new Date().toLocaleTimeString()
    const newPipeline = emp.pipeline.map((stage, i) =>
      i === 3 && (stage.status === 'warning' || stage.status === 'pending')
        ? { ...stage, status: 'pending' as const, detail: `SMS verification sent at ${time} — awaiting response` }
        : stage
    )
    updateEmployee(employeeId, {
      pipeline: newPipeline,
      notes: `SMS fallback sent at ${time}. Awaiting OTP response from ${emp.identity}.`,
    })
    addAudit({
      action: 'Verification SMS sent',
      target: emp.name,
      customerId: emp.customerId,
      customerName: emp.customerName,
      actor: customer.csm,
      result: 'success',
      details: `SMS fallback triggered. Identity: ${emp.identity}`,
    })
    showToast('success', `Verification SMS sent to ${emp.identity}.`)
    setLoading(employeeId, null)
  }, [allEmployees, customer.csm, setLoading, updateEmployee, addAudit, showToast])

  // ── Action: Resolve alert ─────────────────────────────────────────────────

  const resolveAlert = useCallback(async (alertId: string) => {
    const alert = allAlerts.find((a) => a.id === alertId)
    if (!alert) return

    setLoading(alertId, 'resolving')
    await simulateApiCall(1000)

    updateAlert(alertId, { actionRequired: false })
    addAudit({
      action: `Alert resolved: ${alert.type.replace(/_/g, ' ')}`,
      target: alert.title,
      customerId: alert.customerId,
      customerName: alert.customerName,
      actor: customer.csm,
      result: 'success',
    })
    showToast('success', 'Alert marked as resolved.')
    setLoading(alertId, null)
  }, [allAlerts, customer.csm, setLoading, updateAlert, addAudit, showToast])

  // ── Action: Dismiss alert ─────────────────────────────────────────────────

  const dismissAlert = useCallback((alertId: string) => {
    const alert = allAlerts.find((a) => a.id === alertId)
    if (!alert) return

    setAllAlerts((prev) => prev.filter((a) => a.id !== alertId))
    addAudit({
      action: 'Alert dismissed',
      target: alert.title,
      customerId: alert.customerId,
      customerName: alert.customerName,
      actor: customer.csm,
      result: 'success',
    })
    showToast('info', 'Alert dismissed.')
  }, [allAlerts, customer.csm, addAudit, showToast])

  // ── Handlers bundle ───────────────────────────────────────────────────────

  const handlers: ActionHandlers = {
    revokeSession,
    retryProvision,
    sendVerificationSms,
    resolveAlert,
    dismissAlert,
    loadingActions,
  }

  // ── Tab badges ────────────────────────────────────────────────────────────

  const tabBadge: Record<Tab, number | null> = {
    pipeline: customerEmployees.filter(
      (e) => e.status === 'pending' || e.riskLevel === 'high' || e.riskLevel === 'medium'
    ).length || null,
    security: actionableAlertCount || null,
    metrics: null,
    audit: auditEntries.length || null,
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
                          : t.id === 'audit'
                          ? 'bg-slate-100 text-slate-600'
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
        {tab === 'pipeline' && <ProvisioningPipeline employees={customerEmployees} handlers={handlers} />}
        {tab === 'security' && <SecurityGuardrails alerts={customerAlerts} handlers={handlers} />}
        {tab === 'metrics' && <ZeroFrictionMetrics metrics={metrics} />}
        {tab === 'audit' && <AuditLog entries={auditEntries} />}
      </main>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
      <ConfirmDialog config={confirm} onCancel={() => setConfirm(null)} />
    </div>
  )
}
