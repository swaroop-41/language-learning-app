"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Target, Calendar, BookOpen, Volume2, Mic, Crown, Zap, Award } from "lucide-react"

export interface BadgeData {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  requirement: number
  progress: number
  earned: boolean
  earnedDate?: Date
  category: "learning" | "streak" | "social" | "achievement"
}

export const availableBadges: BadgeData[] = [
  {
    id: "first-lesson",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-blue-500",
    requirement: 1,
    progress: 0,
    earned: false,
    category: "learning",
  },
  {
    id: "week-streak",
    name: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: <Flame className="h-5 w-5" />,
    color: "bg-orange-500",
    requirement: 7,
    progress: 0,
    earned: false,
    category: "streak",
  },
  {
    id: "pronunciation-master",
    name: "Pronunciation Pro",
    description: "Get 50 pronunciation exercises correct",
    icon: <Mic className="h-5 w-5" />,
    color: "bg-green-500",
    requirement: 50,
    progress: 0,
    earned: false,
    category: "learning",
  },
  {
    id: "listening-champion",
    name: "Listening Champion",
    description: "Complete 100 listening exercises",
    icon: <Volume2 className="h-5 w-5" />,
    color: "bg-purple-500",
    requirement: 100,
    progress: 0,
    earned: false,
    category: "learning",
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Get 100% on any lesson",
    icon: <Target className="h-5 w-5" />,
    color: "bg-yellow-500",
    requirement: 1,
    progress: 0,
    earned: false,
    category: "achievement",
  },
  {
    id: "month-streak",
    name: "Monthly Master",
    description: "Maintain a 30-day learning streak",
    icon: <Calendar className="h-5 w-5" />,
    color: "bg-red-500",
    requirement: 30,
    progress: 0,
    earned: false,
    category: "streak",
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "Start learning 3 different languages",
    icon: <Crown className="h-5 w-5" />,
    color: "bg-indigo-500",
    requirement: 3,
    progress: 0,
    earned: false,
    category: "achievement",
  },
  {
    id: "speed-learner",
    name: "Speed Learner",
    description: "Complete 10 lessons in one day",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-cyan-500",
    requirement: 10,
    progress: 0,
    earned: false,
    category: "learning",
  },
]

interface BadgeSystemProps {
  userBadges: BadgeData[]
  showAll?: boolean
}

export function BadgeSystem({ userBadges, showAll = false }: BadgeSystemProps) {
  const earnedBadges = userBadges.filter((badge) => badge.earned)
  const inProgressBadges = userBadges.filter((badge) => !badge.earned && badge.progress > 0)
  const availableBadgesFiltered = showAll ? userBadges : [...earnedBadges, ...inProgressBadges.slice(0, 3)]

  return (
    <div className="space-y-6">
      {earnedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-secondary" />
            Earned Badges ({earnedBadges.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      )}

      {inProgressBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            In Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressBadges.slice(0, showAll ? inProgressBadges.length : 3).map((badge) => (
              <BadgeProgressCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      )}

      {!showAll && userBadges.filter((b) => !b.earned && b.progress === 0).length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-muted-foreground" />
            Available Badges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userBadges
              .filter((b) => !b.earned && b.progress === 0)
              .slice(0, 4)
              .map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

function BadgeCard({ badge }: { badge: BadgeData }) {
  return (
    <Card
      className={`${badge.earned ? "border-secondary/50 bg-secondary/5" : "opacity-60"} transition-all hover:scale-105`}
    >
      <CardContent className="p-4 text-center">
        <div
          className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center text-white mx-auto mb-2`}
        >
          {badge.icon}
        </div>
        <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
        <p className="text-xs text-muted-foreground">{badge.description}</p>
        {badge.earned && badge.earnedDate && (
          <Badge variant="secondary" className="mt-2 text-xs">
            Earned {badge.earnedDate.toLocaleDateString()}
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}

function BadgeProgressCard({ badge }: { badge: BadgeData }) {
  const progressPercentage = (badge.progress / badge.requirement) * 100

  return (
    <Card className="border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center text-white`}>
            {badge.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{badge.name}</h4>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>
              {badge.progress}/{badge.requirement}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
