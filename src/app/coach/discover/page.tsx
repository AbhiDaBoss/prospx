'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockAthletes } from '@/lib/mock-data'
import { calculateOverallGrade, getGradeBg, getKeyAttributes } from '@/lib/utils'
import {
  X, Heart, Star, ChevronLeft, ChevronRight, Play, GraduationCap,
  MapPin, Award, BookOpen, Video, Dumbbell, CheckCircle2, BarChart3
} from 'lucide-react'
import { useState, useRef } from 'react'
import type { Athlete } from '@/types'

const SLIDES = ['Overview', 'Academics', 'Videos', 'Stats', 'Training', 'Achievements', 'Contact'] as const
type Slide = typeof SLIDES[number]

function AthleteSwipeCard({ athlete, onSwipe }: { athlete: Athlete; onSwipe: (dir: 'left' | 'right') => void }) {
  const [slide, setSlide] = useState<Slide>('Overview')
  const [dragging, setDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const startX = useRef(0)
  const grade = calculateOverallGrade(athlete)
  const attrs = getKeyAttributes(athlete)

  const slideIndex = SLIDES.indexOf(slide)

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    startX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    setDragX(e.clientX - startX.current)
  }

  const handleMouseUp = () => {
    if (Math.abs(dragX) > 100) {
      onSwipe(dragX > 0 ? 'right' : 'left')
    }
    setDragging(false)
    setDragX(0)
  }

  const rotation = dragX * 0.05
  const opacity = Math.max(0, 1 - Math.abs(dragX) / 300)

  return (
    <div
      className="relative w-full max-w-sm mx-auto select-none"
      style={{
        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
        transition: dragging ? 'none' : 'transform 0.3s ease',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Swipe indicators */}
      {dragX > 40 && (
        <div className="absolute top-8 left-8 z-10 rotate-[-20deg] border-4 border-emerald-400 rounded-xl px-4 py-2" style={{ opacity: Math.min(1, dragX / 100) }}>
          <span className="text-emerald-400 font-black text-2xl">SAVE</span>
        </div>
      )}
      {dragX < -40 && (
        <div className="absolute top-8 right-8 z-10 rotate-[20deg] border-4 border-red-400 rounded-xl px-4 py-2" style={{ opacity: Math.min(1, -dragX / 100) }}>
          <span className="text-red-400 font-black text-2xl">PASS</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden" style={{ opacity }}>
        {/* Card header / cover */}
        <div className="relative h-64 bg-gradient-to-br from-[#1B2A4A] to-[#131f36]">
          {athlete.avatar_url && (
            <img src={athlete.avatar_url} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Grade */}
          <div className={`absolute top-4 right-4 text-xl font-black px-3 py-1.5 rounded-xl ring-2 ring-inset ${getGradeBg(grade)}`}>
            {grade}
          </div>

          {/* Slide tabs */}
          <div className="absolute top-4 left-0 right-0 flex justify-center">
            <div className="flex gap-1">
              {SLIDES.map((s) => (
                <button
                  key={s}
                  onClick={(e) => { e.stopPropagation(); setSlide(s) }}
                  className={`h-1 rounded-full transition-all ${s === slide ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            onClick={(e) => { e.stopPropagation(); if (slideIndex > 0) setSlide(SLIDES[slideIndex - 1]) }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            onClick={(e) => { e.stopPropagation(); if (slideIndex < SLIDES.length - 1) setSlide(SLIDES[slideIndex + 1]) }}
          >
            <ChevronRight size={16} />
          </button>

          {/* Slide label */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-1.5">
                  {athlete.name}
                  {athlete.verified && <CheckCircle2 size={16} className="text-blue-300" />}
                </h2>
                <p className="text-[#C9A96E]/60 text-sm">{athlete.positions[0]} · {athlete.sport}</p>
              </div>
              <Badge className="bg-white/20 text-white border-0 text-xs">{slide}</Badge>
            </div>
          </div>
        </div>

        {/* Card content - changes by slide */}
        <div className="p-5 min-h-72">
          {slide === 'Overview' && (
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="flex items-center gap-1 text-sm text-gray-600"><MapPin size={13} /> {athlete.city}, {athlete.state}</span>
                <span className="flex items-center gap-1 text-sm text-gray-600"><GraduationCap size={13} /> Class of {athlete.graduation_year}</span>
                <span className="text-sm text-gray-600">{athlete.school}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {attrs.map(a => <Badge key={a} variant="purple">{a}</Badge>)}
                <Badge variant="blue">ProspX {athlete.prospx_score}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-lg font-black text-gray-900">{athlete.height}</p>
                  <p className="text-xs text-gray-500">Height</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-lg font-black text-gray-900">{athlete.weight}</p>
                  <p className="text-xs text-gray-500">Weight</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-lg font-black text-gray-900">{athlete.gpa}</p>
                  <p className="text-xs text-gray-500">GPA</p>
                </div>
              </div>
              {athlete.bio && <p className="text-sm text-gray-600 mt-4 leading-relaxed">{athlete.bio}</p>}
            </div>
          )}

          {slide === 'Academics' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1B2A4A]/5 flex items-center justify-center">
                  <BookOpen size={16} className="text-[#1B2A4A]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Academic Profile</p>
                  <p className="text-xs text-gray-500">{athlete.school}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 bg-[#1B2A4A]/5 rounded-xl text-center">
                  <p className="text-3xl font-black text-[#1B2A4A]">{athlete.gpa}</p>
                  <p className="text-xs text-[#C9A96E]">GPA</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl text-center">
                  <p className="text-3xl font-black text-emerald-600">{athlete.graduation_year}</p>
                  <p className="text-xs text-emerald-500">Grad Year</p>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Academic Achievements</h4>
              <div className="space-y-2">
                {athlete.academic_achievements.map(a => (
                  <div key={a} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <GraduationCap size={13} className="text-[#C9A96E] flex-shrink-0" />
                    <span className="text-xs text-gray-700">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide === 'Videos' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Video size={16} className="text-purple-600" />
                <p className="font-bold text-gray-900">Highlight Videos</p>
              </div>
              <div className="space-y-3">
                {athlete.highlight_videos.map(v => (
                  <div key={v.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-200 relative flex-shrink-0">
                      {v.thumbnail_url && <img src={v.thumbnail_url} alt="" className="w-full h-full object-cover" />}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play size={12} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{v.title}</p>
                      <p className="text-xs text-gray-400">{v.views.toLocaleString()} views · {v.likes} likes</p>
                    </div>
                    <Badge variant={v.type === 'highlight' ? 'blue' : v.type === 'game_film' ? 'purple' : 'default'}>
                      {v.type.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide === 'Stats' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={16} className="text-emerald-600" />
                <p className="font-bold text-gray-900">Athletic Stats</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(athlete.stats).map(([k, v]) => (
                  <div key={k} className="p-3 bg-gray-50 rounded-xl text-center">
                    <p className="text-xl font-black text-gray-900">{v}</p>
                    <p className="text-xs text-gray-500">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide === 'Training' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell size={16} className="text-amber-600" />
                <p className="font-bold text-gray-900">Training & Development</p>
              </div>
              {athlete.highlight_videos.filter(v => v.type === 'training').length > 0 ? (
                athlete.highlight_videos.filter(v => v.type === 'training').map(v => (
                  <div key={v.id} className="p-3 rounded-xl bg-amber-50 mb-3">
                    <div className="flex items-center gap-2">
                      <Play size={14} className="text-amber-600" />
                      <p className="text-sm font-medium text-amber-900">{v.title}</p>
                    </div>
                    <p className="text-xs text-amber-600 mt-1">{v.views.toLocaleString()} views</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">No training clips uploaded yet</p>
              )}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs font-semibold text-gray-700 mb-2">Physical Attributes</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-black text-gray-900">{athlete.height}</p>
                    <p className="text-xs text-gray-500">Height</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-gray-900">{athlete.weight}</p>
                    <p className="text-xs text-gray-500">Weight</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {slide === 'Achievements' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} className="text-amber-500" />
                <p className="font-bold text-gray-900">Awards & Achievements</p>
              </div>
              <div className="space-y-2">
                {athlete.awards.map(a => (
                  <div key={a} className="flex items-center gap-2.5 p-3 bg-amber-50 rounded-xl">
                    <Star size={13} className="text-amber-500 fill-amber-500 flex-shrink-0" />
                    <span className="text-sm text-gray-800">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide === 'Contact' && (
            <div>
              <p className="font-bold text-gray-900 mb-4">Contact & Recruiting Info</p>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">School</p>
                  <p className="text-sm font-semibold text-gray-900">{athlete.school}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-semibold text-gray-900">{athlete.city}, {athlete.state}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Recruiting Status</p>
                  <p className="text-sm font-semibold text-emerald-600 capitalize">{athlete.recruiting_status}</p>
                </div>
                {Object.entries(athlete.social_links).length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Social</p>
                    {Object.entries(athlete.social_links).map(([k, v]) => (
                      <p key={k} className="text-sm font-semibold text-[#1B2A4A]">{v}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CoachDiscover() {
  const [index, setIndex] = useState(0)
  const [saved, setSaved] = useState<string[]>([])
  const [passed, setPassed] = useState<string[]>([])
  const [history, setHistory] = useState<Array<{ id: string; dir: 'left' | 'right' }>>([])

  const athletes = mockAthletes.filter(a => !saved.includes(a.id) && !passed.includes(a.id))
  const current = athletes[0]

  const handleSwipe = (dir: 'left' | 'right') => {
    if (!current) return
    setHistory(h => [...h, { id: current.id, dir }])
    if (dir === 'right') setSaved(s => [...s, current.id])
    else setPassed(p => [...p, current.id])
  }

  const handleUndo = () => {
    const last = history[history.length - 1]
    if (!last) return
    setHistory(h => h.slice(0, -1))
    if (last.dir === 'right') setSaved(s => s.filter(id => id !== last.id))
    else setPassed(p => p.filter(id => id !== last.id))
  }

  return (
    <DashboardLayout role="coach" title="Discover Athletes" subtitle="Tinder-style prospect discovery">
      <div className="max-w-xl mx-auto">
        {/* Header stats */}
        <div className="flex gap-4 justify-center mb-8">
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-600">{saved.length}</p>
            <p className="text-xs text-gray-500">Saved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-red-400">{passed.length}</p>
            <p className="text-xs text-gray-500">Passed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-[#1B2A4A]">{athletes.length}</p>
            <p className="text-xs text-gray-500">Remaining</p>
          </div>
        </div>

        {/* Swipe hint */}
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full border-2 border-red-300 flex items-center justify-center">
              <X size={16} className="text-red-400" />
            </div>
            <span className="text-xs text-gray-400">Swipe left to pass</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">Swipe right to save</span>
            <div className="w-8 h-8 rounded-full border-2 border-emerald-300 flex items-center justify-center">
              <Heart size={16} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Card stack visual */}
        <div className="relative mb-6">
          {athletes[1] && (
            <div className="absolute inset-0 top-2 left-2 right-2 bg-white rounded-3xl border border-gray-200 shadow-md" />
          )}
          {athletes[2] && (
            <div className="absolute inset-0 top-4 left-4 right-4 bg-white rounded-3xl border border-gray-200 shadow-sm" />
          )}
          {current ? (
            <AthleteSwipeCard athlete={current} onSwipe={handleSwipe} />
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">You&apos;ve seen all prospects</h3>
              <p className="text-sm text-gray-500 mb-6">Check back later for new athletes or adjust your filters.</p>
              <Button variant="outline" onClick={() => { setSaved([]); setPassed([]) }}>Start Over</Button>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-6 items-center">
          <button
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 rounded-full bg-white border-2 border-red-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all shadow-md hover:shadow-lg group"
          >
            <X size={22} className="text-red-400 group-hover:text-red-500" />
          </button>
          <button
            onClick={handleUndo}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft size={16} className="text-gray-400" />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="w-14 h-14 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-md hover:shadow-lg group"
          >
            <Heart size={22} className="text-emerald-400 group-hover:text-emerald-500 group-hover:fill-emerald-200" />
          </button>
        </div>

        {/* Slide nav hint */}
        {current && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Use ← → arrows on the card to navigate through slides
          </p>
        )}

        {/* Saved athletes preview */}
        {saved.length > 0 && (
          <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="text-sm font-bold text-emerald-800 mb-2">Saved Prospects ({saved.length})</p>
            <div className="flex gap-2 flex-wrap">
              {saved.map(id => {
                const a = mockAthletes.find(a => a.id === id)
                return a ? (
                  <div key={id} className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 shadow-sm border border-emerald-100">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-100">
                      {a.avatar_url && <img src={a.avatar_url} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <span className="text-xs font-medium text-gray-800">{a.name.split(' ')[0]}</span>
                  </div>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
