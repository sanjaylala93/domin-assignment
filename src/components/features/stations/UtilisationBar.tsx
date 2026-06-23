import { COLORS } from '@domin/ui'
import { formatPct } from '../../../utils/format'

interface UtilisationBarProps {
  value: number // 0–1
}

function barColour(value: number): string {
  if (value >= 0.7) return COLORS.status.running.color
  if (value >= 0.4) return COLORS.status.idle.color
  return COLORS.status.faulted.color
}

export function UtilisationBar({ value }: UtilisationBarProps) {
  const pct = Math.round(value * 100)

  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px] max-w-[100px]">
        <div
          data-testid="bar-fill"
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: barColour(value) }}
        />
      </div>
      <span className="text-slate-600 text-xs tabular-nums w-8 text-right flex-shrink-0">
        {formatPct(value)}
      </span>
    </div>
  )
}
