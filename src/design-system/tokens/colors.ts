import type { MachineStatus } from '../../types'

export const COLORS = {
  status: {
    running: {
      color: '#10b981',
      bg: '#ecfdf5',
      text: '#065f46',
      ring: '#a7f3d0',
    },
    idle: { color: '#f59e0b', bg: '#fffbeb', text: '#92400e', ring: '#fde68a' },
    faulted: {
      color: '#ef4444',
      bg: '#fef2f2',
      text: '#991b1b',
      ring: '#fecaca',
    },
    maintenance: {
      color: '#3b82f6',
      bg: '#eff6ff',
      text: '#1e40af',
      ring: '#bfdbfe',
    },
  },
  brand: {
    primary: '#0891b2', // cyan-600
    muted: '#e2e8f0', // slate-200
  },
} as const

export type StatusPalette = (typeof COLORS.status)[MachineStatus]

// Convenience shorthands — all derived from COLORS, nothing defined twice
export const STATUS_PALETTE: Record<MachineStatus, StatusPalette> =
  COLORS.status

export const STATUS_COLORS: Record<MachineStatus, string> = {
  running: COLORS.status.running.color,
  idle: COLORS.status.idle.color,
  faulted: COLORS.status.faulted.color,
  maintenance: COLORS.status.maintenance.color,
}

export const BRAND_COLORS = COLORS.brand
