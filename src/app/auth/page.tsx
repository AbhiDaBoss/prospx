'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  const [role, setRole] = useState<'athlete' | 'coach'>('athlete')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(role === 'athlete' ? '/athlete' : '/coach')
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--surface-soft)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white" style={{ background: '#1B2A4A' }}>
        <div className="flex items-center gap-3">
          <Image src="/ProspX.png" alt="ProspX" width={40} height={40} className="" />
          <div>
            <span className="text-lg font-black tracking-wide">PROSP<span style={{ color: '#C9A96E' }}>X</span></span>
            <span className="block text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#C9A96E', marginTop: -2 }}>Recruiting</span>
          </div>
        </div>
        <div>
          <p className="text-4xl font-black leading-tight mb-4">&ldquo;The platform that connected me to my D1 offer.&rdquo;</p>
          <div className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" className="w-10 h-10 rounded-full object-cover" alt="" />
            <div>
              <p className="font-bold text-sm">Marcus Johnson</p>
              <p className="text-xs" style={{ color: '#C9A96E' }}>Now at University of Michigan</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['50K+', 'Athletes'], ['2,400+', 'Coaches'], ['800+', 'Schools'], ['12K+', 'Offers']].map(([v, l]) => (
            <div key={l} className="p-4 rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <p className="text-2xl font-black" style={{ color: '#C9A96E' }}>{v}</p>
              <p className="text-sm text-white/60">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-3 justify-center mb-8">
            <Image src="/ProspX.png" alt="ProspX" width={36} height={36} />
            <div>
              <span className="text-lg font-black tracking-wide" style={{ color: '#1B2A4A' }}>PROSP<span style={{ color: '#C9A96E' }}>X</span></span>
            </div>
          </div>

          <h1 className="text-3xl font-black mb-1" style={{ color: '#1B2A4A' }}>Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
              {(['athlete', 'coach'] as const).map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className="flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all"
                  style={role === r ? { background: '#1B2A4A', color: '#fff' } : { color: '#6b7280' }}>
                  {r === 'athlete' ? 'Athlete' : 'Coach'}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail size={16} />} required />
              <Input label="Password" type="password" placeholder="••••••••" icon={<Lock size={16} />} required />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <a href="#" className="text-sm font-medium hover:underline" style={{ color: '#C9A96E' }}>Forgot password?</a>
              </div>
              <Button type="submit" className="w-full" size="lg">Sign In</Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="font-semibold hover:underline" style={{ color: '#1B2A4A' }}>Sign up free</Link>
            </p>
          </div>

          <div className="mt-4 text-center text-xs text-gray-400 space-x-3">
            <button onClick={() => router.push('/athlete')} className="hover:underline" style={{ color: '#1B2A4A' }}>Demo: Athlete</button>
            <span>·</span>
            <button onClick={() => router.push('/coach')} className="hover:underline" style={{ color: '#1B2A4A' }}>Demo: Coach</button>
          </div>
        </div>
      </div>
    </div>
  )
}
