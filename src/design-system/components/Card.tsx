import { cn } from '../utils'

const paddingMap = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: keyof typeof paddingMap
  accent?: 'left' | 'top'
  accentColor?: string // CSS color value from design-system tokens
  as?: React.ElementType
}

export function Card({
  children,
  className,
  padding = 'md',
  accent,
  accentColor,
  as: Tag = 'div',
}: CardProps) {
  const accentStyle =
    accent && accentColor
      ? {
          borderLeftColor: accent === 'left' ? accentColor : undefined,
          borderLeftWidth: accent === 'left' ? '4px' : undefined,
          borderTopColor: accent === 'top' ? accentColor : undefined,
          borderTopWidth: accent === 'top' ? '4px' : undefined,
        }
      : undefined

  return (
    <Tag
      className={cn(
        'bg-white border border-slate-200 shadow-sm',
        paddingMap[padding],
        className
      )}
      style={accentStyle}
    >
      {children}
    </Tag>
  )
}
