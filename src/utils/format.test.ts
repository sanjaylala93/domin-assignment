import { describe, it, expect } from 'vitest'
import { formatTimeInState, formatPct } from './format'

describe('formatTimeInState', () => {
  it('returns minutes only when under 1 hour', () => {
    expect(formatTimeInState(43 * 60_000)).toBe('43m')
  })

  it('returns hours and minutes', () => {
    expect(formatTimeInState((2 * 60 + 14) * 60_000)).toBe('2h 14m')
  })

  it('returns 0m for zero', () => {
    expect(formatTimeInState(0)).toBe('0m')
  })

  it('returns 1h 0m for exactly one hour', () => {
    expect(formatTimeInState(60 * 60_000)).toBe('1h 0m')
  })

  it('floors partial minutes', () => {
    // 90 seconds = 1.5 minutes → floors to 1m
    expect(formatTimeInState(90_000)).toBe('1m')
  })
})

describe('formatPct', () => {
  it('converts a ratio to a percentage string', () => {
    expect(formatPct(0.56)).toBe('56%')
  })

  it('rounds to the nearest integer', () => {
    expect(formatPct(0.567)).toBe('57%')
    expect(formatPct(0.561)).toBe('56%')
  })

  it('handles 0', () => {
    expect(formatPct(0)).toBe('0%')
  })

  it('handles 1', () => {
    expect(formatPct(1)).toBe('100%')
  })
})