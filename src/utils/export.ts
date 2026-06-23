import type { AnyMachine } from '../types'
import { formatTimeInState, formatPct } from './format'

const HEADERS = [
  'ID',
  'Name',
  'Stage',
  'Type',
  'Status',
  'Time in State',
  '24h Utilisation',
]

function row(m: AnyMachine): string[] {
  return [
    m.id,
    m.name,
    m.stage,
    m.type,
    m.status,
    formatTimeInState(Date.now() - m.statusChangedAt),
    formatPct(m.utilisation24h),
  ]
}

function toCSV(rows: string[][]): string {
  return [HEADERS, ...rows]
    .map((r) => r.map((cell) => `"${cell}"`).join(','))
    .join('\n')
}

export function exportMachinesToCSV(machines: AnyMachine[]): void {
  const csv = toCSV(machines.map(row))
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `stations-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
