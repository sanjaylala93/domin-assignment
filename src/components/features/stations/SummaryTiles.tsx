import { Card, StatusIndicator, Skeleton, STATUS_COLORS } from '@domin/ui'
import type { AnyMachine, MachineStatus } from '../../../types'

const STATUSES: { status: MachineStatus; label: string }[] = [
  { status: 'running', label: 'Running' },
  { status: 'idle', label: 'Idle' },
  { status: 'faulted', label: 'Faulted' },
  { status: 'maintenance', label: 'Maintenance' },
]

interface TileProps {
  status: MachineStatus
  label: string
  count: number
  isLoading: boolean
}

function Tile({ status, label, count, isLoading }: TileProps) {
  return (
    <Card
      accent="left"
      accentColor={STATUS_COLORS[status]}
      className="flex items-start justify-between"
    >
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {label}
        </p>
        {isLoading ? (
          <Skeleton className="h-8 w-10 mt-2" />
        ) : (
          <p
            data-testid={`count-${status}`}
            className="text-3xl font-semibold text-slate-900 mt-1 tabular-nums"
          >
            {count}
          </p>
        )}
      </div>
      <StatusIndicator status={status} size="md" pulse={status === 'running'} />
    </Card>
  )
}

interface SummaryTilesProps {
  machines: AnyMachine[] | undefined
  isLoading: boolean
}

export function SummaryTiles({ machines, isLoading }: SummaryTilesProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {STATUSES.map(({ status, label }) => (
        <Tile
          key={status}
          status={status}
          label={label}
          count={machines?.filter((m) => m.status === status).length ?? 0}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
