'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Eye, MessageSquare, TrendingUp, Users, CheckCircle2, BarChart3 } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const monthlyActivity = [
  { month: 'Jul', views: 89, contacts: 12, offers: 1 },
  { month: 'Aug', views: 124, contacts: 18, offers: 2 },
  { month: 'Sep', views: 156, contacts: 22, offers: 1 },
  { month: 'Oct', views: 203, contacts: 31, offers: 3 },
  { month: 'Nov', views: 312, contacts: 45, offers: 2 },
  { month: 'Dec', views: 189, contacts: 28, offers: 4 },
]

const stateData = [
  { state: 'GA', count: 12 },
  { state: 'TX', count: 10 },
  { state: 'FL', count: 9 },
  { state: 'CA', count: 8 },
  { state: 'IL', count: 6 },
  { state: 'OH', count: 5 },
]

const pipelineDist = [
  { name: 'Interested', value: 12, color: '#94a3b8' },
  { name: 'Evaluating', value: 8, color: '#3b82f6' },
  { name: 'Contacted', value: 6, color: '#8b5cf6' },
  { name: 'Visiting', value: 3, color: '#f59e0b' },
  { name: 'Offered', value: 2, color: '#10b981' },
]

export default function CoachAnalytics() {
  return (
    <DashboardLayout role="coach" title="Recruiting Analytics" subtitle="Insights from your recruiting activity">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Profile Views Given" value="1,073" change="42% vs last cycle" positive icon={Eye} iconColor="bg-[#1B2A4A]/5 text-[#1B2A4A]" />
        <StatCard title="Total Contacts" value="156" change="18 this month" positive icon={MessageSquare} iconColor="bg-purple-50 text-purple-600" />
        <StatCard title="Response Rate" value="73%" change="up 8 pts" positive icon={TrendingUp} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard title="Offers Extended" value="13" change="3 accepted" positive icon={CheckCircle2} iconColor="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent>
            <h3 className="font-bold text-gray-900 mb-4">Monthly Activity</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Bar dataKey="views" fill="#dbeafe" radius={[4, 4, 0, 0]} name="Profile Views" />
                <Bar dataKey="contacts" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Contacts Made" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-bold text-gray-900 mb-4">Pipeline Distribution</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={pipelineDist} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {pipelineDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {pipelineDist.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span className="text-xs text-gray-600">{d.name}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h3 className="font-bold text-gray-900 mb-4">Prospects by State</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={stateData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis dataKey="state" type="category" tick={{ fontSize: 11, fill: '#9ca3af' }} width={28} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Prospects" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
