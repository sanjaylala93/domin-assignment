import { Button } from '@domin/ui'
import type { MachineStatus } from '../../../types'

const STAGES = ['Print', 'Turn', 'Hone', 'Test', 'Mark', 'Ship'] as const
const STATUSES: MachineStatus[] = ['running', 'idle', 'faulted', 'maintenance']

const selectClass =
  'text-sm border border-slate-200 rounded px-3 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer'

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-slate-400"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ExportIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

interface StationsToolbarProps {
  search: string
  stageFilter: string
  statusFilter: string
  totalCount: number
  filteredCount: number
  onSearchChange: (v: string) => void
  onStageChange: (v: string) => void
  onStatusChange: (v: string) => void
  onExport: () => void
  exportDisabled: boolean
}

export function StationsToolbar({
  search,
  stageFilter,
  statusFilter,
  totalCount,
  filteredCount,
  onSearchChange,
  onStageChange,
  onStatusChange,
  onExport,
  exportDisabled,
}: StationsToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative flex items-center">
        <span className="absolute left-3 pointer-events-none">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search station, name or type"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded w-60 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-slate-400"
        />
      </div>

      {/* Stage filter */}
      <select
        value={stageFilter}
        onChange={(e) => onStageChange(e.target.value)}
        className={selectClass}
      >
        <option value="all">All stages</option>
        {STAGES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className={selectClass}
      >
        <option value="all">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <div className="flex-1" />

      {/* Count */}
      <span className="text-sm text-slate-500 whitespace-nowrap">
        {filteredCount} of {totalCount} stations
      </span>

      {/* Export */}
      <Button
        variant="secondary"
        size="sm"
        icon={<ExportIcon />}
        onClick={onExport}
        disabled={exportDisabled}
      >
        Export
      </Button>
    </div>
  )
}
