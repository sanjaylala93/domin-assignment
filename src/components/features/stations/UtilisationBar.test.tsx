import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UtilisationBar } from './UtilisationBar'

describe('UtilisationBar', () => {
  it('shows the formatted percentage', () => {
    render(<UtilisationBar value={0.56} />)
    expect(screen.getByText('56%')).toBeInTheDocument()
  })

  it('uses green for high utilisation (≥70%)', () => {
    render(<UtilisationBar value={0.8} />)
    expect(screen.getByTestId('bar-fill')).toHaveStyle({
      backgroundColor: '#10b981',
    })
  })

  it('uses amber for medium utilisation (≥40% and <70%)', () => {
    render(<UtilisationBar value={0.5} />)
    expect(screen.getByTestId('bar-fill')).toHaveStyle({
      backgroundColor: '#f59e0b',
    })
  })

  it('uses red for low utilisation (<40%)', () => {
    render(<UtilisationBar value={0.2} />)
    expect(screen.getByTestId('bar-fill')).toHaveStyle({
      backgroundColor: '#ef4444',
    })
  })

  it('sets the bar width to match the value', () => {
    render(<UtilisationBar value={0.75} />)
    expect(screen.getByTestId('bar-fill')).toHaveStyle({ width: '75%' })
  })
})