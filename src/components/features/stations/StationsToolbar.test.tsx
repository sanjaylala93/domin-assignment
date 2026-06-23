import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StationsToolbar } from './StationsToolbar'

const defaultProps = {
  search: '',
  stageFilter: 'all',
  statusFilter: 'all',
  totalCount: 6,
  filteredCount: 6,
  onSearchChange: vi.fn(),
  onStageChange: vi.fn(),
  onStatusChange: vi.fn(),
  onExport: vi.fn(),
  exportDisabled: false,
}

describe('StationsToolbar', () => {
  it('shows the station count', () => {
    render(<StationsToolbar {...defaultProps} filteredCount={3} totalCount={6} />)
    expect(screen.getByText('3 of 6 stations')).toBeInTheDocument()
  })

  it('calls onSearchChange when typing in the search box', async () => {
    const onSearchChange = vi.fn()
    const user = userEvent.setup()
    render(<StationsToolbar {...defaultProps} onSearchChange={onSearchChange} />)
    await user.type(
      screen.getByPlaceholderText('Search station, name or type'),
      'M01'
    )
    expect(onSearchChange).toHaveBeenCalled()
  })

  it('calls onExport when the export button is clicked', async () => {
    const onExport = vi.fn()
    const user = userEvent.setup()
    render(<StationsToolbar {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: /export/i }))
    expect(onExport).toHaveBeenCalledOnce()
  })

  it('disables the export button when exportDisabled is true', () => {
    render(<StationsToolbar {...defaultProps} exportDisabled={true} />)
    expect(screen.getByRole('button', { name: /export/i })).toBeDisabled()
  })
})