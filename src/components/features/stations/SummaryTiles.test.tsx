import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SummaryTiles } from './SummaryTiles'
import type { AnyMachine } from '../../../types'

function makeMachine(
  id: string,
  status: AnyMachine['status']
): AnyMachine {
  return {
    id,
    name: 'Test Machine',
    stage: 'Hone',
    type: 'Bore honing',
    status,
    statusChangedAt: Date.now(),
    utilisation24h: 0.5,
    parts_queued: [],
    parts_processed: [],
    telemetry: {},
  } as AnyMachine
}

const machines: AnyMachine[] = [
  makeMachine('M01', 'running'),
  makeMachine('M02', 'running'),
  makeMachine('M03', 'idle'),
  makeMachine('M04', 'faulted'),
  makeMachine('M05', 'running'),
  makeMachine('M06', 'maintenance'),
]

describe('SummaryTiles', () => {
  it('shows the correct count for each status', () => {
    render(<SummaryTiles machines={machines} isLoading={false} />)
    expect(screen.getByTestId('count-running')).toHaveTextContent('3')
    expect(screen.getByTestId('count-idle')).toHaveTextContent('1')
    expect(screen.getByTestId('count-faulted')).toHaveTextContent('1')
    expect(screen.getByTestId('count-maintenance')).toHaveTextContent('1')
  })

  it('shows zero counts when no machines are provided', () => {
    render(<SummaryTiles machines={[]} isLoading={false} />)
    expect(screen.getByTestId('count-running')).toHaveTextContent('0')
    expect(screen.getByTestId('count-faulted')).toHaveTextContent('0')
  })

  it('renders skeletons while loading', () => {
    const { container } = render(
      <SummaryTiles machines={undefined} isLoading={true} />
    )
    expect(container.querySelectorAll('.animate-pulse.bg-slate-200')).toHaveLength(4)
  })
})