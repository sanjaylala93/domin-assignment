import type { MachineStatus } from '../../types'
import { STATUS_PALETTE } from '../tokens/colors'
import { StatusIndicator } from './StatusIndicator'
import { cn } from '../utils'

const labelMap: Record<MachineStatus, string> = {
  running: 'Running',
  idle: 'Idle',
  faulted: 'Faulted',
  maintenance: 'Maintenance',
}

interface BadgeProps {
  status: MachineStatus
  className?: string
}

export function Badge({ status, className }: BadgeProps) {
  const { bg, text, ring } = STATUS_PALETTE[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium',
        className
      )}
      style={{
        backgroundColor: bg,
        color: text,
        boxShadow: `inset 0 0 0 1px ${ring}`,
      }}
    >
      <StatusIndicator status={status} size="xs" pulse />
      {labelMap[status]}
    </span>
  )
}
