'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockAthletes } from '@/lib/mock-data'
import { Play, Upload, Eye, Heart, Plus, Video, Tag } from 'lucide-react'
import { useState } from 'react'

const me = mockAthletes[0]

export default function VideoHub() {
  const [activeTab, setActiveTab] = useState<'all' | 'highlight' | 'game_film' | 'training'>('all')

  const filtered = activeTab === 'all' ? me.highlight_videos : me.highlight_videos.filter(v => v.type === activeTab)

  return (
    <DashboardLayout role="athlete" title="Video Hub" subtitle="Your highlight reel and game film">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="py-4 text-center"><p className="text-2xl font-black text-gray-900">{me.highlight_videos.length}</p><p className="text-xs text-gray-500">Videos</p></CardContent></Card>
        <Card><CardContent className="py-4 text-center"><p className="text-2xl font-black text-[#1B2A4A]">{me.highlight_videos.reduce((s, v) => s + v.views, 0).toLocaleString()}</p><p className="text-xs text-gray-500">Total Views</p></CardContent></Card>
        <Card><CardContent className="py-4 text-center"><p className="text-2xl font-black text-rose-500">{me.highlight_videos.reduce((s, v) => s + v.likes, 0)}</p><p className="text-xs text-gray-500">Total Likes</p></CardContent></Card>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {(['all', 'highlight', 'game_film', 'training'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${activeTab === t ? 'bg-[#1B2A4A] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
        <Button><Upload size={15} /> Upload Video</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(video => (
          <div key={video.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
            <div className="relative h-44 bg-gray-100">
              {video.thumbnail_url && <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={22} className="text-gray-900 ml-1" />
                </div>
              </div>
              <Badge variant={video.type === 'highlight' ? 'blue' : video.type === 'game_film' ? 'purple' : 'default'} className="absolute top-3 left-3">
                {video.type.replace('_', ' ')}
              </Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">{video.title}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Eye size={12} /> {video.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart size={12} /> {video.likes}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {video.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Upload card */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-[#1B2A4A]/5 transition-all cursor-pointer flex flex-col items-center justify-center p-8 min-h-64 group">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
            <Plus size={22} className="text-gray-400 group-hover:text-[#C9A96E]" />
          </div>
          <p className="font-semibold text-gray-500 group-hover:text-[#1B2A4A] transition-colors">Upload Video</p>
          <p className="text-xs text-gray-400 mt-1">MP4, MOV up to 500MB</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
