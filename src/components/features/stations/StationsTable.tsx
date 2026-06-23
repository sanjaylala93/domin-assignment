import { Button, SkeletonRow } from '@domin/ui'
import type { AnyMachine } from '../../../types'
import { MachineRow } from './MachineRow'

const TH = ({
  children,
  className = '',
}: {
  children?: React.ReactNode
  className?: string
}) => (
  <th
    className={`px-4 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide ${className}`}
  >
    {children}
  </th>
)

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-slate-700 font-medium mb-1">
        Failed to load station data
      </p>
      <p className="text-slate-400 text-sm mb-4">
        Check your connection and try again
      </p>
      <Button variant="secondary" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  )
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={8} className="py-16 text-center text-slate-400 text-sm">
        No stations match your filters
      </td>
    </tr>
  )
}

function TableBody({
  machines,
  isLoading,
}: {
  machines: AnyMachine[] | undefined
  isLoading: boolean
}) {
  if (isLoading) {
    return Array.from({ length: 6 }).map((_, i) => (
      <SkeletonRow key={i} cols={8} />
    ))
  }
  if (!machines?.length) {
    return <EmptyState />
  }
  return machines.map((m) => <MachineRow key={m.id} machine={m} />)
}

interface StationsTableProps {
  machines: AnyMachine[] | undefined
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export function StationsTable({
  machines,
  isLoading,
  isError,
  onRetry,
}: StationsTableProps) {
  if (isError) {
    return <ErrorState onRetry={onRetry} />
  }

  return (
    <table className="w-full">
      <thead className="bg-slate-50 border-b border-slate-100">
        <tr>
          <TH>ID</TH>
          <TH>Name</TH>
          <TH>Stage</TH>
          <TH>Type</TH>
          <TH>Status</TH>
          <TH>Time in state</TH>
          <TH className="w-40">24h utilisation</TH>
          <TH className="w-8" />
        </tr>
      </thead>
      <tbody>
        <TableBody machines={machines} isLoading={isLoading} />
      </tbody>
    </table>
  )
}
