'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import {
  Trophy, Zap, Target, BarChart3, MessageSquare, Video,
  CheckCircle2, ArrowRight, Star, TrendingUp, Shield,
  ChevronRight, Search
} from 'lucide-react'

const features = [
  { icon: Target, title: 'Smart Recruiting Tracker', desc: 'CRM-style pipeline to track every school, coach, and offer in one place.', color: 'bg-[#1B2A4A]/5 text-[#1B2A4A]' },
  { icon: Video, title: 'Video Hub', desc: 'Upload highlights, game film, and training clips. Coaches can view and react instantly.', color: 'bg-[#C9A96E]/10 text-[#A8863E]' },
  { icon: Zap, title: 'AI Recruiting Assistant', desc: 'Get personalized college matches, profile improvement tips, and recruiting chance analysis.', color: 'bg-[#1B2A4A]/5 text-[#1B2A4A]' },
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Track your athletic progress over time with beautiful charts and insights.', color: 'bg-[#C9A96E]/10 text-[#A8863E]' },
  { icon: MessageSquare, title: 'Direct Messaging', desc: 'Connect directly with coaches. No middlemen, just real conversations.', color: 'bg-[#1B2A4A]/5 text-[#1B2A4A]' },
  { icon: Shield, title: 'Verified Profiles', desc: 'Verified badges for athletes, coaches, and schools build trust on the platform.', color: 'bg-[#C9A96E]/10 text-[#A8863E]' },
]

const howItWorks = [
  { step: '01', title: 'Create Your Profile', desc: 'Build a comprehensive recruiting profile with stats, videos, academics, and highlights.' },
  { step: '02', title: 'Get Discovered', desc: 'College coaches browse the platform and find athletes that match their recruiting needs.' },
  { step: '03', title: 'Connect & Communicate', desc: 'Message coaches directly, track interest, and manage your entire recruiting journey.' },
  { step: '04', title: 'Get Recruited', desc: 'Attend visits, receive offers, and make the best decision for your future.' },
]

const testimonials = [
  { name: 'Marcus J.', sport: 'Basketball · Class of 2024', school: 'Now at University of Michigan', text: 'ProspX completely transformed my recruiting process. Within 3 months I had offers from 8 D1 programs.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80' },
  { name: 'Aisha W.', sport: 'Volleyball · Class of 2024', school: 'Now at Stanford', text: "The AI assistant helped me identify schools I hadn't even considered. Best investment in my athletic career.", avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80' },
  { name: 'Coach Miller', sport: 'Head Coach, U of Michigan', school: 'Signed 4 recruits via ProspX', text: 'ProspX saves me 10+ hours a week. The search filters and recruiting board are exactly what I needed.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80' },
]

const stats = [
  { value: '50K+', label: 'Student Athletes' },
  { value: '2,400+', label: 'College Coaches' },
  { value: '800+', label: 'Schools' },
  { value: '12K+', label: 'Offers Made' },
]

const pricing = [
  {
    name: 'Free', price: '$0', period: 'forever',
    desc: 'Get started with essential features.',
    features: ['Basic profile', '3 video uploads', 'College search', 'Limited messaging'],
    cta: 'Get Started', highlight: false,
  },
  {
    name: 'Athlete Pro', price: '$19', period: '/month',
    desc: 'Everything you need to get recruited.',
    features: ['Unlimited videos', 'AI Recruiting Assistant', 'Recruiting tracker', 'PDF resume', 'Priority visibility', 'Performance analytics', 'Event discovery'],
    cta: 'Start Free Trial', highlight: true,
  },
  {
    name: 'Coach Pro', price: '$49', period: '/month',
    desc: 'The ultimate recruiting tool for coaches.',
    features: ['Unlimited athlete search', 'Recruiting board (Kanban)', 'AI athlete matching', 'Bulk messaging', 'Scouting reports', 'Analytics dashboard', 'Verified badge'],
    cta: 'Start Free Trial', highlight: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/ProspX.png" alt="ProspX" width={36} height={36} />
            <div>
              <span className="text-base font-black tracking-wide" style={{ color: '#1B2A4A' }}>
                PROSP<span style={{ color: '#C9A96E' }}>X</span>
              </span>
              <span className="block text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#C9A96E', marginTop: -2 }}>Recruiting</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Pricing', 'Success Stories'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link href="/auth/signup"><Button variant="gold" size="sm">Get Started <ArrowRight size={14} /></Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(27,42,74,0.04) 0%, rgba(255,255,255,0) 60%)' }} />
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: '#1B2A4A' }} />
        <div className="absolute top-40 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: '#C9A96E' }} />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="flex justify-center mb-8">
            <Image src="/ProspX.png" alt="ProspX" width={80} height={80} />
          </div>
          <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight mb-6" style={{ color: '#1B2A4A' }}>
            Get Recruited.<br />
            <span style={{ color: '#C9A96E' }}>Get Discovered.</span><br />
            Get Ahead.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The modern recruiting platform connecting student-athletes with college coaches.
            Transparent, data-driven, and built for the next generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup?role=athlete">
              <Button size="lg" variant="primary" className="w-full sm:w-auto">
                I&apos;m an Athlete <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/auth/signup?role=coach">
              <Button size="lg" variant="gold" className="w-full sm:w-auto">
                I&apos;m a Coach <ChevronRight size={18} />
              </Button>
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">Free to start · No credit card required</p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-10 pt-10 border-t border-gray-100">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black" style={{ color: '#1B2A4A' }}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-white">
            <div className="flex items-center gap-2 px-4 h-10 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4 h-5 rounded-md bg-gray-200 max-w-xs" />
            </div>
            <div className="flex h-72">
              <div className="w-48 border-r border-gray-100 p-4 hidden sm:block" style={{ background: '#1B2A4A' }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 opacity-80"><Image src="/ProspX.png" alt="" width={24} height={24} className="" /></div>
                  <div className="h-3 w-16 rounded" style={{ background: 'rgba(255,255,255,0.2)' }} />
                </div>
                {[70, 90, 60, 80, 55, 75, 65].map((w, i) => (
                  <div key={i} className="flex items-center gap-2 mb-3 px-2 py-1.5 rounded-lg" style={{ background: i === 0 ? 'rgba(201,169,110,0.15)' : 'transparent' }}>
                    <div className="w-4 h-4 rounded" style={{ background: 'rgba(255,255,255,0.15)' }} />
                    <div className="h-2.5 rounded" style={{ width: w + '%', background: i === 0 ? '#C9A96E' : 'rgba(255,255,255,0.15)' }} />
                  </div>
                ))}
              </div>
              <div className="flex-1 p-5 bg-gray-50">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'ProspX Score', val: '94', col: '#1B2A4A' },
                    { label: 'Profile Views', val: '1.2K', col: '#C9A96E' },
                    { label: 'Coach Interest', val: '18', col: '#10b981' },
                  ].map(card => (
                    <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <p className="text-xs text-gray-400">{card.label}</p>
                      <p className="text-2xl font-black mt-0.5" style={{ color: card.col }}>{card.val}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-3">Recent Activity</p>
                    {['Coach Miller viewed your profile', 'New message from Michigan', '2 coaches saved you'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9A96E' }} />
                        <p className="text-xs text-gray-600">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-3">Recruiting Pipeline</p>
                    {[
                      { school: 'U of Michigan', stage: 'Offered', col: 'bg-emerald-50 text-emerald-700' },
                      { school: 'Kentucky', stage: 'Visiting', col: 'bg-[#1B2A4A]/5 text-[#1B2A4A]' },
                      { school: 'Duke', stage: 'Contacted', col: 'bg-amber-50 text-amber-700' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-700">{item.school}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded-md ${item.col}`}>{item.stage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A96E' }}>Platform Features</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: '#1B2A4A' }}>Everything you need to get recruited</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">One platform for athletes to showcase their talent and for coaches to discover their next recruit.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon size={20} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#1B2A4A' }}>{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: '#1B2A4A' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A96E' }}>Simple Process</p>
            <h2 className="text-4xl font-black text-white mb-4">How ProspX Works</h2>
            <p className="text-lg text-white/60">Go from unknown to committed in four steps.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center p-6 rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-lg" style={{ background: '#C9A96E', color: '#1B2A4A' }}>
                  {step.step}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="success-stories" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A96E' }}>Success Stories</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: '#1B2A4A' }}>Athletes & coaches love ProspX</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" style={{ color: '#C9A96E' }} />)}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold flex items-center gap-1.5" style={{ color: '#1B2A4A' }}>
                      {t.name} <CheckCircle2 size={12} style={{ color: '#C9A96E' }} />
                    </p>
                    <p className="text-xs text-gray-500">{t.sport}</p>
                    <p className="text-xs font-medium" style={{ color: '#C9A96E' }}>{t.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Athlete vs Coach */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#1B2A4A' }}>
              <TrendingUp size={22} className="text-white" />
            </div>
            <h3 className="text-2xl font-black mb-3" style={{ color: '#1B2A4A' }}>For Athletes</h3>
            <p className="text-gray-500 mb-6">Build your recruiting profile, get in front of the right coaches, and manage your entire recruiting journey.</p>
            <ul className="space-y-3 mb-8">
              {['AI-powered college matching', 'Video highlight hub', 'Coach discovery & search', 'Recruiting pipeline tracker', 'Auto-generated PDF resume', 'ProspX recruiting score', 'Events & showcases finder'].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 size={16} style={{ color: '#C9A96E' }} className="flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/auth/signup?role=athlete">
              <Button className="w-full" variant="primary">Create Athlete Profile <ArrowRight size={16} /></Button>
            </Link>
          </div>
          <div className="rounded-3xl p-8 text-white" style={{ background: '#1B2A4A' }}>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Search size={22} className="text-white" />
            </div>
            <h3 className="text-2xl font-black mb-3">For Coaches</h3>
            <p className="text-white/60 mb-6">Find your next recruit faster. Search, evaluate, and communicate with top prospects across the country.</p>
            <ul className="space-y-3 mb-8">
              {['Advanced athlete search & filters', 'Kanban recruiting board', 'AI athlete analysis & ranking', 'Scouting report generator', 'Bulk messaging & templates', 'Recruiting analytics dashboard', 'Campus visit management'].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                  <CheckCircle2 size={16} style={{ color: '#C9A96E' }} className="flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/auth/signup?role=coach">
              <Button variant="gold" className="w-full">Start Recruiting <ArrowRight size={16} /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A96E' }}>Pricing</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: '#1B2A4A' }}>Simple, transparent pricing</h2>
            <p className="text-lg text-gray-500">Start free. Upgrade when you&apos;re ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map(plan => (
              <div key={plan.name} className={`rounded-3xl p-8 border relative ${plan.highlight ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]' : 'border-gray-100 bg-white'}`}
                style={plan.highlight ? { background: 'rgba(201,169,110,0.04)' } : {}}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full" style={{ background: '#C9A96E', color: '#1B2A4A' }}>Most Popular</span>
                )}
                <p className="text-sm font-semibold text-gray-500 mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black" style={{ color: '#1B2A4A' }}>{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={15} style={{ color: '#C9A96E' }} className="flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup">
                  <Button variant={plan.highlight ? 'gold' : 'outline'} className="w-full">{plan.cta}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl p-16 relative overflow-hidden" style={{ background: '#1B2A4A' }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#C9A96E' }} />
            <div className="relative">
              <div className="flex justify-center mb-6">
                <Image src="/ProspX.png" alt="ProspX" width={56} height={56} className="opacity-60" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Your recruiting journey starts here</h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Join thousands of athletes and coaches already using ProspX.</p>
              <div className="flex gap-4 justify-center">
                <Link href="/auth/signup?role=athlete">
                  <Button size="lg" variant="gold">Get Started Free</Button>
                </Link>
                <Link href="/auth/signup?role=coach">
                  <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">For Coaches</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6" style={{ background: '#1B2A4A' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/ProspX.png" alt="ProspX" width={28} height={28} className="" />
            <div>
              <span className="font-black text-white tracking-wide">PROSP<span style={{ color: '#C9A96E' }}>X</span></span>
              <span className="block text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#C9A96E', marginTop: -2 }}>Recruiting</span>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-white/30">&copy; 2025 ProspX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
