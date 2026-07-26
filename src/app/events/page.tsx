'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockEvents } from '@/lib/mock-data'
import { Calendar, MapPin, DollarSign, CheckCircle2, Search, Filter } from 'lucide-react'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const typeColors = {
  showcase: 'blue',
  tournament: 'purple',
  camp: 'success',
  combine: 'warning',
} as const

export default function EventsPage() {
  return <Suspense><Events /></Suspense>
}

function Events() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') ?? 'athlete') as 'athlete' | 'coach'
  const [events, setEvents] = useState(mockEvents)
  const [filter, setFilter] = useState('')

  const toggleRegister = (id: string) => {
    setEvents(evs => evs.map(e => e.id === id ? { ...e, registered: !e.registered } : e))
  }

  return (
    <DashboardLayout role={role} title="Events & Camps" subtitle="Showcases, tournaments, and combines near you">
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="Search events..." value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
        <Button variant="outline"><Filter size={15} /> Filter</Button>
      </div>

      {/* Event type tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {['All', 'Showcase', 'Tournament', 'Camp', 'Combine'].map(t => (
          <button key={t} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${t === 'All' ? 'bg-[#1B2A4A] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.filter(e => !filter || e.title.toLowerCase().includes(filter.toLowerCase())).map(event => (
          <Card key={event.id} hover>
            <CardContent>
              <div className="flex items-start justify-between mb-3">
                <Badge variant={typeColors[event.type]}>{event.type}</Badge>
                {event.registered && (
                  <Badge variant="success"><CheckCircle2 size={10} /> Registered</Badge>
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={12} /> {new Date(event.date).toLocaleDateString('en', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} /> {event.location}
                </div>
                {event.price && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <DollarSign size={12} /> ${event.price} registration fee
                  </div>
                )}
              </div>
              {event.description && <p className="text-xs text-gray-500 mb-4 line-clamp-2">{event.description}</p>}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={event.registered ? 'secondary' : 'primary'}
                  className="flex-1"
                  onClick={() => toggleRegister(event.id)}
                >
                  {event.registered ? 'Withdraw' : 'Register'}
                </Button>
                <Button size="sm" variant="outline">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
