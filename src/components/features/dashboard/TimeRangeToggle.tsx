import { cn } from '@domin/ui'

export type TimeRange = '1h' | '4h' | '24h'

const OPTIONS: TimeRange[] = ['1h', '4h', '24h']

interface TimeRangeToggleProps {
  value: TimeRange
  onChange: (v: TimeRange) => void
}

export function TimeRangeToggle({ value, onChange }: TimeRangeToggleProps) {
  return (
    <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium transition-colors',
            value === opt
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-500 hover:bg-slate-50'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
