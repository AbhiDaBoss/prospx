'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockCoaches, mockColleges } from '@/lib/mock-data'
import { Search, MapPin, CheckCircle2, MessageSquare, BookmarkPlus, Star } from 'lucide-react'

export default function DiscoverCoaches() {
  return (
    <DashboardLayout role="athlete" title="Discover Coaches" subtitle="Find college programs that match your goals">
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="Search colleges, coaches, programs..." />
        </div>
        <select className="rounded-xl border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]">
          <option>All Divisions</option>
          {['D1', 'D2', 'D3', 'NAIA', 'JUCO'].map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <h2 className="font-bold text-gray-900 mb-4">Colleges & Programs</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {mockColleges.map(college => (
          <Card key={college.id} hover>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  {college.logo_url ? <img src={college.logo_url} alt="" className="w-10 h-10 object-contain" /> : <Star size={20} className="text-gray-300" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{college.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><MapPin size={11} /> {college.location}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge variant="blue">{college.division}</Badge>
                    <Badge variant="default">{college.enrollment.toLocaleString()} students</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Programs</p>
                <div className="flex flex-wrap gap-1">
                  {college.programs.map(p => <Badge key={p} variant="default">{p}</Badge>)}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">View Program</Button>
                <Button size="sm" variant="outline"><BookmarkPlus size={14} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="font-bold text-gray-900 mb-4">Featured Coaches</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCoaches.map(coach => (
          <Card key={coach.id} hover>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  {coach.avatar_url && <img src={coach.avatar_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-sm text-gray-900">{coach.name}</p>
                    {coach.verified && <CheckCircle2 size={12} className="text-[#C9A96E]" />}
                  </div>
                  <p className="text-xs text-gray-500">{coach.title}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-700">{coach.school}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="blue">{coach.division}</Badge>
                <Badge variant="default">{coach.sport}</Badge>
              </div>
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Recruiting needs:</p>
                <div className="flex flex-wrap gap-1">
                  {coach.recruiting_needs.map(n => <Badge key={n} variant="purple">{n}</Badge>)}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1"><MessageSquare size={13} /> Message</Button>
                <Button size="sm" variant="outline"><BookmarkPlus size={13} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
