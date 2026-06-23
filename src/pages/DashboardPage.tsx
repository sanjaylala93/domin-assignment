import { useState } from 'react'
import { Card, StatusIndicator } from '@domin/ui'
import { useMachines } from '../hooks/useMachines'
import { KpiTiles } from '../components/features/dashboard/KpiTiles'
import { UtilisationChart } from '../components/features/dashboard/UtilisationChart'
import {
  TimeRangeToggle,
  type TimeRange,
} from '../components/features/dashboard/TimeRangeToggle'

const STATUSES = ['running', 'idle', 'faulted', 'maintenance'] as const

export default function DashboardPage() {
  const { data: machines, isLoading } = useMachines()
  const [timeRange, setTimeRange] = useState<TimeRange>('24h')

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
            Production Line · Site 1 · Bay A
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Operational dashboard
          </h2>
        </div>
        <TimeRangeToggle value={timeRange} onChange={setTimeRange} />
      </div>

      <KpiTiles
        machines={machines}
        isLoading={isLoading}
        timeRange={timeRange}
      />

      <Card>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Factory utilisation
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Fraction of stations running, sampled per 30 minutes
            </p>
          </div>
          <div className="flex items-center gap-4">
            {STATUSES.map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <StatusIndicator status={s} size="xs" />
                <span className="text-xs text-slate-500 capitalize">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <UtilisationChart timeRange={timeRange} />
      </Card>
    </div>
  )
}
