"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgeSystem, availableBadges, type BadgeData } from "@/components/gamification/badge-system"
import { StreakTracker } from "@/components/gamification/streak-tracker"
import { ArrowLeft, Trophy, Flame, Target, Crown } from "lucide-react"

export default function AchievementsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userBadges, setUserBadges] = useState<BadgeData[]>(availableBadges)

  // Mock streak data - in real app this would come from user's learning history
  const streakData = {
    currentStreak: 5,
    longestStreak: 12,
    totalDays: 8,
    lastActivityDate: new Date(),
    streakHistory: [
      new Date(2024, 11, 15),
      new Date(2024, 11, 16),
      new Date(2024, 11, 17),
      new Date(2024, 11, 18),
      new Date(2024, 11, 19),
      new Date(2024, 11, 10),
      new Date(2024, 11, 8),
      new Date(2024, 11, 5),
    ],
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Mock some earned badges for demo
  useEffect(() => {
    const updatedBadges = userBadges.map((badge) => {
      if (badge.id === "first-lesson") {
        return { ...badge, earned: true, earnedDate: new Date(2024, 11, 15) }
      }
      if (badge.id === "week-streak") {
        return { ...badge, progress: 5 }
      }
      if (badge.id === "pronunciation-master") {
        return { ...badge, progress: 12 }
      }
      return badge
    })
    setUserBadges(updatedBadges)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading achievements...</p>
        </div>
      </div>
    )
  }

  const earnedCount = userBadges.filter((b) => b.earned).length
  const totalBadges = userBadges.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Achievements</h1>
              <p className="text-sm text-muted-foreground">
                {earnedCount} of {totalBadges} badges earned
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-sm font-medium">
                {earnedCount}/{totalBadges}
              </div>
              <div className="text-xs text-muted-foreground">Badges</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="badges" className="gap-2">
              <Trophy className="h-4 w-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="streaks" className="gap-2">
              <Flame className="h-4 w-4" />
              Streaks
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <Crown className="h-4 w-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="challenges" className="gap-2">
              <Target className="h-4 w-4" />
              Challenges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="space-y-6">
            <BadgeSystem userBadges={userBadges} showAll={true} />
          </TabsContent>

          <TabsContent value="streaks" className="space-y-6">
            <StreakTracker streakData={streakData} />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Weekly Leaderboard
                </CardTitle>
                <CardDescription>See how you rank against other learners this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: "Priya S.", xp: 2450, streak: 15, avatar: "P" },
                    { rank: 2, name: "Arjun K.", xp: 2380, streak: 12, avatar: "A" },
                    { rank: 3, name: "Meera R.", xp: 2250, streak: 18, avatar: "M" },
                    { rank: 4, name: "You", xp: 1890, streak: 5, avatar: user?.displayName?.[0] || "U" },
                    { rank: 5, name: "Ravi T.", xp: 1750, streak: 8, avatar: "R" },
                  ].map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        player.name === "You" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            player.rank === 1
                              ? "bg-yellow-500 text-white"
                              : player.rank === 2
                                ? "bg-gray-400 text-white"
                                : player.rank === 3
                                  ? "bg-orange-600 text-white"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {player.rank}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                          {player.avatar}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {player.xp} XP • {player.streak} day streak
                        </div>
                      </div>
                      {player.rank <= 3 && (
                        <div className="text-2xl">{player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Weekly Challenges
                  </CardTitle>
                  <CardDescription>Complete these challenges to earn bonus XP and badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Perfect Week",
                        description: "Complete at least one lesson every day this week",
                        progress: 5,
                        target: 7,
                        reward: "500 XP + Week Warrior badge",
                        timeLeft: "2 days left",
                      },
                      {
                        title: "Pronunciation Master",
                        description: "Get 20 pronunciation exercises correct",
                        progress: 12,
                        target: 20,
                        reward: "300 XP",
                        timeLeft: "5 days left",
                      },
                      {
                        title: "Multi-lingual",
                        description: "Practice 3 different languages",
                        progress: 1,
                        target: 3,
                        reward: "400 XP + Polyglot badge",
                        timeLeft: "6 days left",
                      },
                    ].map((challenge, index) => (
                      <div key={index} className="p-4 rounded-lg border space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{challenge.title}</h4>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">{challenge.timeLeft}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {challenge.progress}/{challenge.target}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-medium text-secondary">Reward: {challenge.reward}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
