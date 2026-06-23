import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { Card, Skeleton, STATUS_COLORS, BRAND_COLORS, COLORS } from '@domin/ui'
import type { AnyMachine, UtilisationPoint } from '../../../types'
import { formatPct } from '../../../utils/format'
import { useUtilisationHistory } from '../../../hooks/useUtilisationHistory'
import type { TimeRange } from './TimeRangeToggle'

const THROUGHPUT_TARGET = 160

const RANGE_BUCKETS: Record<TimeRange, number> = {
  '1h': 12,
  '4h': 48,
  '24h': 288,
}

function Sparkline({ data }: { data: UtilisationPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={32}>
      <LineChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <Line
          type="monotone"
          dataKey="utilisation"
          stroke={COLORS.status.running.color}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

interface KpiTileProps {
  label: string
  value: string
  subtext?: string
  accentColor?: string
  delta?: number
  sparklineData?: UtilisationPoint[]
  isLoading: boolean
}

function KpiTile({
  label,
  value,
  subtext,
  accentColor,
  delta,
  sparklineData,
  isLoading,
}: KpiTileProps) {
  return (
    <Card accent="top" accentColor={accentColor} className="flex flex-col gap-1">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      {isLoading ? (
        <>
          <Skeleton className="h-9 w-20 mt-1" />
          <Skeleton className="h-3 w-28 mt-1" />
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-slate-900 tabular-nums">
              {value}
            </p>
            {delta !== undefined && (
              <span
                className="text-xs font-medium"
                style={{
                  color:
                    delta >= 0
                      ? COLORS.status.running.color
                      : COLORS.status.faulted.color,
                }}
              >
                {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)} pp
              </span>
            )}
          </div>
          {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
          {sparklineData && <Sparkline data={sparklineData} />}
        </>
      )}
    </Card>
  )
}

interface KpiTilesProps {
  machines: AnyMachine[] | undefined
  isLoading: boolean
  timeRange: TimeRange
}

export function KpiTiles({ machines, isLoading, timeRange }: KpiTilesProps) {
  const { data: history } = useUtilisationHistory()

  const buckets = RANGE_BUCKETS[timeRange]
  const filteredHistory = history?.slice(-buckets) ?? []

  const avgUtil =
    filteredHistory.length > 0
      ? filteredHistory.reduce((sum, p) => sum + p.utilisation, 0) /
        filteredHistory.length
      : 0

  const delta =
    filteredHistory.length >= 2
      ? Math.round(
          (filteredHistory[filteredHistory.length - 1].utilisation -
            filteredHistory[0].utilisation) *
            100
        )
      : undefined

  const running = machines?.filter((m) => m.status === 'running').length ?? 0
  const notRunning = (machines?.length ?? 0) - running

  const faulted = machines?.filter((m) => m.status === 'faulted') ?? []

  const m06 = machines?.find((m) => m.id === 'M06')
  const throughput =
    m06?.id === 'M06' ? m06.telemetry.parts_dispatched_shift : 0
  const throughputPct = Math.round((throughput / THROUGHPUT_TARGET) * 100)

  return (
    <div className="grid grid-cols-4 gap-4">
      <KpiTile
        label={`Factory utilisation · ${timeRange.toUpperCase()}`}
        value={formatPct(avgUtil)}
        accentColor={BRAND_COLORS.muted}
        delta={delta}
        sparklineData={filteredHistory}
        isLoading={isLoading}
      />
      <KpiTile
        label="Stations running"
        value={`${running}/6`}
        subtext={
          notRunning > 0 ? `${notRunning} not producing` : 'All stations active'
        }
        accentColor={BRAND_COLORS.muted}
        isLoading={isLoading}
      />
      <KpiTile
        label="Active faults"
        value={String(faulted.length)}
        subtext={
          faulted.length > 0
            ? faulted.map((m) => m.id).join(', ')
            : 'No active faults'
        }
        accentColor={STATUS_COLORS.faulted}
        isLoading={isLoading}
      />
      <KpiTile
        label="Throughput · today"
        value={String(throughput)}
        subtext={`Target ${THROUGHPUT_TARGET} · ${throughputPct}%`}
        accentColor={STATUS_COLORS.idle}
        isLoading={isLoading}
      />
    </div>
  )
}
