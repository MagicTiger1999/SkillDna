"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface UserProfile {
  personal: {
    fullName: string
    email: string
    bio: string
    location: string
    phone: string
  }
  profilePhoto: {
    url: string | null
    initials: string
  }
  career: {
    targetRole: string
    experienceLevel: string
    preferredIndustries: string[]
    workPreference: string[]
  }
  social: {
    github: string
    linkedin: string
    twitter: string
    website: string
  }
  isOnboardingComplete: boolean
}

export function computeInitials(name: string): string {
  if (!name || !name.trim()) return "U"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const defaultProfile: UserProfile = {
  personal: {
    fullName: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
  },
  profilePhoto: {
    url: null,
    initials: "U",
  },
  career: {
    targetRole: "",
    experienceLevel: "",
    preferredIndustries: [],
    workPreference: [],
  },
  social: {
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  },
  isOnboardingComplete: false,
}

interface UserProfileContextType {
  profile: UserProfile
  updatePersonal: (data: Partial<UserProfile["personal"]>) => void
  updateProfilePhoto: (url: string | null) => void
  removeProfilePhoto: () => void
  updateCareer: (data: Partial<UserProfile["career"]>) => void
  updateSocial: (data: Partial<UserProfile["social"]>) => void
  completeOnboarding: () => void
  resetProfile: () => void
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("skilldna-user-profile")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setProfile(prev => ({
            ...defaultProfile,
            ...parsed,
            personal: { ...defaultProfile.personal, ...(parsed.personal || {}) },
            profilePhoto: { 
              ...defaultProfile.profilePhoto, 
              ...(parsed.profilePhoto || {}),
              initials: computeInitials(parsed.personal?.fullName || "")
            },
            career: { 
              ...defaultProfile.career, 
              ...(parsed.career || {}),
              preferredIndustries: parsed.career?.preferredIndustries || [],
              workPreference: parsed.career?.workPreference || []
            },
            social: { ...defaultProfile.social, ...(parsed.social || {}) },
          }))
        } catch {
          // ignore parse errors
        }
      }
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("skilldna-user-profile", JSON.stringify(profile))
    }
  }, [profile, isLoaded])

  const updatePersonal = (data: Partial<UserProfile["personal"]>) => {
    setProfile(prev => {
      const updatedPersonal = { ...prev.personal, ...data }
      const newInitials = computeInitials(updatedPersonal.fullName)
      return {
        ...prev,
        personal: updatedPersonal,
        profilePhoto: {
          ...prev.profilePhoto,
          initials: newInitials,
        },
      }
    })
  }

  const updateProfilePhoto = (url: string | null) => {
    setProfile(prev => ({
      ...prev,
      profilePhoto: {
        ...prev.profilePhoto,
        url,
      },
    }))
  }

  const removeProfilePhoto = () => {
    setProfile(prev => ({
      ...prev,
      profilePhoto: {
        ...prev.profilePhoto,
        url: null,
      },
    }))
  }

  const updateCareer = (data: Partial<UserProfile["career"]>) => {
    setProfile(prev => ({
      ...prev,
      career: { ...prev.career, ...data },
    }))
  }

  const updateSocial = (data: Partial<UserProfile["social"]>) => {
    setProfile(prev => ({
      ...prev,
      social: { ...prev.social, ...data },
    }))
  }

  const completeOnboarding = () => {
    setProfile(prev => ({ ...prev, isOnboardingComplete: true }))
  }

  const resetProfile = () => {
    setProfile(defaultProfile)
    if (typeof window !== "undefined") {
      localStorage.removeItem("skilldna-user-profile")
    }
  }

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        updatePersonal,
        updateProfilePhoto,
        removeProfilePhoto,
        updateCareer,
        updateSocial,
        completeOnboarding,
        resetProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  )
}

export function useUserProfile() {
  const context = useContext(UserProfileContext)
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider")
  }
  return context
}