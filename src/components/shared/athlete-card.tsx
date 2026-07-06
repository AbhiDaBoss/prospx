'use client'
import { Athlete } from '@/types'
import { calculateOverallGrade, getGradeBg, getKeyAttributes, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, GraduationCap, Star, Eye, MessageSquare, BookmarkPlus, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface AthleteCardProps {
  athlete: Athlete
  showActions?: boolean
  onSave?: (id: string) => void
  onMessage?: (id: string) => void
  compact?: boolean
}

export function AthleteCard({ athlete, showActions = true, onSave, onMessage, compact }: AthleteCardProps) {
  const grade = calculateOverallGrade(athlete)
  const attrs = getKeyAttributes(athlete)

  if (compact) {
    return (
      <Link href={`/athlete/${athlete.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {athlete.avatar_url && <img src={athlete.avatar_url} alt="" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-gray-900 truncate">{athlete.name}</p>
            {athlete.verified && <CheckCircle2 size={12} className="text-[#C9A96E] flex-shrink-0" />}
          </div>
          <p className="text-xs text-gray-500">{athlete.sport} · {athlete.state} · {athlete.graduation_year}</p>
        </div>
        <span className={cn('text-sm font-bold px-2 py-0.5 rounded-lg ring-1 ring-inset', getGradeBg(grade))}>{grade}</span>
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden">
      {/* Cover / Avatar */}
      <div className="h-24 bg-gradient-to-r from-[#1B2A4A] to-[#243662] relative">
        <div className="absolute bottom-0 left-5 translate-y-1/2 w-16 h-16 rounded-2xl border-2 border-white overflow-hidden bg-gray-100 shadow-md">
          {athlete.avatar_url
            ? <img src={athlete.avatar_url} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-400">{athlete.name[0]}</div>
          }
        </div>
        {/* Grade badge */}
        <div className={cn('absolute top-3 right-3 text-lg font-black px-3 py-1 rounded-xl ring-2 ring-inset', getGradeBg(grade))}>
          {grade}
        </div>
      </div>

      <div className="pt-10 p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-gray-900">{athlete.name}</h3>
              {athlete.verified && <CheckCircle2 size={14} className="text-[#C9A96E]" />}
            </div>
            <p className="text-sm text-gray-500">{athlete.positions.join(' · ')}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-gray-700">{athlete.prospx_score}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={12} /> {athlete.city}, {athlete.state}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <GraduationCap size={12} /> {athlete.graduation_year}
          </div>
          <Badge variant="blue">{athlete.sport}</Badge>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 p-3 bg-gray-50 rounded-xl">
          <div className="text-center">
            <p className="text-xs text-gray-500">GPA</p>
            <p className="text-sm font-bold text-gray-900">{athlete.gpa}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Height</p>
            <p className="text-sm font-bold text-gray-900">{athlete.height}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Weight</p>
            <p className="text-sm font-bold text-gray-900">{athlete.weight}</p>
          </div>
        </div>

        {/* Key attributes */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {attrs.map((attr) => (
            <Badge key={attr} variant="purple">{attr}</Badge>
          ))}
        </div>

        {showActions && (
          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={() => onMessage?.(athlete.id)} className="flex-1">
              <MessageSquare size={14} /> Message
            </Button>
            <Button size="sm" variant="outline" onClick={() => onSave?.(athlete.id)}>
              <BookmarkPlus size={14} />
            </Button>
            <Link href={`/athlete/${athlete.id}`}>
              <Button size="sm" variant="ghost">
                <Eye size={14} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
