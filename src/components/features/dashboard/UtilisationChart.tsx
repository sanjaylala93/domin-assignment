import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { Skeleton, BRAND_COLORS, COLORS } from '@domin/ui'
import { useUtilisationHistory } from '../../../hooks/useUtilisationHistory'
import type { TimeRange } from './TimeRangeToggle'

const RANGE_BUCKETS: Record<TimeRange, number> = {
  '1h': 12,
  '4h': 48,
  '24h': 288,
}

function formatTick(timestamp: number) {
  const diffHours = Math.round(
    (timestamp - Date.now()) / (1000 * 60 * 60)
  )
  if (diffHours === 0) return 'now'
  return `${diffHours}h`
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded shadow-md px-3 py-2 text-xs">
      <p className="text-slate-400 mb-1">{formatTick(label)}</p>
      <p className="text-slate-900 font-medium">
        {Math.round(payload[0].value * 100)}% utilisation
      </p>
    </div>
  )
}

interface UtilisationChartProps {
  timeRange: TimeRange
}

export function UtilisationChart({ timeRange }: UtilisationChartProps) {
  const { data: history, isLoading } = useUtilisationHistory()

  const buckets = RANGE_BUCKETS[timeRange]
  const data = history?.slice(-buckets) ?? []

  const tickCount =
    timeRange === '1h' ? 2 : timeRange === '4h' ? 4 : 6

  if (isLoading) {
    return <Skeleton className="w-full h-48" />
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 4, right: 48, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="utilGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={BRAND_COLORS.primary}
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor={BRAND_COLORS.primary}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f1f5f9"
          vertical={false}
        />
        <XAxis
          dataKey="timestamp"
          tickFormatter={formatTick}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          tickCount={tickCount}
        />
        <YAxis
          domain={[0, 1]}
          tickFormatter={(v) => `${Math.round(v * 100)}%`}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <ReferenceLine
          y={0.75}
          stroke={COLORS.status.idle.color}
          strokeDasharray="4 4"
          strokeWidth={1}
          label={{
            value: 'Target 75%',
            position: 'right',
            fontSize: 10,
            fill: COLORS.status.idle.color,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="utilisation"
          stroke={BRAND_COLORS.primary}
          strokeWidth={2}
          fill="url(#utilGradient)"
          dot={false}
          activeDot={{ r: 4, fill: BRAND_COLORS.primary }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
