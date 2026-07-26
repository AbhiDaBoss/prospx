'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockMessages, mockCoaches } from '@/lib/mock-data'
import { Send, Paperclip, Search, CheckCheck, Circle } from 'lucide-react'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const conversations = [
  { id: 'c1', name: 'Coach David Miller', school: 'U of Michigan', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80', lastMsg: 'Perfect! We\'ll get everything set up.', time: '2h', unread: 2 },
  { id: 'c2', name: 'Coach Sarah Thompson', school: 'Stanford', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80', lastMsg: 'We\'d love to have you on campus.', time: '1d', unread: 0 },
  { id: 'c3', name: 'Coach Marcus Green', school: 'Kentucky', avatar: '', lastMsg: 'Great highlights! Lets connect.', time: '3d', unread: 1 },
]

export default function MessagesPage() {
  return <Suspense><Messages /></Suspense>
}

function Messages() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') ?? 'athlete') as 'athlete' | 'coach'
  const [active, setActive] = useState('c1')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(mockMessages)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages(m => [...m, {
      id: Date.now().toString(),
      sender_id: 'u1',
      receiver_id: 'cu1',
      content: input.trim(),
      read: false,
      created_at: new Date().toISOString(),
    }])
    setInput('')
  }

  const activeConv = conversations.find(c => c.id === active)

  return (
    <DashboardLayout role={role} title="Messages" subtitle={role === 'coach' ? 'Connect with prospects directly' : 'Connect with coaches directly'}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
        <div className="flex h-full">
          {/* Conversation list */}
          <div className="w-72 border-r border-gray-100 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="Search messages..." />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setActive(conv.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 ${active === conv.id ? 'bg-[#1B2A4A]/5' : ''}`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      {conv.avatar ? <img src={conv.avatar} alt="" className="w-full h-full object-cover" /> : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-400">{conv.name[0]}</div>
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 truncate">{conv.name}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{conv.school}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMsg}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{conv.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          {activeConv ? (
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100">
                  {activeConv.avatar && <img src={activeConv.avatar} alt="" className="w-full h-full object-cover" />}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{activeConv.name}</p>
                  <p className="text-xs text-gray-400">{activeConv.school}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map(msg => {
                  const isMe = msg.sender_id === 'u1'
                  const time = new Date(msg.created_at).toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {!isMe && (
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 mr-2 mt-1">
                          {activeConv.avatar && <img src={activeConv.avatar} alt="" className="w-full h-full object-cover" />}
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          isMe ? 'bg-[#1B2A4A] text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                        }`}>
                          {msg.content}
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-xs text-gray-400">{time}</span>
                          {isMe && <CheckCheck size={12} className={msg.read ? 'text-[#C9A96E]' : 'text-gray-300'} />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex gap-3 items-end">
                <button type="button" className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0">
                  <Paperclip size={16} className="text-gray-400" />
                </button>
                <div className="flex-1">
                  <input
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                </div>
                <Button type="submit" size="sm" disabled={!input.trim()}>
                  <Send size={15} />
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400">Select a conversation</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
