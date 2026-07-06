'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AthleteCard } from '@/components/shared/athlete-card'
import { mockAthletes } from '@/lib/mock-data'
import { Zap, Send, Target, TrendingUp, FileText } from 'lucide-react'
import { useState } from 'react'

type Message = { role: 'user' | 'ai'; content: string }

const initialMessages: Message[] = [
  {
    role: 'ai',
    content: "Hello Coach Miller! I'm your AI Recruiting Assistant. I've analyzed your roster needs and the current prospect pool.\n\n**Top finding:** Marcus Johnson (94 ProspX Score, PG) is an exceptional fit for your Point Guard need. He has a 3.8 GPA, 22.4 PPG, and 7.1 APG — exactly what your system requires.\n\n**This week:** 5 new athletes matching your D1 PG criteria joined ProspX.\n\nWhat would you like to explore today?",
  },
]

const quickPrompts = [
  'Who are the top PG prospects for my program?',
  'Generate a scouting report for Marcus Johnson',
  'What\'s our current recruiting class grade?',
  'Find athletes similar to our last commit',
]

export default function CoachAI() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  const responses: Record<string, string> = {
    default: "Based on your program's needs and recruiting history, I'd recommend focusing on the Southeast region this cycle. There are 12 prospects matching your criteria with ProspX scores above 85. Want me to generate a ranked list?",
    "who are the top pg prospects for my program?": "Here are your top Point Guard matches based on your system requirements:\n\n🥇 **Marcus Johnson** (Score: 94) — Atlanta, GA · 6'3\" · 3.8 GPA · 22.4 PPG, 7.1 APG\n🥈 **DeShawn Miles** (Score: 89) — Houston, TX · 6'1\" · 3.5 GPA · 18.2 PPG, 8.3 APG\n🥉 **Chris Park** (Score: 86) — Charlotte, NC · 6'2\" · 3.7 GPA · 20.1 PPG, 6.5 APG\n\nMarcus Johnson is the clear #1 — would you like me to draft an outreach message to him?",
    "generate a scouting report for marcus johnson": "**Scouting Report: Marcus Johnson**\n\n**Overall Grade: A+**\n\n✅ **Strengths:**\n- Elite court vision (7.1 APG, top 3% nationally)\n- Efficient scorer (48.3% FG)\n- Academic excellence (3.8 GPA)\n- Leadership (team captain, All-State)\n\n⚠️ **Areas to Monitor:**\n- 3-point shooting (38.1% — developing)\n- Size vs. D1 competition (6'3\")\n\n📊 **Fit Score for Michigan: 96/100**\n\nRecommendation: **Offer immediately.** Multiple D1 programs are in pursuit.",
  }

  const handleSend = (msg?: string) => {
    const text = msg || input.trim()
    if (!text) return
    const aiResponse = responses[text.toLowerCase()] || responses['default']
    setMessages(m => [...m, { role: 'user', content: text }, { role: 'ai', content: aiResponse }])
    setInput('')
  }

  return (
    <DashboardLayout role="coach" title="AI Recruiting Assistant" subtitle="Powered by ProspX AI">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 180px)' }}>
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gradient-to-r from-gray-900 to-gray-800">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">ProspX AI for Coaches</p>
                <p className="text-xs text-gray-400">Recruiting intelligence at your fingertips</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <Zap size={12} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-sm ${msg.role !== 'user' ? 'flex-1' : ''}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === 'user' ? 'bg-[#1B2A4A] text-white rounded-br-sm' : 'bg-gray-50 text-gray-800 rounded-bl-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-gray-50 flex gap-2 overflow-x-auto">
              {quickPrompts.map(p => (
                <button key={p} onClick={() => handleSend(p)} className="flex-shrink-0 text-xs bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">{p}</button>
              ))}
            </div>
            <form onSubmit={e => { e.preventDefault(); handleSend() }} className="p-4 border-t border-gray-100 flex gap-3">
              <input className="flex-1 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="Ask anything about recruiting..." value={input} onChange={e => setInput(e.target.value)} />
              <Button type="submit" size="sm" disabled={!input.trim()}><Send size={15} /></Button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-[#1B2A4A]" />
                <h3 className="font-bold text-gray-900">AI Top Matches</h3>
              </div>
              <div className="space-y-2">
                {mockAthletes.slice(0, 3).map(a => (
                  <AthleteCard key={a.id} athlete={a} compact showActions={false} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} className="text-purple-600" />
                <h3 className="font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleSend("Generate a scouting report for Marcus Johnson")}>
                  <FileText size={14} /> Generate Scouting Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleSend("Who are the top PG prospects for my program?")}>
                  <Target size={14} /> Find Position Matches
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleSend("What's our current recruiting class grade?")}>
                  <TrendingUp size={14} /> Class Grade Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
