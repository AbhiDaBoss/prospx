'use client'
import { Bell, Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface TopbarProps {
  title: string
  subtitle?: string
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const [notifs] = useState(3)

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 sticky top-0 z-20" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-xl px-3 py-2 w-64 border" style={{ background: 'var(--surface-muted)', borderColor: 'var(--border)' }}>
          <Search size={14} className="text-gray-400" />
          <input placeholder="Search athletes, coaches..." className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none w-full" />
        </div>
        <Link href="/notifications" className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
          <Bell size={17} className="text-gray-600" />
          {notifs > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 text-white text-xs rounded-full flex items-center justify-center font-bold" style={{ background: '#C9A96E' }}>
              {notifs}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
