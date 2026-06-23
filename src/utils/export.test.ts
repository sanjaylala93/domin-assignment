import { describe, it, expect, vi, beforeEach } from 'vitest'
import { exportMachinesToCSV } from './export'
import type { AnyMachine } from '../types'

const machine: AnyMachine = {
  id: 'M03',
  name: 'Honing Machine',
  stage: 'Hone',
  type: 'Bore honing',
  status: 'running',
  statusChangedAt: Date.now() - 30 * 60_000,
  utilisation24h: 0.63,
  parts_queued: [],
  parts_processed: [],
  telemetry: {},
}

beforeEach(() => {
  global.URL.createObjectURL = vi.fn().mockReturnValue('blob:test')
  global.URL.revokeObjectURL = vi.fn()
})

describe('exportMachinesToCSV', () => {
  it('calls createObjectURL with a Blob', () => {
    exportMachinesToCSV([machine])
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob))
  })

  it('revokes the object URL after download', () => {
    exportMachinesToCSV([machine])
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test')
  })

  it('does not throw when given an empty array', () => {
    expect(() => exportMachinesToCSV([])).not.toThrow()
  })
})