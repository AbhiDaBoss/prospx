import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProspX — The Modern Sports Recruiting Platform',
  description: 'Connect student-athletes with college coaches. Get recruited, get discovered, get ahead.',
  keywords: 'sports recruiting, college recruiting, student athlete, college coaches, recruiting platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  )
}
