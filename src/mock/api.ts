import type { Machine, UtilisationPoint, StatusSegment } from '../types'
import { getMachines } from './simulator'
import { generateUtilisationHistory, generateStatusHistory } from './fixtures'

// Generate history once at module load — stable across re-fetches
const utilisationHistory = generateUtilisationHistory()
const statusHistory = generateStatusHistory()

function simulateNetwork<T>(data: T): Promise<T> {
  // ~5% chance of error to demo error states
  if (Math.random() < 0.05) {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Failed to fetch station data')), 400)
    )
  }
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), 200 + Math.random() * 150)
  )
}

export async function fetchMachines(): Promise<Machine[]> {
  return simulateNetwork(getMachines().map((m) => ({ ...m })))
}

export async function fetchMachine(id: string): Promise<Machine> {
  const machine = getMachines().find((m) => m.id === id)
  if (!machine) throw new Error(`Machine ${id} not found`)
  return simulateNetwork({ ...machine })
}

export async function fetchUtilisationHistory(): Promise<UtilisationPoint[]> {
  return simulateNetwork(utilisationHistory)
}

export async function fetchStatusHistory(): Promise<StatusSegment[]> {
  return simulateNetwork(statusHistory)
}
