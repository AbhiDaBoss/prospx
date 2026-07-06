'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockAthletes, mockColleges } from '@/lib/mock-data'
import { Zap, Send, TrendingUp, Target, School, Star, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const me = mockAthletes[0]

const quickPrompts = [
  'What colleges are the best fit for me?',
  'How can I improve my ProspX score?',
  'What are coaches looking for in my position?',
  'Analyze my recruiting chances at D1 schools',
  'What events should I attend this year?',
]

const aiCollegeMatches = [
  { name: 'University of Michigan', fit: 96, division: 'D1', reasons: ['GPA match', 'Position need', 'Style fit'] },
  { name: 'Duke University', fit: 91, division: 'D1', reasons: ['Academic prestige', 'Elite program', 'Conference fit'] },
  { name: 'Villanova', fit: 87, division: 'D1', reasons: ['Playing time', 'Academic fit', 'Location'] },
  { name: 'Butler University', fit: 82, division: 'D1', reasons: ['Realistic target', 'Strong program', 'Coach interest'] },
]

type Message = { role: 'user' | 'ai'; content: string; timestamp: string }

const initialMessages: Message[] = [
  {
    role: 'ai',
    content: `Hey Marcus! 👋 I'm your AI Recruiting Assistant. Based on your profile, here's a quick summary:\n\n**ProspX Score: 94/100** — You're in the top 5% of basketball prospects in your class.\n\n**Top opportunities:** Your GPA (3.8), athleticism, and highlight reel position you well for D1 scholarships. Coach Miller from Michigan has viewed your profile 3 times this month — that's a strong signal!\n\n**Key recommendation:** Upload a training clip to boost your profile completeness to 100%. What would you like to explore?`,
    timestamp: new Date().toISOString(),
  },
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')

  const responses: Record<string, string> = {
    default: "Great question! Based on your profile data, I'm analyzing your strengths and opportunities. Your 3.8 GPA combined with 22.4 PPG is a rare combination that D1 programs love. I'd recommend focusing on showcases in the Southeast and Midwest where Michigan and Kentucky scouts frequently attend. Would you like specific event recommendations?",
    'what colleges are the best fit for me?': "Based on your stats (22.4 PPG, 7.1 APG, 3.8 GPA), here are your top college fits:\n\n🏆 **Tier 1 (Realistic D1):**\n- University of Michigan (96% fit)\n- Villanova (87% fit)\n- Butler (82% fit)\n\n⭐ **Tier 2 (Reach D1):**\n- Duke, Kentucky, UNC\n\n**Recommendation:** Focus your energy on Michigan — they have an opening at PG and Coach Miller has already shown serious interest.",
    'how can i improve my prospx score?': "Your current score is 94/100. Here's how to reach 100:\n\n1. **Upload training clips** (+3 points) — coaches love to see your work ethic off the game clock\n2. **Add social media links** (+2 points) — makes your profile more discoverable\n3. **Update your stats** (+1 point) — always keep current season numbers fresh\n\nSmall changes, big impact! Want me to walk you through any of these?",
  }

  const handleSend = (msg?: string) => {
    const text = msg || input.trim()
    if (!text) return

    const userMsg: Message = { role: 'user', content: text, timestamp: new Date().toISOString() }
    const aiResponse = responses[text.toLowerCase()] || responses['default']
    const aiMsg: Message = { role: 'ai', content: aiResponse, timestamp: new Date().toISOString() }

    setMessages(m => [...m, userMsg, aiMsg])
    setInput('')
  }

  return (
    <DashboardLayout role="athlete" title="AI Recruiting Assistant" subtitle="Powered by ProspX AI">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 180px)' }}>
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B2A4A] to-purple-600 flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">ProspX AI</p>
                <p className="text-xs text-gray-500">Your personal recruiting advisor</p>
              </div>
              <Badge variant="success" className="ml-auto">Online</Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <Zap size={12} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-sm ${msg.role === 'user' ? '' : 'flex-1'}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#1B2A4A] text-white rounded-br-sm'
                        : 'bg-gray-50 text-gray-800 rounded-bl-sm'
                    }`}>
                      {msg.content}
                    </div>
                    <p className={`text-xs text-gray-400 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      {new Date(msg.timestamp).toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick prompts */}
            <div className="px-4 py-2 border-t border-gray-50 flex gap-2 overflow-x-auto">
              {quickPrompts.slice(0, 3).map(p => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="flex-shrink-0 text-xs bg-[#1B2A4A]/5 text-[#1B2A4A] px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={e => { e.preventDefault(); handleSend() }} className="p-4 border-t border-gray-100 flex gap-3">
              <input
                className="flex-1 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                placeholder="Ask me anything about your recruiting..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <Button type="submit" size="sm" disabled={!input.trim()}>
                <Send size={15} />
              </Button>
            </form>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-6">
          {/* College matches */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-[#1B2A4A]" />
                <h3 className="font-bold text-gray-900">AI College Matches</h3>
              </div>
              <div className="space-y-3">
                {aiCollegeMatches.map((match) => (
                  <div key={match.name} className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-gray-900">{match.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-black text-[#1B2A4A]">{match.fit}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-200 mb-2">
                      <div className="h-full rounded-full bg-[#1B2A4A]/50 transition-all" style={{ width: `${match.fit}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {match.reasons.map(r => <Badge key={r} variant="blue" className="text-xs">{r}</Badge>)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recruiting score breakdown */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-emerald-600" />
                <h3 className="font-bold text-gray-900">Score Breakdown</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Athletic Performance', score: 92, max: 40 },
                  { label: 'Academics', score: 38, max: 40 },
                  { label: 'Profile Activity', score: 14, max: 20 },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{s.label}</span>
                      <span className="font-bold text-gray-900">{s.score}/{s.max}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(s.score / s.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
