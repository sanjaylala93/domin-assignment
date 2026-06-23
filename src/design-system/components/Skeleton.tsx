import { cn } from '../utils'

interface SkeletonProps {
  className?: string
  width?: string
  height?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const roundedMap = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-xl',
  full: 'rounded-full',
}

export function Skeleton({
  className,
  width,
  height,
  rounded = 'md',
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200',
        roundedMap[rounded],
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function SkeletonRow({ cols = 6 }: { cols?: number }) {
  const widths = [
    'w-12',
    'w-28',
    'w-16',
    'w-32',
    'w-20',
    'w-24',
    'w-16',
    'w-12',
  ]
  return (
    <tr className="border-b border-slate-100">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className={cn('h-4', widths[i % widths.length])} />
        </td>
      ))}
    </tr>
  )
}
