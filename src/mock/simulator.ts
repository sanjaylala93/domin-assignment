import type { Machine, MachineStatus } from '../types'
import { initialMachines } from './fixtures'

// Module-level mutable state — acts as our mock "database"
let machines: Machine[] = initialMachines.map((m) => ({ ...m }))
let listeners: Array<() => void> = []

export function getMachines(): Machine[] {
  return machines
}

export function subscribe(fn: () => void): () => void {
  listeners.push(fn)
  return () => {
    listeners = listeners.filter((l) => l !== fn)
  }
}

function notify() {
  listeners.forEach((fn) => fn())
}

const STATUSES: MachineStatus[] = ['running', 'idle', 'faulted', 'maintenance']

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

function jitter(val: number, pct: number) {
  return val + val * (Math.random() - 0.5) * 2 * pct
}

// Mutate a single machine's telemetry + occasionally flip status
function tick(machine: Machine): Machine {
  const now = Date.now()
  const updated = {
    ...machine,
    telemetry: { ...(machine as any).telemetry },
  } as Machine

  // 5% chance of status change per tick
  if (Math.random() < 0.05) {
    const next = STATUSES[Math.floor(Math.random() * STATUSES.length)]
    if (next !== updated.status) {
      ;(updated as any).status = next
      ;(updated as any).statusChangedAt = now
    }
  }

  // Update telemetry per machine type
  switch (updated.id) {
    case 'M01': {
      const t = updated.telemetry
      updated.telemetry = {
        chamber_temp_c: clamp(jitter(t.chamber_temp_c, 0.02), 250, 380),
        build_progress_pct:
          updated.status === 'running'
            ? clamp(t.build_progress_pct + 0.5, 0, 100)
            : t.build_progress_pct,
        material_remaining_pct: clamp(t.material_remaining_pct - 0.1, 0, 100),
        job_id: t.job_id,
      }
      break
    }
    case 'M02': {
      const t = updated.telemetry
      updated.telemetry = {
        spindle_rpm:
          updated.status === 'running'
            ? clamp(jitter(t.spindle_rpm, 0.03), 1000, 6000)
            : 0,
        coolant_temp_c: clamp(jitter(t.coolant_temp_c, 0.02), 20, 45),
      }
      break
    }
    case 'M04': {
      const t = updated.telemetry
      const running = updated.status === 'running'
      updated.telemetry = {
        test_running: running,
        test_result: running ? null : Math.random() < 0.9 ? 'pass' : 'fail',
        inlet_pressure_bar: clamp(jitter(t.inlet_pressure_bar, 0.02), 150, 250),
        outlet_pressure_bar: clamp(
          jitter(t.outlet_pressure_bar, 0.02),
          140,
          240
        ),
        flow_rate_lpm: clamp(jitter(t.flow_rate_lpm, 0.03), 20, 80),
        fluid_temp_c: clamp(jitter(t.fluid_temp_c, 0.02), 40, 70),
        test_duration_s: running ? t.test_duration_s + 5 : 0,
        part_serial: t.part_serial,
      }
      break
    }
    case 'M05': {
      const t = updated.telemetry
      updated.telemetry = {
        parts_marked_shift:
          updated.status === 'running'
            ? t.parts_marked_shift + (Math.random() < 0.3 ? 1 : 0)
            : t.parts_marked_shift,
      }
      break
    }
    case 'M06': {
      const t = updated.telemetry
      updated.telemetry = {
        parts_dispatched_shift:
          updated.status === 'running'
            ? t.parts_dispatched_shift + (Math.random() < 0.2 ? 1 : 0)
            : t.parts_dispatched_shift,
      }
      break
    }
  }

  return updated
}

// Start the simulation — ticks every 3 seconds
let intervalId: ReturnType<typeof setInterval> | null = null

export function startSimulator() {
  if (intervalId !== null) return
  intervalId = setInterval(() => {
    machines = machines.map(tick)
    notify()
  }, 3000)
}

export function stopSimulator() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}
