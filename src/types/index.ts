export type MachineStatus = 'running' | 'idle' | 'maintenance' | 'faulted'

// Per-machine telemetry shapes — field names exactly as per spec
export interface M01Telemetry {
  chamber_temp_c: number
  build_progress_pct: number
  material_remaining_pct: number
  job_id: string
}

export interface M02Telemetry {
  spindle_rpm: number
  coolant_temp_c: number
}

export interface M03Telemetry {
  // status only — no additional telemetry
}

export interface M04Telemetry {
  test_running: boolean
  test_result: 'pass' | 'fail' | null
  inlet_pressure_bar: number
  outlet_pressure_bar: number
  flow_rate_lpm: number
  fluid_temp_c: number
  test_duration_s: number
  part_serial: string | null
}

export interface M05Telemetry {
  parts_marked_shift: number
}

export interface M06Telemetry {
  parts_dispatched_shift: number
}

// Discriminated union — narrows telemetry type by machine id
export type Machine =
  | {
      id: 'M01'
      name: '3D Printer'
      stage: 'Print'
      type: 'Metal 3D Print'
      status: MachineStatus
      statusChangedAt: number
      utilisation24h: number
      parts_queued: string[]
      parts_processed: string[]
      telemetry: M01Telemetry
    }
  | {
      id: 'M02'
      name: 'CNC Lathe'
      stage: 'Turn'
      type: 'Precision turning'
      status: MachineStatus
      statusChangedAt: number
      utilisation24h: number
      parts_queued: string[]
      parts_processed: string[]
      telemetry: M02Telemetry
    }
  | {
      id: 'M03'
      name: 'Honing Machine'
      stage: 'Hone'
      type: 'Bore honing'
      status: MachineStatus
      statusChangedAt: number
      utilisation24h: number
      parts_queued: string[]
      parts_processed: string[]
      telemetry: M03Telemetry
    }
  | {
      id: 'M04'
      name: 'Test Rig'
      stage: 'Test'
      type: 'End-of-line performance test'
      status: MachineStatus
      statusChangedAt: number
      utilisation24h: number
      parts_queued: string[]
      parts_processed: string[]
      telemetry: M04Telemetry
    }
  | {
      id: 'M05'
      name: 'Laser Marker'
      stage: 'Mark'
      type: 'Part identification'
      status: MachineStatus
      statusChangedAt: number
      utilisation24h: number
      parts_queued: string[]
      parts_processed: string[]
      telemetry: M05Telemetry
    }
  | {
      id: 'M06'
      name: 'Shipping Station'
      stage: 'Ship'
      type: 'Packaging and dispatch'
      status: MachineStatus
      statusChangedAt: number
      utilisation24h: number
      parts_queued: string[]
      parts_processed: string[]
      telemetry: M06Telemetry
    }

// Convenience type for components that don't need to narrow
export type AnyMachine = Machine

// 30-minute bucket used for utilisation chart + status timeline
export interface UtilisationPoint {
  timestamp: number
  utilisation: number // 0–1, fraction of stations running
  running: number
  idle: number
  faulted: number
  maintenance: number
}

// One segment of a machine's status history (for Gantt timeline)
export interface StatusSegment {
  machineId: string
  status: MachineStatus
  from: number
  to: number
}
