import React from 'react'
import { useMatches } from 'react-router-dom'
import { StatusIndicator } from '@domin/ui'
import { useMachines } from '../../hooks/useMachines'
import type { RouteHandle } from './AppLayout'

function LiveClock() {
  const [time, setTime] = React.useState(() => new Date())

  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="text-slate-400 text-xs">
      {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}{' '}
      {time.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })}
    </span>
  )
}


function useStationsSubtitle() {
  const matches = useMatches()
  const onStations = matches.some((m) => m.pathname === '/stations')
  const { data: machines } = useMachines()

  if (!onStations || !machines) return undefined

  const faults = machines.filter((m) => m.status === 'faulted').length
  return `${machines.length} stations · ${faults} fault${faults !== 1 ? 's' : ''}`
}

export default function TopBar() {
  const matches = useMatches()
  const currentMatch = [...matches]
    .reverse()
    .find((m) => (m.handle as RouteHandle)?.breadcrumb)
  const handle = currentMatch?.handle as RouteHandle | undefined
  const dynamicSubtitle = useStationsSubtitle()
  const subtitle = dynamicSubtitle ?? handle?.subtitle

  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b border-slate-200 flex-shrink-0">
      <div>
        <p className="text-[11px] text-slate-400 uppercase tracking-wide leading-none mb-0.5">
          Factory Status{handle?.breadcrumb ? ` / ${handle.breadcrumb}` : ''}
        </p>
        <div className="flex items-baseline gap-2">
          <h1 className="text-slate-900 font-semibold text-base leading-tight">
            {handle?.title ?? 'Factory Status'}
          </h1>
          {subtitle && (
            <span className="text-slate-400 text-sm">{subtitle}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <StatusIndicator status="running" size="xs" pulse />
          <span className="text-xs text-slate-500">Live ·</span>
          <LiveClock />
        </div>
      </div>
    </header>
  )
}
