import type { Athlete, Coach, Video, Event, Message, RecruitingPipelineEntry, AthleteTrackerEntry, College } from '@/types'

export const mockVideos: Video[] = [
  { id: 'v1', title: 'Junior Season Highlights', url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1546519638405-a2604ca94898?w=400', type: 'highlight', tags: ['highlights', '2024'], views: 1240, likes: 87, created_at: '2024-11-01' },
  { id: 'v2', title: 'State Championship Game', url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400', type: 'game_film', tags: ['game', 'state'], views: 893, likes: 64, created_at: '2024-10-15' },
  { id: 'v3', title: 'Training Session - Shooting Drills', url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=400', type: 'training', tags: ['training', 'shooting'], views: 445, likes: 31, created_at: '2024-09-20' },
]

export const mockAthletes: Athlete[] = [
  {
    id: 'a1', user_id: 'u1', name: 'Marcus Johnson', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    graduation_year: 2025, sport: 'Basketball', positions: ['Point Guard', 'Shooting Guard'],
    height: '6\'3"', weight: '185 lbs', gpa: 3.8, school: 'Lincoln High School',
    city: 'Atlanta', state: 'GA', bio: 'Elite point guard with exceptional court vision and leadership.',
    stats: { PPG: 22.4, APG: 7.1, RPG: 4.2, FG_PCT: 48.3, '3PT_PCT': 38.1 },
    awards: ['All-State 2024', 'State Champion 2023', 'MVP Region 5'],
    academic_achievements: ["Honor Roll 2022-2024", "NHS Member"],
    social_links: { twitter: '@marcusj', instagram: '@marcusj_hoops' },
    highlight_videos: mockVideos,
    prospx_score: 94, profile_completeness: 97, verified: true,
    recruiting_status: 'open', created_at: '2024-01-15',
  },
  {
    id: 'a2', user_id: 'u2', name: 'Tyler Rodriguez', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    graduation_year: 2025, sport: 'Football', positions: ['Quarterback'],
    height: '6\'4"', weight: '210 lbs', gpa: 3.5, school: 'Westview Academy',
    city: 'Dallas', state: 'TX', bio: 'Dual-threat QB with a big arm and great mobility.',
    stats: { 'Passing Yards': 3241, Touchdowns: 28, 'Completion %': 67.4, 'Rush Yards': 812 },
    awards: ['District MVP', 'All-District 2024'],
    academic_achievements: ['Honor Roll 2023-2024'],
    social_links: { twitter: '@tylerrodqb' },
    highlight_videos: mockVideos.slice(0, 2),
    prospx_score: 88, profile_completeness: 91, verified: true,
    recruiting_status: 'open', created_at: '2024-02-01',
  },
  {
    id: 'a3', user_id: 'u3', name: 'Aisha Williams', avatar_url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200',
    graduation_year: 2026, sport: 'Volleyball', positions: ['Outside Hitter', 'Libero'],
    height: '5\'10"', weight: '155 lbs', gpa: 4.0, school: 'Riverside High',
    city: 'Los Angeles', state: 'CA', bio: 'Versatile volleyball player with elite defensive skills.',
    stats: { Kills: 4.8, Digs: 5.2, Aces: 1.3, 'Hit %': 0.312 },
    awards: ['All-CIF 2024', 'Academic Athlete Award', 'MVP Tournament'],
    academic_achievements: ['Valedictorian Candidate', 'AP Scholar', 'NHS President'],
    social_links: { instagram: '@aisha_v10' },
    highlight_videos: mockVideos.slice(0, 1),
    prospx_score: 96, profile_completeness: 100, verified: true,
    recruiting_status: 'open', created_at: '2024-03-10',
  },
  {
    id: 'a4', user_id: 'u4', name: 'Jaylen Carter', avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    graduation_year: 2025, sport: 'Basketball', positions: ['Small Forward', 'Power Forward'],
    height: '6\'6"', weight: '200 lbs', gpa: 3.2, school: 'Oak Ridge High',
    city: 'Chicago', state: 'IL', bio: 'Athletic forward with elite athleticism and shot-blocking ability.',
    stats: { PPG: 18.7, RPG: 9.1, BPG: 3.2, FG_PCT: 52.1 },
    awards: ['All-Conference 2024', 'Defensive Player of the Year'],
    academic_achievements: ['Honor Roll 2024'],
    social_links: { twitter: '@jaylen_c5' },
    highlight_videos: mockVideos,
    prospx_score: 85, profile_completeness: 88, verified: false,
    recruiting_status: 'open', created_at: '2024-01-20',
  },
  {
    id: 'a5', user_id: 'u5', name: 'Sofia Chen', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    graduation_year: 2026, sport: 'Soccer', positions: ['Midfielder', 'Forward'],
    height: '5\'6"', weight: '135 lbs', gpa: 3.9, school: 'Eastside Prep',
    city: 'Seattle', state: 'WA', bio: 'Creative midfielder with exceptional vision and scoring ability.',
    stats: { Goals: 19, Assists: 14, 'Games Played': 22, 'Shot Accuracy': '72%' },
    awards: ['All-State 2024', 'Golden Boot Award', 'Academic Athlete'],
    academic_achievements: ['AP Scholar with Distinction', 'NHS Member', 'Community Service Award'],
    social_links: { instagram: '@sofia_soccer' },
    highlight_videos: mockVideos.slice(0, 2),
    prospx_score: 92, profile_completeness: 95, verified: true,
    recruiting_status: 'open', created_at: '2024-04-05',
  },
]

export const mockCoaches: Coach[] = [
  { id: 'c1', user_id: 'cu1', name: 'Coach David Miller', avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', school: 'University of Michigan', sport: 'Basketball', division: 'D1', title: 'Head Coach', bio: '20+ years coaching experience.', recruiting_needs: ['PG', 'SG', 'SF'], contact_email: 'miller@umich.edu', verified: true, created_at: '2023-06-01' },
  { id: 'c2', user_id: 'cu2', name: 'Coach Sarah Thompson', avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', school: 'Stanford University', sport: 'Volleyball', division: 'D1', title: 'Head Coach', bio: 'NCAA Champion coach.', recruiting_needs: ['OH', 'MB', 'S'], contact_email: 'thompson@stanford.edu', verified: true, created_at: '2023-07-15' },
]

export const mockEvents: Event[] = [
  { id: 'e1', title: 'Nike Elite Basketball Showcase', type: 'showcase', sport: 'Basketball', location: 'Atlanta, GA', date: '2025-07-15', description: 'Top prospects from across the Southeast.', organizer: 'Nike', price: 250, registered: false },
  { id: 'e2', title: 'All-American Football Combine', type: 'combine', sport: 'Football', location: 'Dallas, TX', date: '2025-06-20', description: 'Measure your athleticism in front of D1 coaches.', organizer: 'Under Armour', price: 175, registered: true },
  { id: 'e3', title: 'Volleyball Showcase Camp', type: 'camp', sport: 'Volleyball', location: 'Los Angeles, CA', date: '2025-08-01', description: 'Learn from coaches at top programs.', organizer: 'Volleyball USA', price: 300, registered: false },
]

export const mockMessages: Message[] = [
  { id: 'm1', sender_id: 'cu1', receiver_id: 'u1', content: 'Hi Marcus, I\'ve been following your film. We\'d love to have you visit campus this fall. Are you available in October?', read: false, created_at: '2024-11-20T14:30:00' },
  { id: 'm2', sender_id: 'u1', receiver_id: 'cu1', content: 'Coach Miller, thank you so much! I would love to visit. October 12th works for me.', read: true, created_at: '2024-11-20T15:00:00' },
  { id: 'm3', sender_id: 'cu1', receiver_id: 'u1', content: 'Perfect! We\'ll get everything set up. Looking forward to showing you what Michigan has to offer.', read: false, created_at: '2024-11-20T15:30:00' },
]

export const mockPipeline: RecruitingPipelineEntry[] = [
  { id: 'p1', coach_id: 'c1', athlete_id: 'a1', athlete: mockAthletes[0], stage: 'evaluating', notes: 'Top prospect, watching closely', rating: 9, created_at: '2024-10-01', updated_at: '2024-11-15' },
  { id: 'p2', coach_id: 'c1', athlete_id: 'a4', athlete: mockAthletes[3], stage: 'contacted', notes: 'Reached out, awaiting reply', rating: 8, created_at: '2024-10-05', updated_at: '2024-11-10' },
  { id: 'p3', coach_id: 'c1', athlete_id: 'a2', athlete: mockAthletes[1], stage: 'interested', notes: 'Watched film, very athletic', rating: 7, created_at: '2024-11-01', updated_at: '2024-11-01' },
  { id: 'p4', coach_id: 'c1', athlete_id: 'a5', athlete: mockAthletes[4], stage: 'visiting', notes: 'Campus visit scheduled for December', rating: 9, created_at: '2024-09-15', updated_at: '2024-11-18' },
  { id: 'p5', coach_id: 'c1', athlete_id: 'a3', athlete: mockAthletes[2], stage: 'offered', notes: 'Full scholarship offered', rating: 10, created_at: '2024-08-01', updated_at: '2024-11-05' },
]

export const mockTrackerEntries: AthleteTrackerEntry[] = [
  { id: 't1', athlete_id: 'a1', school: 'University of Michigan', coach_name: 'Coach Miller', status: 'responded', notes: 'Scheduled campus visit for October', interest_level: 5, created_at: '2024-10-01', updated_at: '2024-11-20' },
  { id: 't2', athlete_id: 'a1', school: 'Duke University', coach_name: 'Coach K Jr.', status: 'contacted', notes: 'Sent email with film', interest_level: 4, created_at: '2024-10-15', updated_at: '2024-10-15' },
  { id: 't3', athlete_id: 'a1', school: 'Kentucky', coach_name: 'Coach Cal', status: 'offered', notes: 'Received full scholarship offer!', interest_level: 5, created_at: '2024-09-01', updated_at: '2024-11-01' },
  { id: 't4', athlete_id: 'a1', school: 'North Carolina', status: 'researching', notes: 'Looking into their program', interest_level: 3, created_at: '2024-11-10', updated_at: '2024-11-10' },
]

export const mockColleges: College[] = [
  { id: 'col1', name: 'University of Michigan', location: 'Ann Arbor, MI', division: 'D1', enrollment: 47000, programs: ['Basketball', 'Football', 'Swimming', 'Track', 'Volleyball'], academic_requirements: { min_gpa: 3.0, min_sat: 1200 }, coaches: mockCoaches.slice(0, 1), logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/200px-Michigan_Wolverines_logo.svg.png' },
  { id: 'col2', name: 'Stanford University', location: 'Palo Alto, CA', division: 'D1', enrollment: 17000, programs: ['Basketball', 'Football', 'Soccer', 'Volleyball', 'Swimming'], academic_requirements: { min_gpa: 3.8, min_sat: 1450 }, coaches: mockCoaches.slice(1), logo_url: '' },
]
