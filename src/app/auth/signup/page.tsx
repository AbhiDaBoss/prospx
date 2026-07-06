'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trophy, Mail, Lock, User } from 'lucide-react'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SPORTS } from '@/lib/utils'

function SignUpForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [role, setRole] = useState<'athlete' | 'coach'>((params.get('role') as 'athlete' | 'coach') || 'athlete')
  const [step, setStep] = useState(1)

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) { setStep(2); return }
    router.push(role === 'athlete' ? '/athlete' : '/coach')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#1B2A4A] flex items-center justify-center">
              <Trophy size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ProspX</span>
          </Link>
          <h1 className="text-2xl font-black text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-500 mt-1">Step {step} of 2</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 h-1.5 rounded-full bg-[#1B2A4A]" />
          <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-[#1B2A4A]' : 'bg-gray-200'}`} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* Role toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            {(['athlete', 'coach'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${role === r ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
              >
                {r === 'athlete' ? 'Student Athlete' : 'Coach / Recruiter'}
              </button>
            ))}
          </div>

          <form onSubmit={handleNext} className="space-y-4">
            {step === 1 ? (
              <>
                <Input label="Full Name" placeholder="Your full name" icon={<User size={16} />} required />
                <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail size={16} />} required />
                <Input label="Password" type="password" placeholder="Minimum 8 characters" icon={<Lock size={16} />} required />
                {role === 'athlete' && (
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Sport</label>
                    <select className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]">
                      {SPORTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                )}
                {role === 'coach' && (
                  <Input label="School / University" placeholder="e.g. University of Michigan" required />
                )}
              </>
            ) : (
              <>
                {role === 'athlete' ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Graduation Year" placeholder="2025" required />
                      <Input label="GPA" placeholder="3.8" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Height" placeholder={`6'2"`} required />
                      <Input label="Weight" placeholder="185 lbs" required />
                    </div>
                    <Input label="City, State" placeholder="Atlanta, GA" required />
                    <Input label="High School" placeholder="Lincoln High School" required />
                  </>
                ) : (
                  <>
                    <Input label="Your Name / Title" placeholder="Head Coach, Assistant Coach..." required />
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Division</label>
                      <select className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]">
                        {['D1', 'D2', 'D3', 'NAIA', 'JUCO'].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Sport</label>
                      <select className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]">
                        {SPORTS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </>
                )}
              </>
            )}
            <Button type="submit" className="w-full" size="lg">
              {step < 2 ? 'Continue' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth" className="text-[#1B2A4A] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignUp() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <SignUpForm />
    </Suspense>
  )
}
