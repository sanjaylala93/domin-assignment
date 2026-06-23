import type {
  Machine,
  MachineStatus,
  UtilisationPoint,
  StatusSegment,
} from '../types'

const now = Date.now()
const MIN = 60_000
const HOUR = 60 * MIN

function serial(prefix: string, n: number) {
  return Array.from(
    { length: n },
    (_, i) => `${prefix}-${String(i + 1).padStart(4, '0')}`
  )
}

// Initial machine state — realistic values for each station
export const initialMachines: Machine[] = [
  {
    id: 'M01',
    name: '3D Printer',
    stage: 'Print',
    type: 'Metal 3D Print',
    status: 'running',
    statusChangedAt: now - 134 * MIN,
    utilisation24h: 0.56,
    parts_queued: serial('VLV', 4),
    parts_processed: serial('VLV', 18),
    telemetry: {
      chamber_temp_c: 312,
      build_progress_pct: 74,
      material_remaining_pct: 43,
      job_id: 'JOB-2291',
    },
  },
  {
    id: 'M02',
    name: 'CNC Lathe',
    stage: 'Turn',
    type: 'Precision turning',
    status: 'running',
    statusChangedAt: now - 65 * MIN,
    utilisation24h: 0.49,
    parts_queued: serial('VLV', 6),
    parts_processed: serial('VLV', 22),
    telemetry: {
      spindle_rpm: 4200,
      coolant_temp_c: 28,
    },
  },
  {
    id: 'M03',
    name: 'Honing Machine',
    stage: 'Hone',
    type: 'Bore honing',
    status: 'idle',
    statusChangedAt: now - 43 * MIN,
    utilisation24h: 0.63,
    parts_queued: serial('VLV', 3),
    parts_processed: serial('VLV', 25),
    telemetry: {},
  },
  {
    id: 'M04',
    name: 'Test Rig',
    stage: 'Test',
    type: 'End-of-line performance test',
    status: 'running',
    statusChangedAt: now - 27 * MIN,
    utilisation24h: 0.45,
    parts_queued: serial('VLV', 5),
    parts_processed: serial('VLV', 12),
    telemetry: {
      test_running: true,
      test_result: null,
      inlet_pressure_bar: 210,
      outlet_pressure_bar: 198,
      flow_rate_lpm: 42.3,
      fluid_temp_c: 51,
      test_duration_s: 87,
      part_serial: 'VLV-0013',
    },
  },
  {
    id: 'M05',
    name: 'Laser Marker',
    stage: 'Mark',
    type: 'Part identification',
    status: 'faulted',
    statusChangedAt: now - 18 * MIN,
    utilisation24h: 0.9,
    parts_queued: serial('VLV', 7),
    parts_processed: serial('VLV', 47),
    telemetry: {
      parts_marked_shift: 47,
    },
  },
  {
    id: 'M06',
    name: 'Shipping Station',
    stage: 'Ship',
    type: 'Packaging and dispatch',
    status: 'maintenance',
    statusChangedAt: now - 72 * MIN,
    utilisation24h: 0.64,
    parts_queued: serial('VLV', 2),
    parts_processed: serial('VLV', 84),
    telemetry: {
      parts_dispatched_shift: 84,
    },
  },
]

// Generate 24h of utilisation history sampled every 5 minutes (288 points)
export function generateUtilisationHistory(): UtilisationPoint[] {
  const points: UtilisationPoint[] = []
  const buckets = 288
  const interval = 5 * MIN

  for (let i = buckets; i >= 0; i--) {
    const timestamp = now - i * interval
    // Simulate realistic factory pattern: low early morning, peaks mid-shift
    const hour = new Date(timestamp).getHours()
    let base = 0.5
    if (hour >= 6 && hour < 14) base = 0.72
    else if (hour >= 14 && hour < 22) base = 0.65
    else base = 0.28
    const noise = (Math.random() - 0.5) * 0.15
    const utilisation = Math.max(0, Math.min(1, base + noise))
    const running = Math.round(utilisation * 6)
    const remaining = 6 - running
    const faulted = Math.random() < 0.15 ? 1 : 0
    const maintenance = remaining > 0 && Math.random() < 0.2 ? 1 : 0
    const idle = Math.max(0, remaining - faulted - maintenance)
    points.push({ timestamp, utilisation, running, idle, faulted, maintenance })
  }
  return points
}

// Generate 24h status history per machine for Gantt timeline
export function generateStatusHistory(): StatusSegment[] {
  const segments: StatusSegment[] = []
  const machineIds = ['M01', 'M02', 'M03', 'M04', 'M05', 'M06'] as const
  const statuses: MachineStatus[] = [
    'running',
    'idle',
    'faulted',
    'maintenance',
  ]
  // Weighted: running is most common
  const weights = [0.55, 0.25, 0.1, 0.1]

  for (const machineId of machineIds) {
    let cursor = now - 24 * HOUR
    while (cursor < now) {
      const rand = Math.random()
      let cumulative = 0
      let status: MachineStatus = 'running'
      for (let j = 0; j < statuses.length; j++) {
        cumulative += weights[j]
        if (rand < cumulative) {
          status = statuses[j]
          break
        }
      }
      // Each segment lasts 20–90 minutes
      const duration = (20 + Math.random() * 70) * MIN
      const to = Math.min(cursor + duration, now)
      segments.push({ machineId, status, from: cursor, to })
      cursor = to
    }
  }
  return segments
}
