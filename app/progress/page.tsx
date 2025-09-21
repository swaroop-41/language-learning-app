"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  Target,
  BookOpen,
  Clock,
  Award,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"

const weeklyProgressData = [
  { day: "Mon", xp: 120, lessons: 2, time: 25, accuracy: 85 },
  { day: "Tue", xp: 180, lessons: 3, time: 35, accuracy: 88 },
  { day: "Wed", xp: 90, lessons: 1, time: 15, accuracy: 82 },
  { day: "Thu", xp: 200, lessons: 4, time: 45, accuracy: 91 },
  { day: "Fri", xp: 150, lessons: 2, time: 30, accuracy: 87 },
  { day: "Sat", xp: 220, lessons: 3, time: 40, accuracy: 93 },
  { day: "Sun", xp: 100, lessons: 1, time: 20, accuracy: 89 },
]

const languageProgressData = [
  { name: "Telugu", progress: 65, lessons: 15, xp: 850, color: "#3b82f6", streak: 5, lastStudied: "Today" },
  { name: "Tamil", progress: 45, lessons: 10, xp: 620, color: "#10b981", streak: 3, lastStudied: "Yesterday" },
  { name: "Hindi", progress: 30, lessons: 7, xp: 420, color: "#f59e0b", streak: 2, lastStudied: "2 days ago" },
  { name: "Kannada", progress: 20, lessons: 4, xp: 280, color: "#ef4444", streak: 1, lastStudied: "3 days ago" },
  { name: "Malayalam", progress: 10, lessons: 2, xp: 150, color: "#8b5cf6", streak: 0, lastStudied: "1 week ago" },
]

const skillsData = [
  { skill: "Vocabulary", progress: 75, total: 200, learned: 150, category: "Words & Phrases" },
  { skill: "Grammar", progress: 60, total: 50, learned: 30, category: "Structure" },
  { skill: "Pronunciation", progress: 80, total: 100, learned: 80, category: "Speaking" },
  { skill: "Listening", progress: 55, total: 80, learned: 44, category: "Comprehension" },
  { skill: "Speaking", progress: 45, total: 60, learned: 27, category: "Conversation" },
  { skill: "Reading", progress: 70, total: 90, learned: 63, category: "Comprehension" },
]

const monthlyData = [
  { month: "Jan", xp: 1200, lessons: 25, hours: 8.5 },
  { month: "Feb", xp: 1800, lessons: 35, hours: 12.2 },
  { month: "Mar", xp: 2200, lessons: 42, hours: 15.8 },
  { month: "Apr", xp: 1900, lessons: 38, hours: 13.5 },
  { month: "May", xp: 2500, lessons: 48, hours: 18.2 },
  { month: "Jun", xp: 2800, lessons: 52, hours: 21.5 },
]

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first lesson", earned: true, date: "2024-01-15" },
  { id: 2, title: "Week Warrior", description: "Study for 7 consecutive days", earned: true, date: "2024-01-22" },
  { id: 3, title: "Polyglot", description: "Start learning 3 languages", earned: true, date: "2024-02-01" },
  { id: 4, title: "Vocabulary Master", description: "Learn 100 new words", earned: true, date: "2024-02-15" },
  { id: 5, title: "Grammar Guru", description: "Complete 20 grammar lessons", earned: false, date: null },
  { id: 6, title: "Conversation King", description: "Have 50 AI conversations", earned: false, date: null },
]

