import type { MachineStatus } from '../../types'
import { STATUS_COLORS } from '../tokens/colors'
import { cn } from '../utils'

const sizeMap = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
}

interface StatusIndicatorProps {
  status: MachineStatus
  size?: keyof typeof sizeMap
  pulse?: boolean
  className?: string
}

export function StatusIndicator({
  status,
  size = 'sm',
  pulse,
  className,
}: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        'rounded-full flex-shrink-0 inline-block',
        sizeMap[size],
        pulse && status === 'running' && 'animate-pulse',
        className
      )}
      style={{ backgroundColor: STATUS_COLORS[status] }}
    />
  )
}
