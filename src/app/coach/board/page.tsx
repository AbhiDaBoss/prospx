'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockPipeline } from '@/lib/mock-data'
import { calculateOverallGrade, getGradeBg } from '@/lib/utils'
import { RecruitingPipelineEntry } from '@/types'
import { Plus, GripVertical, MessageSquare, Star, Eye } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const STAGES = [
  { id: 'interested', label: 'Interested', color: 'border-t-gray-400' },
  { id: 'evaluating', label: 'Evaluating', color: 'border-t-blue-500' },
  { id: 'contacted', label: 'Contacted', color: 'border-t-purple-500' },
  { id: 'visiting', label: 'Visiting', color: 'border-t-amber-500' },
  { id: 'offered', label: 'Offered', color: 'border-t-emerald-500' },
  { id: 'committed', label: 'Committed', color: 'border-t-green-600' },
] as const

type Stage = typeof STAGES[number]['id']

function PipelineCard({ entry }: { entry: RecruitingPipelineEntry }) {
  if (!entry.athlete) return null
  const grade = calculateOverallGrade(entry.athlete)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all cursor-grab group">
      <div className="flex items-start gap-2.5">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {entry.athlete.avatar_url && <img src={entry.athlete.avatar_url} alt="" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 justify-between">
            <p className="text-sm font-semibold text-gray-900 truncate">{entry.athlete.name}</p>
            <span className={`text-xs font-black px-1.5 py-0.5 rounded-lg ring-1 ring-inset flex-shrink-0 ${getGradeBg(grade)}`}>{grade}</span>
          </div>
          <p className="text-xs text-gray-500">{entry.athlete.positions[0]} · {entry.athlete.sport}</p>
          <p className="text-xs text-gray-400">{entry.athlete.state} · {entry.athlete.graduation_year}</p>
        </div>
      </div>
      {entry.notes && (
        <p className="text-xs text-gray-500 mt-2 line-clamp-2 italic">&ldquo;{entry.notes}&rdquo;</p>
      )}
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-0.5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (entry.rating || 0) ? 'bg-[#1B2A4A]/50' : 'bg-gray-100'}`} />
          ))}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center hover:bg-gray-100"><MessageSquare size={11} className="text-gray-500" /></button>
          <button className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center hover:bg-gray-100"><Star size={11} className="text-gray-500" /></button>
          <Link href={`/athlete/${entry.athlete_id}`}><button className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center hover:bg-gray-100"><Eye size={11} className="text-gray-500" /></button></Link>
        </div>
      </div>
    </div>
  )
}

export default function RecruitingBoard() {
  const [pipeline, setPipeline] = useState(mockPipeline)

  const getStageEntries = (stage: Stage) => pipeline.filter(e => e.stage === stage)

  return (
    <DashboardLayout role="coach" title="Recruiting Board" subtitle="Drag-and-drop pipeline management">
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: 'calc(100vh - 160px)' }}>
        {STAGES.map(stage => {
          const entries = getStageEntries(stage.id)
          return (
            <div key={stage.id} className="flex-shrink-0 w-64">
              <div className={`bg-white rounded-2xl border-t-4 border border-gray-100 shadow-sm overflow-hidden ${stage.color}`}>
                <div className="p-4 border-b border-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{stage.label}</span>
                      <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                        {entries.length}
                      </span>
                    </div>
                    <button className="w-6 h-6 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                      <Plus size={14} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="p-3 space-y-2 min-h-32">
                  {entries.map(entry => (
                    <PipelineCard key={entry.id} entry={entry} />
                  ))}
                  {entries.length === 0 && (
                    <div className="text-center py-8 text-xs text-gray-300">
                      <div className="w-8 h-8 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center mx-auto mb-2">
                        <Plus size={14} />
                      </div>
                      Drop here
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
