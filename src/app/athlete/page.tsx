'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatCard } from '@/components/ui/stat-card'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AthleteCard } from '@/components/shared/athlete-card'
import {
  Eye, MessageSquare, Star, Target, TrendingUp, Calendar,
  Zap, CheckCircle2, ArrowRight, Play, Users, Award, BookOpen
} from 'lucide-react'
import { mockAthletes, mockTrackerEntries, mockEvents } from '@/lib/mock-data'
import { getGradeBg, calculateOverallGrade } from '@/lib/utils'
import Link from 'next/link'

const me = mockAthletes[0]
const myGrade = calculateOverallGrade(me)

const recentActivity = [
  { icon: Eye, text: 'Coach Miller (U of Michigan) viewed your profile', time: '2 hours ago', color: 'text-[#C9A96E]' },
  { icon: MessageSquare, text: 'New message from Stanford Volleyball', time: '5 hours ago', color: 'text-purple-500' },
  { icon: Star, text: 'Coach Thompson saved your profile', time: '1 day ago', color: 'text-amber-500' },
  { icon: Eye, text: 'Duke Basketball viewed your highlight reel', time: '2 days ago', color: 'text-[#C9A96E]' },
  { icon: Target, text: 'You have 3 schools in "Contacted" stage', time: '3 days ago', color: 'text-emerald-500' },
]

const aiSuggestions = [
  { title: 'Add training clips to boost engagement', priority: 'high' },
  { title: 'Update your academic achievements section', priority: 'medium' },
  { title: 'Consider adding social media links', priority: 'low' },
]

export default function AthleteDashboard() {
  return (
    <DashboardLayout
      role="athlete"
      title="Welcome back, Marcus 👋"
      subtitle="Your recruiting journey is looking great"
      userName="Marcus Johnson"
      userAvatar={me.avatar_url}
    >
      {/* ProspX Score banner */}
      <div className="bg-gradient-to-r from-[#1B2A4A] to-[#243662] rounded-2xl p-6 mb-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-white/5 rounded-l-full" />
        <div className="relative">
          <p className="text-white/70 text-sm font-medium mb-1">Your ProspX Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white">{me.prospx_score}</span>
            <span className="text-[#C9A96E]/60 text-lg">/100</span>
          </div>
          <p className="text-[#C9A96E]/60 text-xs mt-1">Top 5% of athletes in your sport</p>
        </div>
        <div className="relative flex flex-col items-end gap-2">
          <div className={`text-2xl font-black px-4 py-2 rounded-xl ring-2 ring-inset ${getGradeBg(myGrade)}`}>
            {myGrade}
          </div>
          <p className="text-[#C9A96E]/60 text-xs">Overall Grade</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Profile Views" value="1,247" change="23% this week" positive icon={Eye} iconColor="bg-[#1B2A4A]/5 text-[#1B2A4A]" />
        <StatCard title="Coach Interest" value="18" change="4 new this week" positive icon={Star} iconColor="bg-amber-50 text-amber-600" />
        <StatCard title="Messages" value="7" change="2 unread" icon={MessageSquare} iconColor="bg-purple-50 text-purple-600" />
        <StatCard title="Video Views" value="3,892" change="18% this week" positive icon={Play} iconColor="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recruiting tracker summary */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Recruiting Pipeline</h2>
                  <p className="text-sm text-gray-500">{mockTrackerEntries.length} schools tracked</p>
                </div>
                <Link href="/athlete/tracker">
                  <Button variant="ghost" size="sm">View all <ArrowRight size={14} /></Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTrackerEntries.map(entry => (
                  <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{entry.school}</p>
                      {entry.coach_name && <p className="text-xs text-gray-500">{entry.coach_name}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < entry.interest_level ? 'bg-[#1B2A4A]/50' : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <Badge variant={
                        entry.status === 'offered' ? 'success' :
                        entry.status === 'responded' ? 'blue' :
                        entry.status === 'visit_scheduled' ? 'purple' : 'default'
                      }>
                        {entry.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card>
            <CardHeader>
              <h2 className="font-bold text-gray-900">Recent Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <item.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">{item.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming events */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Upcoming Events</h2>
                <Link href="/events"><Button variant="ghost" size="sm">See all <ArrowRight size={14} /></Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#1B2A4A]/5 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#1B2A4A]">{new Date(event.date).toLocaleString('en', { month: 'short' })}</span>
                      <span className="text-lg font-black text-[#1B2A4A] leading-none">{new Date(event.date).getDate()}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.location}</p>
                    </div>
                    <Badge variant={event.type === 'showcase' ? 'blue' : event.type === 'combine' ? 'purple' : 'default'}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Profile completeness */}
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Profile Strength</h3>
                <span className="text-2xl font-black text-[#1B2A4A]">{me.profile_completeness}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${me.profile_completeness}%` }}
                />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Highlight Video', done: true },
                  { label: 'Academic Transcript', done: true },
                  { label: 'Stats Updated', done: true },
                  { label: 'Training Clip', done: false },
                  { label: 'Social Links', done: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className={item.done ? 'text-emerald-500' : 'text-gray-300'} />
                    <span className={`text-sm ${item.done ? 'text-gray-700' : 'text-gray-400 line-through'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI suggestions */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Zap size={14} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900">AI Suggestions</h3>
              </div>
              <div className="space-y-3">
                {aiSuggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <Badge variant={s.priority === 'high' ? 'error' : s.priority === 'medium' ? 'warning' : 'default'} className="mt-0.5 flex-shrink-0">
                      {s.priority}
                    </Badge>
                    <p className="text-xs text-gray-700">{s.title}</p>
                  </div>
                ))}
              </div>
              <Link href="/athlete/ai">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Zap size={14} /> Open AI Assistant
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Key attributes */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-3">Key Attributes</h3>
              <div className="flex flex-wrap gap-2">
                {['Academic All-Star', 'Elite Scorer', 'Decorated Athlete', 'Team Captain', 'High Motor'].map(attr => (
                  <Badge key={attr} variant="purple">{attr}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/athlete/videos"><Button variant="outline" size="sm" className="w-full justify-start"><Play size={14} /> Upload Highlight</Button></Link>
                <Link href="/athlete/discover"><Button variant="outline" size="sm" className="w-full justify-start"><Users size={14} /> Find Coaches</Button></Link>
                <Link href="/athlete/resume"><Button variant="outline" size="sm" className="w-full justify-start"><BookOpen size={14} /> Download Resume</Button></Link>
                <Link href="/athlete/ai"><Button variant="outline" size="sm" className="w-full justify-start"><Zap size={14} /> AI Analysis</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