export default function ProgressPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const loadData = async () => {
      try {
        setDataLoading(true)
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setDataLoading(false)
      } catch (err) {
        setError("Failed to load progress data. Please try again.")
        setDataLoading(false)
      }
    }

    if (user) {
      loadData()
    }
  }, [user])

  const refreshData = async () => {
    setRefreshing(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In real app, this would refetch from API
    } catch (err) {
      setError("Failed to refresh data.")
    } finally {
      setRefreshing(false)
    }
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    )
  }

  const totalXP = languageProgressData.reduce((sum, lang) => sum + lang.xp, 0)
  const totalLessons = languageProgressData.reduce((sum, lang) => sum + lang.lessons, 0)
  const averageProgress = Math.round(
    languageProgressData.reduce((sum, lang) => sum + lang.progress, 0) / languageProgressData.length,
  )
  const totalStudyTime = monthlyData.reduce((sum, month) => sum + month.hours, 0)
  const earnedAchievements = achievements.filter((a) => a.earned).length

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
              <h1 className="text-2xl font-bold">Learning Progress</h1>
              <p className="text-sm text-muted-foreground">Track your Learn 2 Talk journey</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={refreshData} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
            <div className="text-right">
              <div className="text-sm font-medium">{totalXP.toLocaleString()} XP</div>
              <div className="text-xs text-muted-foreground">Total earned</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Error Loading Data</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={refreshData}>
              Retry
            </Button>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-background/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Total XP</span>
              </div>
              <div className="text-2xl font-bold text-secondary">{totalXP.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                +{weeklyProgressData.reduce((sum, day) => sum + day.xp, 0)} this week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Lessons</span>
              </div>
              <div className="text-2xl font-bold text-primary">{totalLessons}</div>
              <div className="text-xs text-muted-foreground">
                +{weeklyProgressData.reduce((sum, day) => sum + day.lessons, 0)} this week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Avg Progress</span>
              </div>
              <div className="text-2xl font-bold text-green-500">{averageProgress}%</div>
              <div className="text-xs text-muted-foreground">across languages</div>
            </CardContent>
          </Card>

          <Card className="bg-background/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">Study Time</span>
              </div>
              <div className="text-2xl font-bold text-orange-500">{totalStudyTime.toFixed(1)}h</div>
              <div className="text-xs text-muted-foreground">total hours</div>
            </CardContent>
          </Card>

          <Card className="bg-background/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Achievements</span>
              </div>
              <div className="text-2xl font-bold text-purple-500">{earnedAchievements}</div>
              <div className="text-xs text-muted-foreground">of {achievements.length} earned</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="languages" className="gap-2">
              <PieChart className="h-4 w-4" />
              Languages
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Target className="h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Activity className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Weekly Progress Chart */}
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>Your learning activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          value,
                          name === "xp" ? "XP Earned" : name === "lessons" ? "Lessons" : "Minutes",
                        ]}
                      />
                      <Line type="monotone" dataKey="xp" stroke="#0891b2" strokeWidth={3} name="XP" />
                      <Line type="monotone" dataKey="time" stroke="#10b981" strokeWidth={2} name="Time" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Monthly Trends
                </CardTitle>
                <CardDescription>Your learning progress over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="xp" fill="#0891b2" name="XP Earned" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Language Progress Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Language Progress</h3>
                {languageProgressData.map((language) => (
                  <Card key={language.name} className="bg-background/60 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: language.color }}></div>
                          <h4 className="font-semibold">{language.name}</h4>
                        </div>
                        <Badge variant="secondary">{language.progress}%</Badge>
                      </div>
                      <Progress value={language.progress} className="mb-3" />
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">{language.lessons}</span> lessons
                        </div>
                        <div>
                          <span className="font-medium">{language.xp}</span> XP
                        </div>
                        <div>
                          <span className="font-medium">{language.streak}</span> day streak
                        </div>
                        <div>
                          Last: <span className="font-medium">{language.lastStudied}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Language Distribution Pie Chart */}
              <Card className="bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>XP Distribution</CardTitle>
                  <CardDescription>XP earned across different languages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Tooltip formatter={(value) => [`${value} XP`, "Experience Points"]} />
                        <RechartsPieChart data={languageProgressData} cx="50%" cy="50%" outerRadius={80} dataKey="xp">
                          {languageProgressData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {languageProgressData.map((language) => (
                      <div key={language.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: language.color }}></div>
                        <span>{language.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Skill Breakdown
                </CardTitle>
                <CardDescription>Your progress across different language skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillsData.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{skill.skill}</h4>
                          <p className="text-xs text-muted-foreground">{skill.category}</p>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          <div>
                            {skill.learned}/{skill.total}
                          </div>
                          <div className="text-xs">{skill.progress}%</div>
                        </div>
                      </div>
                      <Progress value={skill.progress} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{skill.progress}% complete</span>
                        <span>{skill.total - skill.learned} remaining</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Recommendations */}
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Areas to focus on for balanced improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-orange-200 bg-orange-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-800">Focus Area: Speaking</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Your speaking skills need attention. Try more pronunciation exercises and conversation practice
                      with the AI assistant.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Strength: Pronunciation</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Great job on pronunciation! You're excelling in this area. Keep practicing with voice recognition
                      features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Your Achievements
                </CardTitle>
                <CardDescription>Milestones you've reached in your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border ${
                        achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Award className={`h-5 w-5 ${achievement.earned ? "text-green-600" : "text-gray-400"}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${achievement.earned ? "text-green-800" : "text-gray-600"}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${achievement.earned ? "text-green-700" : "text-gray-500"}`}>
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-green-600 mt-1">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Learning Patterns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Learning Patterns</CardTitle>
                  <CardDescription>When and how you learn best</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Best Learning Time</span>
                      <Badge>Evening (6-8 PM)</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Most Active Day</span>
                      <Badge>Saturday</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Average Session</span>
                      <Badge>22 minutes</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Preferred Language</span>
                      <Badge>Telugu</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Learning Streak</span>
                      <Badge>5 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Goals & Milestones</CardTitle>
                  <CardDescription>Your learning objectives and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Weekly XP Goal</span>
                        <span className="text-sm text-muted-foreground">1200/1500</span>
                      </div>
                      <Progress value={80} />
                      <p className="text-xs text-muted-foreground">300 XP to go this week</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Monthly Lessons</span>
                        <span className="text-sm text-muted-foreground">38/50</span>
                      </div>
                      <Progress value={76} />
                      <p className="text-xs text-muted-foreground">12 lessons remaining this month</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Streak Goal</span>
                        <span className="text-sm text-muted-foreground">5/30 days</span>
                      </div>
                      <Progress value={17} />
                      <p className="text-xs text-muted-foreground">Keep going! 25 more days to reach your goal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Comprehensive learning statistics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">89%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-secondary">156</div>
                    <div className="text-sm text-muted-foreground">Words Learned</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-green-500">{totalStudyTime.toFixed(1)}h</div>
                    <div className="text-sm text-muted-foreground">Total Study Time</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-orange-500">5</div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-sm">Completed Telugu Lesson 15</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-sm">Practiced Tamil pronunciation</span>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-sm">Earned "Week Warrior" achievement</span>
                      <span className="text-xs text-muted-foreground">3 days ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
