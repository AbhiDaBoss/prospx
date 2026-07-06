import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getGradeColor(grade: string) {
  const grades: Record<string, string> = {
    'A+': 'text-emerald-600',
    A: 'text-emerald-600',
    'A-': 'text-emerald-500',
    'B+': 'text-blue-600',
    B: 'text-blue-500',
    'B-': 'text-blue-400',
    'C+': 'text-amber-500',
    C: 'text-amber-400',
  }
  return grades[grade] || 'text-gray-500'
}

export function getGradeBg(grade: string) {
  const first = grade[0]
  if (first === 'A') return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
  if (first === 'B') return 'bg-blue-50 text-blue-700 ring-blue-200'
  if (first === 'C') return 'bg-amber-50 text-amber-700 ring-amber-200'
  return 'bg-gray-50 text-gray-700 ring-gray-200'
}

export function calculateOverallGrade(athlete: {
  gpa: number
  prospx_score: number
  profile_completeness: number
}): string {
  const score =
    athlete.gpa * 15 + athlete.prospx_score * 0.5 + athlete.profile_completeness * 0.2
  if (score >= 90) return 'A+'
  if (score >= 85) return 'A'
  if (score >= 80) return 'A-'
  if (score >= 75) return 'B+'
  if (score >= 70) return 'B'
  if (score >= 65) return 'B-'
  if (score >= 60) return 'C+'
  return 'C'
}

export function getKeyAttributes(athlete: {
  gpa: number
  stats: Record<string, string | number>
  awards: string[]
  sport: string
}): string[] {
  const attrs: string[] = []
  if (athlete.gpa >= 3.8) attrs.push('Academic All-Star')
  else if (athlete.gpa >= 3.5) attrs.push('Strong Student')
  if (athlete.awards.length >= 3) attrs.push('Decorated Athlete')
  if (athlete.sport === 'Basketball') {
    const ppg = Number(athlete.stats['PPG'] || 0)
    if (ppg >= 20) attrs.push('Elite Scorer')
    else if (ppg >= 15) attrs.push('High Scorer')
  }
  if (athlete.sport === 'Football') {
    const td = Number(athlete.stats['Touchdowns'] || 0)
    if (td >= 20) attrs.push('Playmaker')
  }
  if (attrs.length < 2) attrs.push('High Upside', 'Coachable')
  return attrs.slice(0, 3)
}

export const SPORTS = [
  'Football', 'Basketball', 'Baseball', 'Softball', 'Soccer',
  'Volleyball', 'Tennis', 'Track & Field', 'Swimming', 'Lacrosse',
  'Wrestling', 'Golf', 'Cross Country', 'Hockey', 'Gymnastics',
]

export const DIVISIONS = ['D1', 'D2', 'D3', 'NAIA', 'JUCO']

export const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]
