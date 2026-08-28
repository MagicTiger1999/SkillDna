import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export function getProficiencyColor(proficiency: number): string {
  if (proficiency >= 80) return 'text-emerald-400'
  if (proficiency >= 60) return 'text-amber-400'
  if (proficiency >= 40) return 'text-orange-400'
  return 'text-red-400'
}

export function getProficiencyBgColor(proficiency: number): string {
  if (proficiency >= 80) return 'bg-emerald-500/20 border-emerald-500/30'
  if (proficiency >= 60) return 'bg-amber-500/20 border-amber-500/30'
  if (proficiency >= 40) return 'bg-orange-500/20 border-orange-500/30'
  return 'bg-red-500/20 border-red-500/30'
}

export function getGapTypeColor(gapType: string): string {
  switch (gapType) {
    case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20'
    case 'major': return 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    case 'moderate': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    case 'minor': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    case 'strong': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20'
  }
}

export function getGapTypeLabel(gapType: string): string {
  switch (gapType) {
    case 'critical': return 'Critical Gap'
    case 'major': return 'Major Gap'
    case 'moderate': return 'Moderate Gap'
    case 'minor': return 'Minor Gap'
    case 'strong': return 'Strong'
    default: return 'Unknown'
  }
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Programming': 'code',
    'Data Structures & Algorithms': 'git-branch',
    'Machine Learning': 'brain',
    'Web Development': 'globe',
    'Git/GitHub': 'github',
    'Cloud': 'cloud',
    'Communication': 'message-square',
    'Problem Solving': 'puzzle',
    'AI': 'bot',
    'Development': 'code',
    'Career': 'briefcase',
    'Learning': 'book-open',
    'Industry': 'factory',
    'Trending': 'trending-up',
  }
  return icons[category] || 'circle'
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Programming': 'blue',
    'Data Structures & Algorithms': 'purple',
    'Machine Learning': 'pink',
    'Web Development': 'cyan',
    'Git/GitHub': 'orange',
    'Cloud': 'indigo',
    'Communication': 'green',
    'Problem Solving': 'red',
    'AI': 'pink',
    'Development': 'blue',
    'Career': 'amber',
    'Learning': 'emerald',
    'Industry': 'slate',
    'Trending': 'rose',
  }
  return colors[category] || 'gray'
}