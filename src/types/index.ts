export type UserRole = 'athlete' | 'coach' | 'parent'

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
  avatar_url?: string
  created_at: string
  verified: boolean
}

export interface Athlete {
  id: string
  user_id: string
  name: string
  avatar_url?: string
  graduation_year: number
  sport: string
  positions: string[]
  height: string
  weight: string
  gpa: number
  school: string
  city: string
  state: string
  bio?: string
  stats: Record<string, string | number>
  awards: string[]
  academic_achievements: string[]
  social_links: Record<string, string>
  highlight_videos: Video[]
  prospx_score: number
  profile_completeness: number
  verified: boolean
  recruiting_status: 'open' | 'committed' | 'signed' | 'closed'
  created_at: string
}

export interface Coach {
  id: string
  user_id: string
  name: string
  avatar_url?: string
  school: string
  sport: string
  division: 'D1' | 'D2' | 'D3' | 'NAIA' | 'JUCO'
  title: string
  bio?: string
  recruiting_needs: string[]
  contact_email: string
  verified: boolean
  created_at: string
}

export interface Video {
  id: string
  title: string
  url: string
  thumbnail_url?: string
  type: 'highlight' | 'game_film' | 'training'
  tags: string[]
  views: number
  likes: number
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  read: boolean
  attachments?: string[]
  created_at: string
}

export interface RecruitingPipelineEntry {
  id: string
  coach_id: string
  athlete_id: string
  athlete?: Athlete
  stage: 'interested' | 'evaluating' | 'contacted' | 'visiting' | 'offered' | 'committed'
  notes?: string
  rating?: number
  created_at: string
  updated_at: string
}

export interface AthleteTrackerEntry {
  id: string
  athlete_id: string
  school: string
  coach_name?: string
  status: 'researching' | 'contacted' | 'responded' | 'visit_scheduled' | 'offered' | 'committed' | 'declined'
  notes?: string
  interest_level: 1 | 2 | 3 | 4 | 5
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  type: 'showcase' | 'tournament' | 'camp' | 'combine'
  sport: string
  location: string
  date: string
  description?: string
  organizer: string
  price?: number
  registered: boolean
}

export interface College {
  id: string
  name: string
  location: string
  division: string
  enrollment: number
  programs: string[]
  academic_requirements: Record<string, string | number>
  coaches: Coach[]
  logo_url?: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'message' | 'profile_view' | 'coach_interest' | 'follow' | 'event'
  title: string
  body: string
  read: boolean
  created_at: string
}

export interface ScoutingReport {
  id: string
  coach_id: string
  athlete_id: string
  strengths: string[]
  weaknesses: string[]
  notes: string
  ratings: Record<string, number>
  overall_rating: number
  created_at: string
}

export interface SwipeCard {
  athlete: Athlete
  highlights: Video[]
  key_attributes: string[]
  overall_grade: string
}
