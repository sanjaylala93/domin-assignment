import { useState } from 'react'
import { Card } from '@domin/ui'
import { useMachines } from '../hooks/useMachines'
import { SummaryTiles } from '../components/features/stations/SummaryTiles'
import { StationsTable } from '../components/features/stations/StationsTable'
import { StationsToolbar } from '../components/features/stations/StationsToolbar'
import { exportMachinesToCSV } from '../utils/export'
import type { MachineStatus } from '../types'

export default function StationsPage() {
  const { data: machines, isLoading, isError, refetch } = useMachines()

  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = machines?.filter((m) => {
    const q = search.toLowerCase()
    const matchesSearch =
      q === '' ||
      m.id.toLowerCase().includes(q) ||
      m.name.toLowerCase().includes(q) ||
      m.type.toLowerCase().includes(q)
    const matchesStage = stageFilter === 'all' || m.stage === stageFilter
    const matchesStatus =
      statusFilter === 'all' || m.status === (statusFilter as MachineStatus)
    return matchesSearch && matchesStage && matchesStatus
  })

  return (
    <div className="flex flex-col gap-5">
      <SummaryTiles machines={machines} isLoading={isLoading} />

      <StationsToolbar
        search={search}
        stageFilter={stageFilter}
        statusFilter={statusFilter}
        totalCount={machines?.length ?? 0}
        filteredCount={filtered?.length ?? 0}
        onSearchChange={setSearch}
        onStageChange={setStageFilter}
        onStatusChange={setStatusFilter}
        onExport={() => filtered && exportMachinesToCSV(filtered)}
        exportDisabled={isLoading || isError || !filtered?.length}
      />

      <Card padding="sm">
        <StationsTable
          machines={filtered}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
        />
      </Card>
    </div>
  )
}
