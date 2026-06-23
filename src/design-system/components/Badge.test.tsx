import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'
import type { MachineStatus } from '../../types'

const cases: [MachineStatus, string][] = [
  ['running', 'Running'],
  ['idle', 'Idle'],
  ['faulted', 'Faulted'],
  ['maintenance', 'Maintenance'],
]

describe('Badge', () => {
  it.each(cases)('renders the correct label for %s', (status, label) => {
    render(<Badge status={status} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('applies a custom className', () => {
    const { container } = render(
      <Badge status="running" className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})