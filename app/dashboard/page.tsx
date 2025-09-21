"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, MessageCircle, TrendingUp, Award, Flame, Star, Globe, Mic, Brain, Users } from "lucide-react"
import Link from "next/link"

const languages = [
  {
    name: "Telugu",
    native: "తెలుగు",
    progress: 65,
    level: "Intermediate",
    color: "from-blue-500 to-cyan-500",
    description: "Classical language of Andhra Pradesh",
  },
  {
    name: "Kannada",
    native: "ಕನ್ನಡ",
    progress: 40,
    level: "Beginner",
    color: "from-green-500 to-emerald-500",
    description: "Language of Karnataka",
  },
  {
    name: "Tamil",
    native: "தமிழ்",
    progress: 80,
    level: "Advanced",
    color: "from-red-500 to-pink-500",
    description: "Ancient language of Tamil Nadu",
  },
  {
    name: "Hindi",
    native: "हिन्दी",
    progress: 30,
    level: "Beginner",
    color: "from-orange-500 to-amber-500",
    description: "National language of India",
  },
  {
    name: "Malayalam",
    native: "മലയാളം",
    progress: 55,
    level: "Intermediate",
    color: "from-purple-500 to-violet-500",
    description: "Language of Kerala",
  },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-amber-50">
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-amber-600 bg-clip-text text-transparent">
              Learn 2 Talk
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            )}
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{user ? `, ${user.email?.split("@")[0]}` : ""}! 🎉
          </h2>
          <p className="text-gray-600">Continue your language learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-sm bg-white/80 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Flame className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">1,250</p>
                  <p className="text-sm text-gray-600">Total XP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Badges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-gray-600">Languages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {languages.map((language) => (
            <Card
              key={language.name}
              className="backdrop-blur-sm bg-white/80 border-white/20 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{language.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-gray-900">{language.native}</CardDescription>
                  </div>
                  <Badge variant="secondary">{language.level}</Badge>
                </div>
                <p className="text-sm text-gray-600">{language.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{language.progress}%</span>
                    </div>
                    <Progress value={language.progress} className="h-2" />
                  </div>
                  <div className="flex space-x-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/learn/${language.name.toLowerCase()}`}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Link href={`/test/${language.name.toLowerCase()}`}>
                        <Brain className="w-4 h-4 mr-2" />
                        Test
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="backdrop-blur-sm bg-white/80 border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Link href="/chat" className="flex flex-col items-center text-center space-y-2">
                <MessageCircle className="h-12 w-12 text-blue-500" />
                <h3 className="font-semibold">AI Chat</h3>
                <p className="text-sm text-gray-600">Practice conversations</p>
              </Link>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Link href="/voice-practice" className="flex flex-col items-center text-center space-y-2">
                <Mic className="h-12 w-12 text-green-500" />
                <h3 className="font-semibold">Voice Practice</h3>
                <p className="text-sm text-gray-600">Improve pronunciation</p>
              </Link>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Link href="/progress" className="flex flex-col items-center text-center space-y-2">
                <TrendingUp className="h-12 w-12 text-purple-500" />
                <h3 className="font-semibold">Progress</h3>
                <p className="text-sm text-gray-600">Track your learning</p>
              </Link>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Link href="/cultural-insights" className="flex flex-col items-center text-center space-y-2">
                <Users className="h-12 w-12 text-orange-500" />
                <h3 className="font-semibold">Cultural Insights</h3>
                <p className="text-sm text-gray-600">Learn about culture</p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
