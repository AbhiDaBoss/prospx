'use client'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, style, ...props }, ref) => {
    const baseStyle = variant === 'primary'
      ? { background: '#1B2A4A', color: '#fff' }
      : variant === 'gold'
      ? { background: '#C9A96E', color: '#1B2A4A' }
      : {}

    return (
      <button
        ref={ref}
        style={{ ...baseStyle, ...style }}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl',
          {
            'hover:opacity-90 focus:ring-[#1B2A4A] shadow-sm': variant === 'primary',
            'hover:opacity-90 focus:ring-[#C9A96E] shadow-sm': variant === 'gold',
            'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300': variant === 'secondary',
            'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300': variant === 'ghost',
            'border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 bg-white': variant === 'outline',
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
          },
          {
            'text-xs px-3 py-1.5 gap-1.5': size === 'sm',
            'text-sm px-4 py-2.5 gap-2': size === 'md',
            'text-base px-6 py-3 gap-2.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
