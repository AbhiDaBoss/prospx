'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockAthletes } from '@/lib/mock-data'
import { calculateOverallGrade, getGradeBg, getKeyAttributes } from '@/lib/utils'
import {
  CheckCircle2, Edit2, MapPin, GraduationCap, Award, Play,
  Star, Eye, Heart, TrendingUp, Share2
} from 'lucide-react'

const me = mockAthletes[0]
const grade = calculateOverallGrade(me)
const attrs = getKeyAttributes(me)

export default function AthleteProfile() {
  return (
    <DashboardLayout role="athlete" title="My Profile" subtitle="Manage your recruiting profile" userName={me.name} userAvatar={me.avatar_url}>
      {/* Header */}
      <div className="relative mb-6">
        <div className="h-48 rounded-2xl bg-gradient-to-r from-[#1B2A4A] via-blue-700 to-[#131f36] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546519638405-a2604ca94898?w=1200')] bg-cover bg-center opacity-20" />
          <Button variant="outline" size="sm" className="absolute top-4 right-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Edit2 size={14} /> Edit Cover
          </Button>
        </div>

        <div className="px-6 pb-4 relative">
          <div className="flex items-end gap-5 -mt-12 mb-4">
            <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {me.avatar_url && <img src={me.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="pb-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-gray-900">{me.name}</h1>
                {me.verified && <CheckCircle2 size={18} className="text-[#C9A96E]" />}
                <div className={`text-base font-black px-3 py-1 rounded-xl ring-2 ring-inset ml-auto ${getGradeBg(grade)}`}>
                  {grade}
                </div>
              </div>
              <p className="text-gray-500 text-sm">{me.positions.join(' · ')} · {me.sport}</p>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={11} /> {me.city}, {me.state}</span>
                <span className="flex items-center gap-1"><GraduationCap size={11} /> Class of {me.graduation_year}</span>
                <span>{me.school}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {attrs.map(a => <Badge key={a} variant="purple">{a}</Badge>)}
            <Badge variant="blue">{me.recruiting_status === 'open' ? 'Actively Recruiting' : me.recruiting_status}</Badge>
          </div>

          <div className="flex gap-2 mt-4">
            <Button size="sm"><Edit2 size={14} /> Edit Profile</Button>
            <Button size="sm" variant="outline"><Share2 size={14} /> Share</Button>
            {me.social_links.instagram && (
              <Button size="sm" variant="ghost">{me.social_links.instagram}</Button>
            )}
            {me.social_links.twitter && (
              <Button size="sm" variant="ghost">@{me.social_links.twitter.replace('@', '')}</Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Bio, Stats, Awards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-2">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{me.bio}</p>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-4">Athletic Stats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(me.stats).map(([k, v]) => (
                  <div key={k} className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-2xl font-black text-[#1B2A4A]">{v}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{k}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Highlight Videos */}
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Highlight Videos</h3>
                <Button size="sm" variant="outline"><Play size={14} /> Upload Video</Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {me.highlight_videos.map(video => (
                  <div key={video.id} className="rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all group cursor-pointer">
                    <div className="relative h-36 bg-gray-100">
                      {video.thumbnail_url && (
                        <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play size={20} className="text-gray-900 ml-0.5" />
                        </div>
                      </div>
                      <Badge variant={video.type === 'highlight' ? 'blue' : video.type === 'game_film' ? 'purple' : 'default'} className="absolute top-2 left-2">
                        {video.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-900 truncate">{video.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-400"><Eye size={11} /> {video.views.toLocaleString()}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><Heart size={11} /> {video.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Awards */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-4">Awards & Achievements</h3>
              <div className="space-y-2">
                {me.awards.map(award => (
                  <div key={award} className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                    <Award size={16} className="text-amber-600 flex-shrink-0" />
                    <span className="text-sm text-gray-800">{award}</span>
                  </div>
                ))}
              </div>
              <h3 className="font-bold text-gray-900 mt-6 mb-4">Academic Achievements</h3>
              <div className="space-y-2">
                {me.academic_achievements.map(ach => (
                  <div key={ach} className="flex items-center gap-3 p-3 bg-[#1B2A4A]/5 rounded-xl">
                    <GraduationCap size={16} className="text-[#1B2A4A] flex-shrink-0" />
                    <span className="text-sm text-gray-800">{ach}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Measurements, Score, Contact */}
        <div className="space-y-6">
          {/* ProspX Score */}
          <Card>
            <CardContent>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#1B2A4A] flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-black text-white">{me.prospx_score}</span>
                </div>
                <p className="font-bold text-gray-900">ProspX Score</p>
                <p className="text-xs text-gray-500 mb-4">Top 5% in your sport</p>
                <div className="space-y-2">
                  {[
                    { label: 'Athletic Performance', val: 92 },
                    { label: 'Academic Achievement', val: 96 },
                    { label: 'Profile Activity', val: 88 },
                    { label: 'Video Engagement', val: 90 },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">{s.label}</span>
                        <span className="font-semibold text-gray-700">{s.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-[#1B2A4A]/50" style={{ width: `${s.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Measurements */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-4">Measurements</h3>
              <div className="space-y-3">
                {[
                  { label: 'Height', value: me.height },
                  { label: 'Weight', value: me.weight },
                  { label: 'GPA', value: me.gpa.toString() },
                  { label: 'Graduation', value: me.graduation_year.toString() },
                ].map(m => (
                  <div key={m.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{m.label}</span>
                    <span className="text-sm font-bold text-gray-900">{m.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement stats */}
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-900 mb-4">Engagement</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Profile Views', value: '1,247', icon: Eye },
                  { label: 'Video Views', value: '3,892', icon: Play },
                  { label: 'Coach Saves', value: '23', icon: Star },
                  { label: 'Connections', value: '18', icon: TrendingUp },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 bg-gray-50 rounded-xl">
                    <s.icon size={16} className="text-[#C9A96E] mx-auto mb-1" />
                    <p className="text-lg font-black text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
