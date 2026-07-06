'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockTrackerEntries } from '@/lib/mock-data'
import { Plus, School, MessageSquare, Calendar, Star, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import type { AthleteTrackerEntry } from '@/types'

const STATUS_COLS = [
  { id: 'researching', label: 'Researching', color: 'border-t-gray-300', badge: 'default' as const },
  { id: 'contacted', label: 'Contacted', color: 'border-t-blue-400', badge: 'blue' as const },
  { id: 'responded', label: 'Responded', color: 'border-t-purple-500', badge: 'purple' as const },
  { id: 'visit_scheduled', label: 'Visit Scheduled', color: 'border-t-amber-500', badge: 'warning' as const },
  { id: 'offered', label: 'Offered', color: 'border-t-emerald-500', badge: 'success' as const },
  { id: 'committed', label: 'Committed', color: 'border-t-green-600', badge: 'success' as const },
]

function TrackerCard({ entry }: { entry: AthleteTrackerEntry }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-bold text-sm text-gray-900">{entry.school}</p>
          {entry.coach_name && <p className="text-xs text-gray-500">{entry.coach_name}</p>}
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className={i < entry.interest_level ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
          ))}
        </div>
      </div>
      {entry.notes && <p className="text-xs text-gray-500 italic mb-3">{entry.notes}</p>}
      <div className="flex items-center gap-2">
        <button className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center hover:bg-gray-100">
          <MessageSquare size={11} className="text-gray-400" />
        </button>
        <button className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center hover:bg-gray-100">
          <Calendar size={11} className="text-gray-400" />
        </button>
        <span className="text-xs text-gray-400 ml-auto">{new Date(entry.updated_at).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  )
}

export default function RecruitingTracker() {
  const [entries] = useState(mockTrackerEntries)

  const summary = {
    total: entries.length,
    offered: entries.filter(e => e.status === 'offered').length,
    responded: entries.filter(e => e.status === 'responded').length,
    avgInterest: (entries.reduce((sum, e) => sum + e.interest_level, 0) / entries.length).toFixed(1),
  }

  return (
    <DashboardLayout role="athlete" title="Recruiting Tracker" subtitle="Track your entire recruiting journey">
      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="pt-4 text-center"><p className="text-2xl font-black text-gray-900">{summary.total}</p><p className="text-xs text-gray-500">Schools Tracked</p></CardContent></Card>
        <Card><CardContent className="pt-4 text-center"><p className="text-2xl font-black text-emerald-600">{summary.offered}</p><p className="text-xs text-gray-500">Offers Received</p></CardContent></Card>
        <Card><CardContent className="pt-4 text-center"><p className="text-2xl font-black text-[#1B2A4A]">{summary.responded}</p><p className="text-xs text-gray-500">Responded</p></CardContent></Card>
        <Card><CardContent className="pt-4 text-center"><p className="text-2xl font-black text-amber-600">{summary.avgInterest}</p><p className="text-xs text-gray-500">Avg Interest</p></CardContent></Card>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Pipeline View</h2>
        <Button size="sm"><Plus size={14} /> Add School</Button>
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-6">
        {STATUS_COLS.map(col => {
          const colEntries = entries.filter(e => e.status === col.id)
          return (
            <div key={col.id} className="flex-shrink-0 w-56">
              <div className={`bg-white rounded-2xl border-t-4 border border-gray-100 shadow-sm overflow-hidden ${col.color}`}>
                <div className="p-3 border-b border-gray-50 flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-700">{col.label}</span>
                  <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">{colEntries.length}</span>
                </div>
                <div className="p-2 space-y-2 min-h-24">
                  {colEntries.map(e => <TrackerCard key={e.id} entry={e} />)}
                  {colEntries.length === 0 && (
                    <div className="text-center py-6 text-xs text-gray-300">
                      <Plus size={16} className="mx-auto mb-1" />
                      Add school
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
