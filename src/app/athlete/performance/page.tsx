'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockAthletes } from '@/lib/mock-data'
import { BarChart3, TrendingUp, Plus, ArrowUp, ArrowDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const me = mockAthletes[0]

const monthlyData = [
  { month: 'Aug', ppg: 18.2, apg: 5.4, rpg: 3.8 },
  { month: 'Sep', ppg: 20.1, apg: 6.2, rpg: 4.0 },
  { month: 'Oct', ppg: 19.8, apg: 6.8, rpg: 3.9 },
  { month: 'Nov', ppg: 21.3, apg: 7.0, rpg: 4.1 },
  { month: 'Dec', ppg: 22.4, apg: 7.1, rpg: 4.2 },
]

const physicalData = [
  { category: 'Speed (mph)', value: 18.2, prev: 17.5 },
  { category: 'Vertical (in)', value: 34, prev: 32 },
  { category: 'Bench (lbs)', value: 185, prev: 175 },
  { category: 'Squat (lbs)', value: 265, prev: 250 },
]

export default function Performance() {
  return (
    <DashboardLayout role="athlete" title="Performance Analytics" subtitle="Track your athletic progress over time">
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {Object.entries(me.stats).map(([k, v]) => (
          <Card key={k}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{k}</p>
                  <p className="text-2xl font-black text-gray-900">{v}</p>
                </div>
                <div className="text-xs text-emerald-600 flex items-center gap-0.5 font-medium">
                  <ArrowUp size={12} /> +3.2%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Performance over time */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Stats Trend (Season)</h3>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1"><div className="w-3 h-1 rounded bg-[#1B2A4A]/50" /> PPG</span>
                <span className="flex items-center gap-1"><div className="w-3 h-1 rounded bg-purple-500" /> APG</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Line type="monotone" dataKey="ppg" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} />
                <Line type="monotone" dataKey="apg" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4, fill: '#7c3aed' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Physical testing */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Physical Testing</h3>
              <Button size="sm" variant="outline"><Plus size={14} /> Log Test</Button>
            </div>
            <div className="space-y-4">
              {physicalData.map(d => {
                const improved = d.value > d.prev
                return (
                  <div key={d.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{d.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{d.value}</span>
                        <span className={`text-xs flex items-center gap-0.5 ${improved ? 'text-emerald-600' : 'text-red-500'}`}>
                          {improved ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                          {Math.abs(d.value - d.prev)}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-[#1B2A4A]/50 transition-all" style={{ width: `${(d.value / (d.value * 1.3)) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison vs peers */}
      <Card>
        <CardContent>
          <h3 className="font-bold text-gray-900 mb-4">vs. Position Peers (Class of {me.graduation_year})</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { metric: 'PPG', you: 22.4, avg: 17.2 },
              { metric: 'APG', you: 7.1, avg: 5.3 },
              { metric: 'FG%', you: 48.3, avg: 44.1 },
              { metric: 'GPA', you: me.gpa * 10, avg: 33 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Bar dataKey="you" fill="#2563eb" radius={[4, 4, 0, 0]} name="You" />
              <Bar dataKey="avg" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Average" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2 text-xs">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#1B2A4A]/50" /> You</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-gray-200" /> Position Average</span>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
