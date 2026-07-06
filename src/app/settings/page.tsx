'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Bell, Shield, CreditCard, User, Palette, Globe, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

export default function Settings() {
  const [tab, setTab] = useState('profile')

  return (
    <DashboardLayout role="athlete" title="Settings" subtitle="Manage your account preferences">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-3">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${tab === t.id ? 'bg-[#1B2A4A]/5 text-[#1B2A4A]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <t.icon size={16} />
                  {t.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {tab === 'profile' && (
            <Card>
              <CardContent>
                <h2 className="font-bold text-gray-900 mb-6">Profile Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <Button size="sm">Change Photo</Button>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" defaultValue="Marcus" />
                    <Input label="Last Name" defaultValue="Johnson" />
                  </div>
                  <Input label="Email" defaultValue="marcus@example.com" type="email" />
                  <Input label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Bio</label>
                    <textarea className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" rows={4} defaultValue="Elite point guard with exceptional court vision and leadership." />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === 'notifications' && (
            <Card>
              <CardContent>
                <h2 className="font-bold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Coach views your profile', desc: 'Get notified when a coach views your profile', on: true },
                    { label: 'New messages', desc: 'Real-time notifications for direct messages', on: true },
                    { label: 'Coach saves your profile', desc: 'Know when a coach bookmarks you', on: true },
                    { label: 'New followers', desc: 'When someone follows your profile', on: false },
                    { label: 'Event reminders', desc: '24-hour reminder for registered events', on: true },
                    { label: 'Weekly recruiting summary', desc: 'Weekly email digest of your activity', on: false },
                  ].map(n => (
                    <div key={n.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{n.label}</p>
                        <p className="text-xs text-gray-500">{n.desc}</p>
                      </div>
                      <button className={`relative w-11 h-6 rounded-full transition-colors ${n.on ? 'bg-[#1B2A4A]' : 'bg-gray-200'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${n.on ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {tab === 'billing' && (
            <Card>
              <CardContent>
                <h2 className="font-bold text-gray-900 mb-6">Billing & Subscription</h2>
                <div className="p-4 bg-[#1B2A4A]/5 rounded-2xl border border-blue-100 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="blue">Athlete Pro</Badge>
                      <p className="font-bold text-gray-900 mt-2">$19/month</p>
                      <p className="text-sm text-gray-500">Next billing: January 1, 2026</p>
                    </div>
                    <CheckCircle2 size={28} className="text-[#C9A96E]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">Manage Payment Method</Button>
                  <Button variant="outline" className="w-full justify-start">View Billing History</Button>
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === 'privacy' && (
            <Card>
              <CardContent>
                <h2 className="font-bold text-gray-900 mb-6">Privacy & Security</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Profile Visibility', desc: 'Who can see your full profile', value: 'Coaches & Athletes' },
                    { label: 'Contact Info Visibility', desc: 'Who can see your contact details', value: 'Coaches only' },
                    { label: 'Video Visibility', desc: 'Who can watch your highlight videos', value: 'Everyone' },
                  ].map(p => (
                    <div key={p.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{p.label}</p>
                        <p className="text-xs text-gray-500">{p.desc}</p>
                      </div>
                      <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] bg-white">
                        <option>{p.value}</option>
                      </select>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button>Update Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
