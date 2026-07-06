import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

interface DashboardLayoutProps {
  children: React.ReactNode
  role: 'athlete' | 'coach'
  title: string
  subtitle?: string
  userName?: string
  userAvatar?: string
}

export function DashboardLayout({ children, role, title, subtitle, userName, userAvatar }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-soft)' }}>
      <Sidebar role={role} userName={userName} userAvatar={userAvatar} />
      <div className="pl-60 transition-all duration-300">
        <Topbar title={title} subtitle={subtitle} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
