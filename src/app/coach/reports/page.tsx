'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockAthletes } from '@/lib/mock-data'
import { calculateOverallGrade, getGradeBg } from '@/lib/utils'
import { FileText, Star, CheckCircle2, AlertCircle, Download, Plus } from 'lucide-react'
import { useState } from 'react'

const reports = [
  {
    id: 'r1',
    athlete: mockAthletes[0],
    date: 'Nov 20, 2024',
    strengths: ['Elite court vision (top 3% nationally)', 'Efficient scorer — 48.3% FG', 'Academic excellence (3.8 GPA)', 'Natural leader — team captain'],
    concerns: ['3-point shooting still developing (38.1%)', 'Size vs. D1 competition (6\'3")'],
    fitScore: 96,
    recommendation: 'Offer immediately. Multiple D1 programs actively pursuing.',
    status: 'complete',
  },
  {
    id: 'r2',
    athlete: mockAthletes[1],
    date: 'Nov 15, 2024',
    strengths: ['Big arm — 3,241 passing yards', 'Elite mobility (812 rush yards)', 'Strong completion % (67.4%)'],
    concerns: ['Weight may need to increase for D1', 'Limited film vs. top competition'],
    fitScore: 82,
    recommendation: 'Offer pending one more film review. Schedule official visit.',
    status: 'complete',
  },
  {
    id: 'r3',
    athlete: mockAthletes[2],
    date: 'Nov 10, 2024',
    strengths: ['4.0 GPA — exceptional academic profile', 'Elite defensive stats (5.2 digs/set)', 'All-CIF 2024 recognition'],
    concerns: ['Need more game film vs. top competition'],
    fitScore: 91,
    recommendation: 'Strong fit. Prioritize contact — high interest from other D1 programs.',
    status: 'complete',
  },
  {
    id: 'r4',
    athlete: mockAthletes[3],
    date: 'Draft',
    strengths: [],
    concerns: [],
    fitScore: 0,
    recommendation: '',
    status: 'draft',
  },
]

export default function ScoutingReports() {
  const [active, setActive] = useState(reports[0].id)
  const activeReport = reports.find(r => r.id === active)!

  return (
    <DashboardLayout role="coach" title="Scouting Reports" subtitle="Detailed evaluations of your top prospects">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Report list */}
        <div className="space-y-3">
          <Button className="w-full" size="sm"><Plus size={14} /> New Report</Button>
          {reports.map(r => {
            const grade = r.status === 'complete' ? calculateOverallGrade(r.athlete.prospx_score) : '—'
            return (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={`w-full text-left rounded-2xl border p-4 transition-all ${active === r.id ? 'border-[#1B2A4A] bg-[#1B2A4A]/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {r.athlete.avatar_url && <img src={r.athlete.avatar_url} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-gray-900 truncate">{r.athlete.name}</p>
                      {r.status === 'complete' && <span className={`text-xs font-black px-1.5 py-0.5 rounded ${getGradeBg(grade)}`}>{grade}</span>}
                    </div>
                    <p className="text-xs text-gray-400">{r.athlete.sport} · {r.date}</p>
                  </div>
                  {r.status === 'draft' && <Badge variant="warning">Draft</Badge>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Report detail */}
        <div className="lg:col-span-2">
          {activeReport.status === 'draft' ? (
            <Card>
              <CardContent className="py-16 text-center">
                <FileText size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">This report is still a draft</p>
                <Button>Start Scouting Report</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100">
                      {activeReport.athlete.avatar_url && <img src={activeReport.athlete.avatar_url} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-gray-900">{activeReport.athlete.name}</h2>
                      <p className="text-sm text-gray-500">{activeReport.athlete.positions[0]} · {activeReport.athlete.sport} · {activeReport.athlete.school}</p>
                      <p className="text-xs text-gray-400">Report generated {activeReport.date}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#1B2A4A] flex items-center justify-center">
                      <span className="text-white font-black text-lg">{calculateOverallGrade(activeReport.athlete.prospx_score)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Overall Grade</p>
                  </div>
                </div>

                {/* Fit score */}
                <div className="bg-[#1B2A4A]/5 rounded-2xl p-4 mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#1B2A4A]">Program Fit Score</p>
                    <p className="text-xs text-gray-500">Based on your roster needs & system</p>
                  </div>
                  <div className="text-3xl font-black text-[#1B2A4A]">{activeReport.fitScore}<span className="text-base text-gray-400">/100</span></div>
                </div>

                {/* Strengths */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Strengths
                  </h3>
                  <div className="space-y-2">
                    {activeReport.strengths.map(s => (
                      <div key={s} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Concerns */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    <AlertCircle size={14} className="text-amber-500" /> Areas to Monitor
                  </h3>
                  <div className="space-y-2">
                    {activeReport.concerns.map(c => (
                      <div key={c} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Recommendation</p>
                  <p className="text-sm text-emerald-800 font-medium">{activeReport.recommendation}</p>
                </div>

                <Button variant="outline" className="w-full"><Download size={15} /> Download PDF Report</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
