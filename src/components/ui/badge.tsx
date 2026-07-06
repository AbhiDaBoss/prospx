import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'blue' | 'purple'
  className?: string
  onClick?: () => void
}

export function Badge({ children, variant = 'default', className, onClick }: BadgeProps) {
  return (
    <span onClick={onClick} className={cn(
      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset',
      {
        'bg-gray-50 text-gray-700 ring-gray-200': variant === 'default',
        'bg-emerald-50 text-emerald-700 ring-emerald-200': variant === 'success',
        'bg-amber-50 text-amber-700 ring-amber-200': variant === 'warning',
        'bg-red-50 text-red-700 ring-red-200': variant === 'error',
        'bg-[#1B2A4A]/5 text-[#1B2A4A] ring-blue-200': variant === 'blue',
        'bg-purple-50 text-purple-700 ring-purple-200': variant === 'purple',
      },
      className
    )}>
      {children}
    </span>
  )
}
