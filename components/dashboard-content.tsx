"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from "@/lib/firebase"
import { Languages, BookOpen, Trophy, Flame, Star, MessageCircle, TrendingUp, LogOut, Play } from "lucide-react"

const languages = [
  {
    id: "telugu",
    name: "Telugu",
    nativeName: "తెలుగు",
    description: "Spoken by 75+ million people in Andhra Pradesh and Telangana",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    progress: 0,
    level: "Beginner",
    lessons: 24,
    flag: "🇮🇳",
  },
  {
    id: "kannada",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    description: "Official language of Karnataka with rich literary heritage",
    color: "bg-gradient-to-br from-red-500 to-red-600",
    progress: 0,
    level: "Beginner",
    lessons: 22,
    flag: "🇮🇳",
  },
  {
    id: "tamil",
    name: "Tamil",
    nativeName: "தமிழ்",
    description: "One of the oldest languages, spoken in Tamil Nadu and Sri Lanka",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    progress: 0,
    level: "Beginner",
    lessons: 26,
    flag: "🇮🇳",
  },
  {
    id: "hindi",
    name: "Hindi",
    nativeName: "हिन्दी",
    description: "Most widely spoken language in India",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    progress: 0,
    level: "Beginner",
    lessons: 30,
    flag: "🇮🇳",
  },
  {
    id: "malayalam",
    name: "Malayalam",
    nativeName: "മലയാളം",
    description: "Official language of Kerala with unique script",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    progress: 0,
    level: "Beginner",
    lessons: 20,
    flag: "🇮🇳",
  },
]

export default function DashboardContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGuest = searchParams.get("guest") === "true"
  const [currentStreak, setCurrentStreak] = useState(0)
  const [totalXP, setTotalXP] = useState(0)

  useEffect(() => {
    if (!loading && !user && !isGuest) {
      router.push("/login")
    }
  }, [user, loading, isGuest, router])

  const handleLogout = async () => {
    if (!isGuest) {
      await logout()
    }
    router.push("/login")
  }

  const handleLanguageSelect = (languageId: string) => {
    router.push(`/learn/${languageId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-gradient-card glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Languages className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-black text-primary">Learn 2 Talk</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Streak Counter */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10">
              <Flame className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold">{currentStreak} day streak</span>
            </div>

            {/* XP Counter */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">{totalXP} XP</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || ""} />
                <AvatarFallback>{isGuest ? "G" : user?.displayName?.[0] || user?.email?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back{isGuest ? ", Guest" : user?.displayName ? `, ${user.displayName}` : ""}!
          </h2>
          <p className="text-muted-foreground text-lg">Choose a language to continue your learning journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card glass-effect">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glass-effect">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Flame className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{currentStreak} days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glass-effect">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glass-effect">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total XP</p>
                <p className="text-2xl font-bold">{totalXP}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Language Selection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Choose Your Language</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2 bg-gradient-card glass-effect"
                onClick={() => router.push("/chat")}
              >
                <MessageCircle className="h-4 w-4" />
                AI Chat Assistant
              </Button>
              <Button
                variant="outline"
                className="gap-2 bg-gradient-card glass-effect"
                onClick={() => router.push("/progress")}
              >
                <TrendingUp className="h-4 w-4" />
                Progress
              </Button>
              <Button
                variant="outline"
                className="gap-2 bg-gradient-card glass-effect"
                onClick={() => router.push("/achievements")}
              >
                <Trophy className="h-4 w-4" />
                Achievements
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language) => (
              <Card
                key={language.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 bg-gradient-card glass-effect hover:scale-105"
                onClick={() => handleLanguageSelect(language.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg ${language.color} flex items-center justify-center text-white text-xl font-bold`}
                      >
                        {language.flag}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{language.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{language.nativeName}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{language.level}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">{language.description}</CardDescription>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{language.progress}%</span>
                    </div>
                    <Progress value={language.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{language.lessons} lessons</span>
                    </div>
                    <Button size="sm" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Play className="h-3 w-3" />
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
          <Card className="bg-gradient-card glass-effect">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Start Your Learning Journey</h4>
              <p className="text-muted-foreground mb-4">
                Choose a language above to begin your first lesson and start earning XP and badges!
              </p>
              <Button className="gap-2">
                <Play className="h-4 w-4" />
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
