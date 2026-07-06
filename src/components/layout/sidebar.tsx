'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, User, Video, Search, MessageSquare, BarChart3,
  Calendar, Trophy, BookOpen, Users, Target, FileText, Star,
  ChevronLeft, ChevronRight, Zap, Settings, LogOut
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const athleteNav = [
  { label: 'Dashboard', href: '/athlete', icon: LayoutDashboard },
  { label: 'My Profile', href: '/athlete/profile', icon: User },
  { label: 'Video Hub', href: '/athlete/videos', icon: Video },
  { label: 'Discover Coaches', href: '/athlete/discover', icon: Search },
  { label: 'AI Assistant', href: '/athlete/ai', icon: Zap },
  { label: 'Recruiting Tracker', href: '/athlete/tracker', icon: Target },
  { label: 'Performance', href: '/athlete/performance', icon: BarChart3 },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
  { label: 'Events & Camps', href: '/events', icon: Calendar },
  { label: 'Resume', href: '/athlete/resume', icon: FileText },
]

const coachNav = [
  { label: 'Dashboard', href: '/coach', icon: LayoutDashboard },
  { label: 'Athlete Search', href: '/coach/search', icon: Search },
  { label: 'Recruiting Board', href: '/coach/board', icon: Target },
  { label: 'Discover', href: '/coach/discover', icon: Star },
  { label: 'AI Assistant', href: '/coach/ai', icon: Zap },
  { label: 'Scouting Reports', href: '/coach/reports', icon: FileText },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
  { label: 'Analytics', href: '/coach/analytics', icon: BarChart3 },
  { label: 'Saved Prospects', href: '/coach/saved', icon: BookOpen },
  { label: 'Events', href: '/events', icon: Calendar },
]

interface SidebarProps {
  role: 'athlete' | 'coach'
  userName?: string
  userAvatar?: string
}

export function Sidebar({ role, userName = 'Marcus Johnson', userAvatar }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const nav = role === 'athlete' ? athleteNav : coachNav

  return (
    <aside className={cn(
      'fixed left-0 top-0 h-screen flex flex-col z-30 transition-all duration-300',
      collapsed ? 'w-16' : 'w-60'
    )} style={{ background: '#1B2A4A' }}>
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-white/10', collapsed ? 'justify-center' : 'gap-3')}>
        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-white p-1">
          <Image src="/ProspX.png" alt="ProspX" width={28} height={28} className="object-contain" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-base font-black text-white tracking-wide">PROSP<span style={{ color: '#C9A96E' }}>X</span></span>
            <span className="block text-xs font-medium tracking-[0.15em] uppercase" style={{ color: '#C9A96E', marginTop: -2 }}>Recruiting</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 mb-0.5',
                active
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5',
                collapsed && 'justify-center px-2'
              )}
              style={active ? { background: 'rgba(201,169,110,0.15)', color: '#C9A96E' } : {}}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#C9A96E' }} />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-2 space-y-0.5">
        <Link href="/settings" className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/5 transition-all', collapsed && 'justify-center px-2')}>
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>
        <Link href="/auth" className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/5 transition-all', collapsed && 'justify-center px-2')}>
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </Link>
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ background: 'rgba(201,169,110,0.2)' }}>
              {userAvatar
                ? <img src={userAvatar} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-sm font-bold" style={{ color: '#C9A96E' }}>{userName[0]}</div>
              }
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-xs capitalize" style={{ color: '#C9A96E' }}>{role}</p>
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
