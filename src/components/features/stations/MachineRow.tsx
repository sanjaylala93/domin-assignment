import { Badge } from '@domin/ui'
import type { AnyMachine } from '../../../types'
import { formatTimeInState } from '../../../utils/format'
import { UtilisationBar } from './UtilisationBar'

function ChevronRight() {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

interface MachineRowProps {
  machine: AnyMachine
}

export function MachineRow({ machine }: MachineRowProps) {
  const timeInState = formatTimeInState(Date.now() - machine.statusChangedAt)

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
      <td className="px-4 py-3 text-xs font-mono font-medium text-slate-500">
        {machine.id}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-slate-900 whitespace-nowrap">
        {machine.name}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">{machine.stage}</td>
      <td className="px-4 py-3 text-sm text-slate-600 max-w-[180px] truncate">
        {machine.type}
      </td>
      <td className="px-4 py-3">
        <Badge status={machine.status} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 tabular-nums whitespace-nowrap">
        {timeInState}
      </td>
      <td className="px-4 py-3 w-40">
        <UtilisationBar value={machine.utilisation24h} />
      </td>
      <td className="px-4 py-3 w-8">
        <button
          className="text-slate-300 group-hover:text-slate-500 transition-colors"
          aria-label={`Inspect ${machine.name}`}
        >
          <ChevronRight />
        </button>
      </td>
    </tr>
  )
}
