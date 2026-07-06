'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AthleteCard } from '@/components/shared/athlete-card'
import { mockAthletes } from '@/lib/mock-data'
import { SPORTS, DIVISIONS, STATES } from '@/lib/utils'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function AthleteSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    sport: '', division: '', state: '', gradYear: '', minGpa: '', position: '',
  })
  const [showFilters, setShowFilters] = useState(true)

  const filtered = useMemo(() => {
    return mockAthletes.filter(a => {
      if (query && !a.name.toLowerCase().includes(query.toLowerCase()) && !a.sport.toLowerCase().includes(query.toLowerCase())) return false
      if (filters.sport && a.sport !== filters.sport) return false
      if (filters.state && a.state !== filters.state) return false
      if (filters.gradYear && a.graduation_year !== parseInt(filters.gradYear)) return false
      if (filters.minGpa && a.gpa < parseFloat(filters.minGpa)) return false
      return true
    })
  }, [query, filters])

  const clearFilters = () => setFilters({ sport: '', division: '', state: '', gradYear: '', minGpa: '', position: '' })

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <DashboardLayout role="coach" title="Athlete Search" subtitle="Find your next recruit">
      <div className="flex gap-6">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-[#1B2A4A] hover:underline flex items-center gap-1">
                    <X size={12} /> Clear all
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Sport</label>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    value={filters.sport}
                    onChange={e => setFilters(f => ({ ...f, sport: e.target.value }))}
                  >
                    <option value="">All Sports</option>
                    {SPORTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">State</label>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    value={filters.state}
                    onChange={e => setFilters(f => ({ ...f, state: e.target.value }))}
                  >
                    <option value="">All States</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Graduation Year</label>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    value={filters.gradYear}
                    onChange={e => setFilters(f => ({ ...f, gradYear: e.target.value }))}
                  >
                    <option value="">Any Year</option>
                    {[2025, 2026, 2027, 2028].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Min GPA</label>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    value={filters.minGpa}
                    onChange={e => setFilters(f => ({ ...f, minGpa: e.target.value }))}
                  >
                    <option value="">Any GPA</option>
                    <option value="4.0">4.0+</option>
                    <option value="3.8">3.8+</option>
                    <option value="3.5">3.5+</option>
                    <option value="3.0">3.0+</option>
                    <option value="2.5">2.5+</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Position</label>
                  <Input
                    placeholder="e.g. Point Guard"
                    value={filters.position}
                    onChange={e => setFilters(f => ({ ...f, position: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search bar */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                placeholder="Search by name, sport, school..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              size="md"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{activeFiltersCount}</span>
              )}
            </Button>
          </div>

          {/* Active filter tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(filters).map(([k, v]) => v ? (
                <Badge key={k} variant="blue" className="cursor-pointer" onClick={() => setFilters(f => ({ ...f, [k]: '' }))}>
                  {v} <X size={10} />
                </Badge>
              ) : null)}
            </div>
          )}

          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">{filtered.length}</span> athletes found
            </p>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] bg-white">
              <option>Sort: ProspX Score</option>
              <option>Sort: GPA (High)</option>
              <option>Sort: Graduation Year</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(athlete => (
              <AthleteCard key={athlete.id} athlete={athlete} showActions />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16">
                <Search size={40} className="text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No athletes match your filters</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
