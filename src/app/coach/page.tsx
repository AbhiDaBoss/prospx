'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatCard } from '@/components/ui/stat-card'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AthleteCard } from '@/components/shared/athlete-card'
import {
  Users, MessageSquare, Star, TrendingUp, ArrowRight, Zap,
  Eye, Target, BarChart3, Calendar, Search
} from 'lucide-react'
import { mockAthletes, mockPipeline, mockCoaches } from '@/lib/mock-data'
import { calculateOverallGrade, getGradeBg } from '@/lib/utils'
import Link from 'next/link'

const me = mockCoaches[0]

const pipelineSummary = [
  { stage: 'Interested', count: 12, color: 'bg-gray-100 text-gray-700' },
  { stage: 'Evaluating', count: 8, color: 'bg-[#1B2A4A]/5 text-[#1B2A4A]' },
  { stage: 'Contacted', count: 6, color: 'bg-purple-50 text-purple-700' },
  { stage: 'Visiting', count: 3, color: 'bg-amber-50 text-amber-700' },
  { stage: 'Offered', count: 2, color: 'bg-emerald-50 text-emerald-700' },
  { stage: 'Committed', count: 1, color: 'bg-green-100 text-green-700' },
]

export default function CoachDashboard() {
  return (
    <DashboardLayout
      role="coach"
      title="Recruiting Dashboard"
      subtitle={`${me.school} · ${me.division} ${me.sport}`}
      userName={me.name}
      userAvatar={me.avatar_url}
    >
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-full" style={{ background: 'radial-gradient(ellipse at right, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />
        <div>
          <p className="text-gray-400 text-sm mb-1">Welcome back, Coach Miller</p>
          <h2 className="text-2xl font-black text-white">{me.school}</h2>
          <p className="text-gray-400 text-sm mt-1">{me.division} · {me.sport} · Head Coach</p>
        </div>
        <div className="flex gap-3">
          <Link href="/coach/search">
            <Button size="sm" className="gap-2"><Search size={14} /> Search Athletes</Button>
          </Link>
          <Link href="/coach/discover">
            <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Zap size={14} /> Discover
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Prospects" value="47" change="5 new this week" positive icon={Users} iconColor="bg-[#1B2A4A]/5 text-[#1B2A4A]" />
        <StatCard title="Unread Messages" value="12" change="3 new today" icon={MessageSquare} iconColor="bg-purple-50 text-purple-600" />
        <StatCard title="Saved Athletes" value="89" change="8 this week" positive icon={Star} iconColor="bg-amber-50 text-amber-600" />
        <StatCard title="Offer Acceptances" value="68%" change="up 12%" positive icon={TrendingUp} iconColor="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pipeline overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Recruiting Pipeline</h2>
                <Link href="/coach/board"><Button variant="ghost" size="sm">Full Board <ArrowRight size={14} /></Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {pipelineSummary.map(s => (
                  <div key={s.stage} className={`p-3 rounded-xl text-center ${s.color}`}>
                    <p className="text-2xl font-black">{s.count}</p>
                    <p className="text-xs font-medium opacity-80">{s.stage}</p>
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Pipeline Activity</h3>
              <div className="space-y-2">
                {mockPipeline.slice(0, 4).map(entry => {
                  const g = calculateOverallGrade({ gpa: entry.athlete!.gpa, prospx_score: entry.athlete!.prospx_score, profile_completeness: entry.athlete!.profile_completeness })
                  return (
                    <div key={entry.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        {entry.athlete?.avatar_url && <img src={entry.athlete.avatar_url} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{entry.athlete?.name}</p>
                        <p className="text-xs text-gray-500">{entry.athlete?.sport} · {entry.athlete?.state}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ring-1 ring-inset ${getGradeBg(g)}`}>{g}</span>
                      <Badge variant={
                        entry.stage === 'offered' ? 'success' :
                        entry.stage === 'visiting' ? 'blue' :
                        entry.stage === 'contacted' ? 'purple' : 'default'
                      }>
                        {entry.stage}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top prospects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Top Prospects</h2>
                <Link href="/coach/search"><Button variant="ghost" size="sm">Search <ArrowRight size={14} /></Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {mockAthletes.slice(0, 4).map(athlete => (
                  <AthleteCard key={athlete.id} athlete={athlete} showActions />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-6">
          {/* AI summary */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Zap size={16} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900">AI Insights</h3>
              </div>
              <div className="space-y-3">
                {[
                  { text: 'Marcus Johnson is a strong fit for your PG need — 94 score, elite court vision', type: 'match' },
                  { text: '3 new D1 prospects matching your filters added this week', type: 'new' },
                  { text: 'Aisha Williams has not received contact from your staff yet', type: 'action' },
                ].map((item, i) => (
                  <div key={i} className={`p-3 rounded-xl text-xs leading-relaxed ${
                    item.type === 'match' ? 'bg-[#1B2A4A]/5 text-blue-800' :
                    item.type === 'new' ? 'bg-emerald-50 text-emerald-800' :
                    'bg-amber-50 text-amber-800'
                  }`}>
                    {item.text}
                  </div>
                ))}
              </div>
              <Link href="/coach/ai">
                <Button variant="outline" size="sm" className="w-full mt-4"><Zap size={14} /> Open AI Assistant</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recruiting needs */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-3">Recruiting Needs</h3>
              <div className="flex flex-wrap gap-2">
                {me.recruiting_needs.map(need => (
                  <Badge key={need} variant="blue">{need}</Badge>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">Based on your roster for next season</p>
            </CardContent>
          </Card>

          {/* Analytics preview */}
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Analytics</h3>
                <Link href="/coach/analytics"><Button variant="ghost" size="sm"><BarChart3 size={14} /></Button></Link>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Avg Response Rate', val: '73%', color: 'text-emerald-600' },
                  { label: 'Avg Time to Offer', val: '28 days', color: 'text-[#1B2A4A]' },
                  { label: 'Profile Views Given', val: '312', color: 'text-purple-600' },
                ].map(s => (
                  <div key={s.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{s.label}</span>
                    <span className={`text-sm font-bold ${s.color}`}>{s.val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/coach/discover"><Button variant="outline" size="sm" className="w-full justify-start"><Zap size={14} /> Discover Mode</Button></Link>
                <Link href="/coach/board"><Button variant="outline" size="sm" className="w-full justify-start"><Target size={14} /> Recruiting Board</Button></Link>
                <Link href="/coach/reports"><Button variant="outline" size="sm" className="w-full justify-start"><BarChart3 size={14} /> Scouting Reports</Button></Link>
                <Link href="/events"><Button variant="outline" size="sm" className="w-full justify-start"><Calendar size={14} /> Browse Events</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
