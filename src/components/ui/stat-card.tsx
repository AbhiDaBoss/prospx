import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  positive?: boolean
  icon?: LucideIcon
  iconColor?: string
  className?: string
}

export function StatCard({ title, value, change, positive, icon: Icon, iconColor = 'bg-[#1B2A4A]/5 text-[#1B2A4A]', className }: StatCardProps) {
  return (
    <div className={cn('bg-white rounded-2xl border border-gray-100 shadow-sm p-6', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={cn('text-xs mt-1 font-medium', positive ? 'text-emerald-600' : 'text-red-500')}>
              {positive ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', iconColor)}>
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  )
}
