'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockAthletes } from '@/lib/mock-data'
import { Download, FileText, CheckCircle2, Award, BarChart3, Video, Mail, MapPin } from 'lucide-react'

const me = mockAthletes[0]

export default function AthleticResume() {
  return (
    <DashboardLayout role="athlete" title="Athletic Resume" subtitle="Auto-generated recruiting resume">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">Last updated: Today</p>
        <div className="flex gap-3">
          <Button variant="outline"><FileText size={15} /> Preview</Button>
          <Button><Download size={15} /> Download PDF</Button>
        </div>
      </div>

      {/* Resume preview */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B2A4A] to-[#243662] p-8 text-white">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/20 flex-shrink-0">
              {me.avatar_url && <img src={me.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black">{me.name}</h1>
                {me.verified && <CheckCircle2 size={18} className="text-[#C9A96E]/60" />}
              </div>
              <p className="text-white/70 mt-1">{me.positions.join(' · ')} · {me.sport}</p>
              <p className="text-[#C9A96E]/60 text-sm mt-0.5">{me.school} · Class of {me.graduation_year}</p>
              <div className="flex items-center gap-3 mt-3 text-sm text-white/70">
                <span className="flex items-center gap-1"><MapPin size={12} /> {me.city}, {me.state}</span>
                <span className="flex items-center gap-1"><Mail size={12} /> athlete@prospx.com</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl font-black">{me.prospx_score}</span>
              </div>
              <p className="text-xs text-[#C9A96E]/60 mt-1">ProspX Score</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Measurements */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-[#1B2A4A]/5 rounded-xl mb-8">
            {[
              { label: 'Height', value: me.height },
              { label: 'Weight', value: me.weight },
              { label: 'GPA', value: me.gpa.toString() },
              { label: 'Positions', value: me.positions[0] },
            ].map(m => (
              <div key={m.label} className="text-center">
                <p className="text-xs text-[#C9A96E] font-semibold">{m.label}</p>
                <p className="font-black text-blue-900">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mb-8">
            <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              <BarChart3 size={14} className="text-[#1B2A4A]" /> Athletic Statistics
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(me.stats).map(([k, v]) => (
                <div key={k} className="p-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-xl font-black text-[#1B2A4A]">{v}</p>
                  <p className="text-xs text-gray-500">{k}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="mb-8">
            <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              <Award size={14} className="text-amber-500" /> Awards & Honors
            </h3>
            <div className="space-y-2">
              {me.awards.map(a => (
                <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Academics */}
          <div className="mb-8">
            <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              <CheckCircle2 size={14} className="text-emerald-500" /> Academic Achievements
            </h3>
            <div className="space-y-2">
              {me.academic_achievements.map(a => (
                <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Video links */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              <Video size={14} className="text-purple-600" /> Highlight Videos
            </h3>
            <div className="space-y-2">
              {me.highlight_videos.map(v => (
                <div key={v.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{v.title}</span>
                  <Badge variant={v.type === 'highlight' ? 'blue' : v.type === 'game_film' ? 'purple' : 'default'}>
                    {v.type.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400">Generated by <span className="font-semibold text-[#1B2A4A]">ProspX</span> · prospx.com</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
