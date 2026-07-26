'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockAthletes } from '@/lib/mock-data'
import { calculateOverallGrade, getGradeBg } from '@/lib/utils'
import { Bookmark, MessageSquare, FileText, Trash2, Star } from 'lucide-react'
import { useState } from 'react'

const savedProspects = mockAthletes.map((a, i) => ({
  ...a,
  savedDate: ['2 days ago', '1 week ago', '3 days ago', '2 weeks ago', '5 days ago'][i],
  notes: ['Elite court vision, top PG target', 'Big arm, dual-threat QB', 'Academic + athletic standout', 'Best shot blocker in class', 'Creative midfielder, high ceiling'][i],
  priority: (['high', 'medium', 'high', 'low', 'medium'] as const)[i],
}))

const priorityColors = {
  high: 'bg-red-50 text-red-600 border-red-100',
  medium: 'bg-amber-50 text-amber-600 border-amber-100',
  low: 'bg-gray-50 text-gray-500 border-gray-100',
}

export default function SavedProspects() {
  const [prospects, setProspects] = useState(savedProspects)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  const filtered = filter === 'all' ? prospects : prospects.filter(p => p.priority === filter)

  const remove = (id: string) => setProspects(p => p.filter(a => a.id !== id))

  return (
    <DashboardLayout role="coach" title="Saved Prospects" subtitle="Athletes you've bookmarked for follow-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['all', 'high', 'medium', 'low'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-[#1B2A4A] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              {f === 'all' ? `All (${prospects.length})` : `${f} priority`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(prospect => {
          const grade = calculateOverallGrade(prospect.prospx_score)
          return (
            <Card key={prospect.id}>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {prospect.avatar_url && <img src={prospect.avatar_url} alt="" className="w-full h-full object-cover" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-gray-900">{prospect.name}</h3>
                      <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${getGradeBg(grade)}`}>{grade}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-lg border capitalize ${priorityColors[prospect.priority]}`}>{prospect.priority}</span>
                    </div>
                    <p className="text-sm text-gray-500">{prospect.positions[0]} · {prospect.sport} · {prospect.school} · {prospect.city}, {prospect.state}</p>
                    <p className="text-xs text-gray-400 mt-1 italic">"{prospect.notes}"</p>
                  </div>

                  <div className="flex items-center gap-2 text-center flex-shrink-0">
                    <div>
                      <p className="text-xl font-black text-[#1B2A4A]">{prospect.prospx_score}</p>
                      <p className="text-xs text-gray-400">Score</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm"><MessageSquare size={14} /> Message</Button>
                    <Button variant="outline" size="sm"><FileText size={14} /> Report</Button>
                    <button onClick={() => remove(prospect.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Bookmark size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No saved prospects in this category</p>
        </div>
      )}
    </DashboardLayout>
  )
}
